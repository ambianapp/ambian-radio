const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Mainitse uutinen YHDELLÄ lauseella maksimissaan — ei enempää',
  '- Mainitse uutinen YHDELLÄ lauseella ja viittaa lähteeseen: "Ylen mukaan..." tai "Yle uutisoi..." — ei enempää'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
