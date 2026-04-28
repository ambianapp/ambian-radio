const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Nimi
code = code.replace(/Toneco äf äm/g, 'Toneco Radio')
code = code.replace(/TONECO FM/g, 'Toneco Radio')
code = code.replace(/äf äm/g, 'Toneco Radio')

// Päivämäärä — muutetaan se valmiiksi tekstiksi ennen promptia
code = code.replace(
  "const now = new Date().toLocaleString('fi-FI', { \n    timeZone: 'Europe/Helsinki',\n    weekday: 'long',\n    day: 'numeric',\n    month: 'long',\n    year: 'numeric',\n    hour: '2-digit',\n    minute: '2-digit'\n  })",
  `const nowDate = new Date()
  const fi = new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const parts = fi.formatToParts(nowDate).reduce((acc, p) => { acc[p.type] = p.value; return acc }, {})
  const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kolmaskolmaskymmenes','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']
  const hours = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme']
  const mins = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista','seitsemäntoista','kahdeksantoista','yhdeksäntoista','kaksikymmentä','kaksikymmentäyksi','kaksikymmentäkaksi','kaksikymmentäkolme','kaksikymmentäneljä','kaksikymmentäviisi','kaksikymmentäkuusi','kaksikymmentäseitsemän','kaksikymmentäkahdeksan','kaksikymmentäyhdeksän','kolmekymmentä','kolmekymmentäyksi','kolmekymmentäkaksi','kolmekymmentäkolme','kolmekymmentäneljä','kolmekymmentäviisi','kolmekymmentäkuusi','kolmekymmentäseitsemän','kolmekymmentäkahdeksan','kolmekymmentäyhdeksän','neljäkymmentä','neljäkymmentäyksi','neljäkymmentäkaksi','neljäkymmentäkolme','neljäkymmentäneljä','neljäkymmentäviisi','neljäkymmentäkuusi','neljäkymmentäseitsemän','neljäkymmentäkahdeksan','neljäkymmentäyhdeksän','viisikymmentä','viisikymmentäyksi','viisikymmentäkaksi','viisikymmentäkolme','viisikymmentäneljä','viisikymmentäviisi','viisikymmentäkuusi','viisikymmentäseitsemän','viisikymmentäkahdeksan','viisikymmentäyhdeksän']
  const d = parseInt(parts.day)
  const h = nowDate.toLocaleString('fi-FI', {timeZone:'Europe/Helsinki',hour:'numeric',hour12:false})
  const m = nowDate.toLocaleString('fi-FI', {timeZone:'Europe/Helsinki',minute:'numeric'})
  const now = \`\${parts.weekday} \${days[d] || parts.day}. \${parts.month} \${parts.year}, kello \${hours[parseInt(h)] || h} \${mins[parseInt(m)] || m}\``
)

// Innokkaampi ääni
code = code.replace('style: 0.25', 'style: 0.55')
code = code.replace('stability: 0.5', 'stability: 0.45')

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
