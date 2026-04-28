const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Aloita SUORAAN säällä: "Helsingissä tänään X astetta ja..."',
  '- Toisessa lauseessa kerro sää lyhyesti: "Helsingissä kahdeksan astetta ja pilvistä, Tampereella viisi astetta ja puolipilvistä" — ei päivää, ei päivämäärää'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
