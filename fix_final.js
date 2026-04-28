const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Poista uutisten haku ja käyttö generateDialogue-funktiosta
code = code.replace(
  `  console.log('Haetaan uutiset...')
  let news = await getNews()

  if (news.length === 0) {
    console.log('Kaikki uutiset käytetty, nollataan historia...')
    clearUsedNews()
    news = await getNews()
  }

  // Tallenna kaikki haetut uutiset heti käytetyiksi
  saveUsedNews(news.map(n => n.title))`,
  `  // Uutiset poistettu`
)

// Lisää huomisen sää API-kutsuun
code = code.replace(
  'current=temperature_2m,weathercode,windspeed_10m,winddirection_10m&timezone=Europe/Helsinki',
  'current=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Helsinki&forecast_days=2'
)

// Päivitä fetchCity palauttamaan myös huominen
code = code.replace(
  `    if (!d.current) return 'ei saatavilla'
    const temp = Math.round(d.current.temperature_2m)
    const wind = Math.round(d.current.windspeed_10m)`,
  `    if (!d.current) return { today: 'ei saatavilla', tomorrow: 'ei saatavilla' }
    const temp = Math.round(d.current.temperature_2m)
    const wind = Math.round(d.current.windspeed_10m)
    const tomorrowMax = Math.round(d.daily.temperature_2m_max[1])
    const tomorrowMin = Math.round(d.daily.temperature_2m_min[1])`
)

// Päivitä paluuarvo objektiksi
code = code.replace(
  "return `${temp} astetta, ${desc}${wind >= 10 ? ', tuulista (' + wind + ' m/s)' : ''}${wind >= 17 ? ' — KOVA TUULI' : ''}`",
  `return {
      today: \`\${temp} astetta, \${desc}\${wind >= 10 ? ', tuulista (' + wind + ' m/s)' : ''}\${wind >= 17 ? ' — KOVA TUULI' : ''}\`,
      tomorrow: \`\${tomorrowMin}-\${tomorrowMax} astetta\`
    }`
)

// Päivitä säädata promptissa
code = code.replace(
  'Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}',
  'Sää tänään — Helsinki: ${weather.helsinki.today}, Tampere: ${weather.tampere.today}\nHuominen — Helsinki: ${weather.helsinki.tomorrow}, Tampere: ${weather.tampere.tomorrow}'
)

// Poista uutisten tulostus logeista
code = code.replace(
  "  console.log(`Uutiset tarjolla: ${news.map(n => n.title).join(' | ')}\\n`)",
  ''
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
