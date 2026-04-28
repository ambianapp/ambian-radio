const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Toisessa lauseessa kerro sää lyhyesti: "Helsingissä kahdeksan astetta ja pilvistä, Tampereella viisi astetta ja puolipilvistä" — ei päivää, ei päivämäärää',
  '- Toisessa lauseessa kerro VAIN sää, ei mitään muuta: "Helsingissä kuusi astetta ja puolipilvistä, Tampereella neljä astetta." — EI päivää, EI päivämäärää, EI viikonpäivää, EI "tänään"'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
