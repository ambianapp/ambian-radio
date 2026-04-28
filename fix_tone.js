const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- ÄLÄ koskaan sano "aamu", "päivä", "ilta" tai "yö" — et tiedä mihin aikaan kuulija kuuntelee',
  '- ÄLÄ KOSKAAN käytä sanoja "aamu", "aamua", "päivä", "päivää", "ilta", "iltaa", "yö", "yötä" — KIELLETTY\n- Hyväksytty aloitus: "Mukavaa tiistaita" tai "Hyvää tiistaita" — EI MITÄÄN MUUTA TERVEHDYSTÄ'
)

code = code.replace(
  '- Mainitse uutinen lyhyesti 1-2 lauseella, älä avaa sitä liikaa',
  '- Mainitse uutinen YHDELLÄ lauseella maksimissaan — ei enempää\n- ÄLÄ jatka uutisesta enemmän kuin yhden lauseen verran'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
