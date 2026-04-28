const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Ei viikonpäivää säässä
code = code.replace(
  '- Toisessa lauseessa kerro VAIN sää, ei mitään muuta: "Helsingissä kuusi astetta ja puolipilvistä, Tampereella neljä astetta." — EI päivää, EI päivämäärää, EI viikonpäivää, EI "tänään"',
  '- Toisessa lauseessa kerro VAIN lämpötilat: "Helsingissä kuusi astetta ja puolipilvistä, Tampereella neljä astetta." — EI sanoja "tänään", "tiistaina", "tänään" tai mitään muuta kuin lämpötila ja pilvisyys'
)

// Positiivinen uutinen
code = code.replace(
  '- Mainitse uutinen YHDELLÄ lauseella maksimissaan — ei enempää\n- ÄLÄ jatka uutisesta enemmän kuin yhden lauseen verran',
  '- Valitse POSITIIVINEN tai kiinnostava uutinen — ei katastrofeja, kuolemia, väkivaltaa tai pelottavia asioita\n- Mainitse uutinen YHDELLÄ lauseella maksimissaan — ei enempää'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
