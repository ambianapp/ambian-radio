const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  'Tämänhetkinen aika: ${now}',
  'Tämänhetkinen aika (KOPIOI TÄMÄ TÄSMÄLLEEN, älä muuta yhtään sanaa): ${now}'
)

code = code.replace(
  '- Aloita kertomalla kellonaika ja päivämäärä luontevasti',
  '- Aloita kertomalla kellonaika ja päivämäärä — käytä TÄSMÄLLEEN yllä annettua aikaa, sana sanalta, älä muuta muotoa'
)

code = code.replace(
  '- Kirjoita KAIKKI luvut suomeksi sanoin — myös vuosiluvut: 2024 = "kaksituhattakaksikymmentäneljä"',
  '- Kellonaika ja päivämäärä on jo valmiiksi oikein sanoin — KOPIOI ne sellaisenaan\n- Muissa luvuissa kuten vuosiluvuissa: 2024 = "kaksituhattakaksikymmentäneljä"'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
