const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Korjaa päivä 28
code = code.replace(
  "'kahdeskymmeneskahdeksas'",
  "'kahdeskymmeneskahdeksas'"
)

// Korjaa koko days-taulukko oikeaksi
code = code.replace(
  "const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']",
  "const days = ['','ensimmäinen','toinen','kolmas','neljäs','viides','kuudes','seitsemäs','kahdeksas','yhdeksäs','kymmenes','yhdestoista','kahdestoista','kolmastoista','neljästoista','viidestoista','kuudestoista','seitsemästoista','kahdeksastoista','yhdeksästoista','kahdeskymmenes','kahdeskymmenesensimmäinen','kahdeskymmenestoinen','kahdeskymmeneskolmas','kahdeskymmenesneljäs','kahdeskymmenesviides','kahdeskymmeneskuudes','kahdeskymmenesseitsemäs','kahdeskymmeneskahdeksas','kahdeskymmenenyhdeksäs','kolmaskymmenes','kolmaskymmenesensimmäinen']"
)

// Varmista nimi
code = code.replace(/Toneco/g, 'Toneko')

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
