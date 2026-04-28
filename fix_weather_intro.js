const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Toisessa lauseessa kerro VAIN sää ilman päivää: "Helsingissä X astetta ja pilvistä, Tampereella Y astetta."',
  '- Toisessa lauseessa kommentoi säätä luontevasti, esim. "Ulkona on tänään aika viileää — Helsingissä kuusi astetta ja Tampereella neljä." tai "Kevät etenee hitaasti, Helsingissä kuusi astetta ja pilvistä." — ei päivää eikä viikonpäivää'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
