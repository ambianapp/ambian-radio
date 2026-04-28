const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- ÄLÄ KOSKAAN käytä sanoja "aamu", "aamua", "päivä", "päivää", "ilta", "iltaa", "yö", "yötä" — KIELLETTY\n- Hyväksytty aloitus: "Mukavaa tiistaita" tai "Hyvää tiistaita" — EI MITÄÄN MUUTA TERVEHDYSTÄ',
  `- Ensimmäinen lause on AINA täsmälleen: "Mukavaa \${now}ta, täällä Laura ja Toneko Radio." — kopioi tämä sellaisenaan, älä muuta sanaakaan`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
