require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const USED_NEWS_FILE = 'used_news.json'

const VOICES = { 'Laura': 'YSabzCJMvEHDduIDMdwV' }

const getUsedNews = () => {
  try { return JSON.parse(fs.readFileSync(USED_NEWS_FILE, 'utf8')) }
  catch { return [] }
}

const saveUsedNews = (titles) => {
  const used = getUsedNews()
  titles.forEach(t => { if (!used.includes(t)) used.push(t) })
  if (used.length > 50) used.splice(0, used.length - 50)
  fs.writeFileSync(USED_NEWS_FILE, JSON.stringify(used))
}

const getWeather = async () => {
  const fetchCity = async (lat, lon) => {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&timezone=Europe/Helsinki`)
    const d = await r.json()
    const temp = Math.round(d.current.temperature_2m)
    const desc = {0:'selkeää',1:'pääosin selkeää',2:'puolipilvistä',3:'pilvistä',45:'sumuista',48:'sumuista',51:'tihkusadetta',53:'tihkusadetta',55:'tihkusadetta',61:'sadetta',63:'sadetta',65:'rankka sade',71:'lumisadetta',73:'lumisadetta',75:'rankka lumisade',80:'sadekuuroja',81:'sadekuuroja',82:'rankka sadekuuro',95:'ukkosmyrsky',96:'ukkosmyrsky',99:'ukkosmyrsky'}
    return `${temp} astetta, ${desc[d.current.weathercode] || 'vaihtelevaa'}`
  }
  const helsinki = await fetchCity(60.17, 24.94)
  const tampere = await fetchCity(61.50, 23.77)
  return { helsinki, tampere }
}

const getNews = async () => {
  const used = getUsedNews()
  const items = []

  const feeds = [
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147',
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-134',
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET'
  ]

  for (const url of feeds) {
    const response = await fetch(url)
    const text = await response.text()
    const itemMatches = text.matchAll(/<item>([\s\S]*?)<\/item>/g)
    for (const item of itemMatches) {
      const titleMatch = item[1].match(/<title>([^<]+)<\/title>/)
      const descMatch = item[1].match(/<description>([^<]+)<\/description>/)
      if (titleMatch) {
        const title = titleMatch[1].trim()
        const description = descMatch ? descMatch[1].trim() : ''
        if (title && !title.includes('Yle') && title.length > 10 && !used.includes(title)) {
          items.push({ title, description })
        }
      }
      if (items.length >= 10) break
    }
    if (items.length >= 10) break
  }

  return items
}

const generateDialogue = async () => {
  const nowDate = new Date()
  const toHki = (opts) => nowDate.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki', ...opts })
  const weekday = toHki({ weekday: 'long' })
  const monthNominative = toHki({ month: 'long' })
  const monthMap = {
    'tammikuu': 'tammikuuta', 'helmikuu': 'helmikuuta', 'maaliskuu': 'maaliskuuta',
    'huhtikuu': 'huhtikuuta', 'toukokuu': 'toukokuuta', 'kesäkuu': 'kesäkuuta',
    'heinäkuu': 'heinäkuuta', 'elokuu': 'elokuuta', 'syyskuu': 'syyskuuta',
    'lokakuu': 'lokakuuta', 'marraskuu': 'marraskuuta', 'joulukuu': 'joulukuuta'
  }
  const monthName = monthMap[monthNominative] || monthNominative
  const dayNum = parseInt(toHki({ day: 'numeric' }))
  const hourNum = parseInt(toHki({ hour: 'numeric', hour12: false }))
  const minNum = parseInt(toHki({ minute: 'numeric' }))

  const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']
  const hours = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme']
  const mins = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme','kaksikymmentäneljä','kaksikymmentäviisi','kaksikymmentäkuusi','kaksikymmentäseitsemän','kaksikymmentäkahdeksan','kaksikymmentäyhdeksän','kolmekymmentä','kolmekymmentäyksi','kolmekymmentäkaksi','kolmekymmentäkolme','kolmekymmentäneljä','kolmekymmentäviisi','kolmekymmentäkuusi','kolmekymmentäseitsemän','kolmekymmentäkahdeksan','kolmekymmentäyhdeksän','neljäkymmentä','neljäkymmentäyksi','neljäkymmentäkaksi','neljäkymmentäkolme','neljäkymmentäneljä','neljäkymmentäviisi','neljäkymmentäkuusi','neljäkymmentäseitsemän','neljäkymmentäkahdeksan','neljäkymmentäyhdeksän','viisikymmentä','viisikymmentäyksi','viisikymmentäkaksi','viisikymmentäkolme','viisikymmentäneljä','viisikymmentäviisi','viisikymmentäkuusi','viisikymmentäseitsemän','viisikymmentäkahdeksan','viisikymmentäyhdeksän']

  const dayText = days[dayNum] || String(dayNum)
  const hourText = hours[hourNum] || String(hourNum)
  const minText = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)
  const minPart = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)
  const now = `${weekday}na ${dayText} ${monthName}`

  console.log('Haetaan sää...')
  const weather = await getWeather()

  console.log('Haetaan uutiset...')
  let news = await getNews()

  if (news.length === 0) {
    console.log('Kaikki uutiset käytetty, nollataan historia...')
    fs.writeFileSync(USED_NEWS_FILE, JSON.stringify([]))
    news = await getNews()
  }

  // Tallenna kaikki haetut uutiset heti käytetyiksi
  saveUsedNews(news.map(n => n.title))

  console.log('Generoidaan dialogi...')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      messages: [{
        role: 'user',
        content: `Olet kirjoittamassa noin 45 sekunnin radiomonologin suomalaiselle naispuoliselle juontajalle Lauralle. Hän juontaa Toneko Radio -kesäradiota yksin.

Tänään on: ${now}
Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}
Uutiset (valitse yksi ja avaa se kuulijoille):
${news.map((n, i) => `${i + 1}. ${n.title}${n.description ? ' — ' + n.description : ''}`).join('\n')}

Säännöt:
- Aloita mainitsemalla päivämäärä luontevasti
- Kanavan nimi on Toneko Radio — ei taivutuksia, aina vain "Toneko Radio"
- Kellonaika ja päivämäärä on jo valmiiksi oikein sanoin — KOPIOI ne sellaisenaan
- Muissa luvuissa kuten vuosiluvuissa: 2024 = "kaksituhattakaksikymmentäneljä"
- Mainitse uutinen lyhyesti 1-2 lauseella, älä avaa sitä liikaa
- Luonnollinen, lämmin ja innostunut tyyli
- Laura puhuu yksin, ei toista henkilöä
- 5-7 erillistä lausumaa
- Älä mainitse artistien tai kappaleiden nimiä — sano vain "pistetään musiikkia soimaan"
- Uutisissa saa mainita yritysten ja brändien nimiä normaalisti
- Älä koskaan viittaa itseesi tai kanavaan muulla nimellä kuin Toneko Radio — ei Radio Suomipop, ei Yle, ei mikään muu

Vastaa AINOASTAAN validina JSON:na ilman mitään muuta tekstiä:
{
  "lines": [
    {"speaker": "Laura", "text": "..."}
  ]
}`
      }]
    })
  })

  const data = await response.json()
  const raw = data.content[0].text.replace(/```json|```/g, '').trim()
  const dialogue = JSON.parse(raw)

  console.log('\n--- JUONTO ---\n')
  console.log(`Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}`)
  console.log(`Uutiset tarjolla: ${news.map(n => n.title).join(' | ')}\n`)
  dialogue.lines.forEach(line => {
    console.log(`${line.speaker}: ${line.text}`)
    console.log()
  })

  return dialogue
}

const generateAudio = async (text, speaker, index) => {
  console.log(`Generoidaan ääni: ${speaker}...`)
  const voiceId = VOICES[speaker]
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.55, use_speaker_boost: true, speed: 1.0 }
      })
    }
  )
  if (!response.ok) { const err = await response.text(); throw new Error(`ElevenLabs virhe: ${err}`) }
  const buffer = await response.arrayBuffer()
  const filename = `temp_${index}.mp3`
  fs.writeFileSync(filename, Buffer.from(buffer))
  return filename
}

const combineAudio = (files, output) => {
  console.log('Yhdistetään audiot...')
  const listFile = 'temp_list.txt'
  const content = files.map(f => `file '${path.resolve(f)}'`).join('\n')
  fs.writeFileSync(listFile, content)
  const jingleFile = 'jingle.mp3'
  const speechFile = 'temp_speech.mp3'
  execSync(`ffmpeg -f concat -safe 0 -i ${listFile} -c copy ${speechFile} -y 2>/dev/null`)
  if (fs.existsSync(jingleFile)) {
    execSync(`ffmpeg -i ${speechFile} -stream_loop -1 -i ${jingleFile} -filter_complex "[0:a]volume=1.0[speech];[1:a]volume=0.12[bg];[speech][bg]amix=inputs=2:duration=first" ${output} -y 2>/dev/null`)
    fs.unlinkSync(speechFile)
  } else {
    fs.renameSync(speechFile, output)
  }
  files.forEach(f => { try { fs.unlinkSync(f) } catch {} })
  fs.unlinkSync(listFile)
  console.log(`\nValmis! Tiedosto tallennettu: ${output}`)
}

const main = async () => {
  const dialogue = await generateDialogue()
  const audioFiles = []
  for (let i = 0; i < dialogue.lines.length; i++) {
    const file = await generateAudio(dialogue.lines[i].text, dialogue.lines[i].speaker, i)
    audioFiles.push(file)
  }
  combineAudio(audioFiles, 'juonto.mp3')
}

main()
