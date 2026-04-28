const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Aloita mainitsemalla viikonpäivä luontevasti, esim. "Tiistai-iltapäivä Toneko Radiossa"',
  '- Aloita aina toivottamalla hyvää viikonpäivää, esim. "Mukavaa tiistaita" tai "Hyvää tiistaita kuulijoille" — käytä muotoa "Mukavaa/Hyvää + viikonpäivä + -ta/-tä"'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
