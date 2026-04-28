const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- kirjoita kaikki luvut suomeksi sanoin',
  '- kirjoita KAIKKI luvut suomeksi sanoin — myös vuosiluvut: 2024 = "kaksituhattakaksikymmentäneljä", 2025 = "kaksituhattakaksikymmentäviisi", 2026 = "kaksituhattakaksikymmentäkuusi"'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
