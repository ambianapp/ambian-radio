const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Aloita mainitsemalla päivämäärä luontevasti',
  '- ÄLÄ mainitse päivämäärää tai viikonpäivää — tervehdys on jo lisätty automaattisesti'
)

code = code.replace(
  '- Kellonaika ja päivämäärä on jo valmiiksi oikein sanoin — KOPIOI ne sellaisenaan',
  '- Toisessa lauseessa kerro VAIN sää ilman päivää: "Helsingissä X astetta ja pilvistä, Tampereella Y astetta."'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
