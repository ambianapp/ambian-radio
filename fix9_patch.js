const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Korvaa koko now-generointi luotettavalla versiolla
const oldNow = `  const nowDate = new Date()
  const fi = new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
  const parts = fi.formatToParts(nowDate).reduce((acc, p) => { acc[p.type] = p.value; return acc }, {})
  const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']
  const hours = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme']
  const mins = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme','kaksikymmentäneljä','kaksikymmentäviisi','kaksikymmentäkuusi','kaksikymmentäseitsemän','kaksikymmentäkahdeksan','kaksikymmentäyhdeksän','kolmekymmentä','kolmekymmentäyksi','kolmekymmentäkaksi','kolmekymmentäkolme','kolmekymmentäneljä','kolmekymmentäviisi','kolmekymmentäkuusi','kolmekymmentäseitsemän','kolmekymmentäkahdeksan','kolmekymmentäyhdeksän','neljäkymmentä','neljäkymmentäyksi','neljäkymmentäkaksi','neljäkymmentäkolme','neljäkymmentäneljä','neljäkymmentäviisi','neljäkymmentäkuusi','neljäkymmentäseitsemän','neljäkymmentäkahdeksan','neljäkymmentäyhdeksän','viisikymmentä','viisikymmentäyksi','viisikymmentäkaksi','viisikymmentäkolme','viisikymmentäneljä','viisikymmentäviisi','viisikymmentäkuusi','viisikymmentäseitsemän','viisikymmentäkahdeksan','viisikymmentäyhdeksän']
  const d = parseInt(parts.day)
  const h = parseInt(nowDate.toLocaleString('fi-FI', {timeZone:'Europe/Helsinki',hour:'numeric',hour12:false}))
  const m = parseInt(nowDate.toLocaleString('fi-FI', {timeZone:'Europe/Helsinki',minute:'numeric'}))
  const now = \`\${parts.weekday} \${days[d] || parts.day}. \${parts.month}, kello \${hours[h] || h} \${mins[m] || m}\``

const newNow = `  const nowDate = new Date()
  const toHki = (opts) => nowDate.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki', ...opts })
  const weekday = toHki({ weekday: 'long' })
  const monthName = toHki({ month: 'long' })
  const dayNum = parseInt(toHki({ day: 'numeric' }))
  const hourNum = parseInt(toHki({ hour: 'numeric', hour12: false }))
  const minNum = parseInt(toHki({ minute: 'numeric' }))

  const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']
  const hours = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme']
  const mins = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme','kaksikymmentäneljä','kaksikymmentäviisi','kaksikymmentäkuusi','kaksikymmentäseitsemän','kaksikymmentäkahdeksan','kaksikymmentäyhdeksän','kolmekymmentä','kolmekymmentäyksi','kolmekymmentäkaksi','kolmekymmentäkolme','kolmekymmentäneljä','kolmekymmentäviisi','kolmekymmentäkuusi','kolmekymmentäseitsemän','kolmekymmentäkahdeksan','kolmekymmentäyhdeksän','neljäkymmentä','neljäkymmentäyksi','neljäkymmentäkaksi','neljäkymmentäkolme','neljäkymmentäneljä','neljäkymmentäviisi','neljäkymmentäkuusi','neljäkymmentäseitsemän','neljäkymmentäkahdeksan','neljäkymmentäyhdeksän','viisikymmentä','viisikymmentäyksi','viisikymmentäkaksi','viisikymmentäkolme','viisikymmentäneljä','viisikymmentäviisi','viisikymmentäkuusi','viisikymmentäseitsemän','viisikymmentäkahdeksan','viisikymmentäyhdeksän']

  const dayText = days[dayNum] || String(dayNum)
  const hourText = hours[hourNum] || String(hourNum)
  const minText = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)
  const now = \`\${weekday} \${dayText} \${monthName}, kello \${hourText} \${minText === 'tasan' ? hourText + ' tasan' : hourText + ' ' + minText}\``

code = code.replace(oldNow, newNow)
fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
