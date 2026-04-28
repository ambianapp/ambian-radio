const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Lisää partitiivimuodot viikonpäiville
code = code.replace(
  "  const weekday = toHki({ weekday: 'long' })",
  `  const weekday = toHki({ weekday: 'long' })
  const weekdayPartitive = {
    'maanantai': 'maanantaita',
    'tiistai': 'tiistaita',
    'keskiviikko': 'keskiviikkoa',
    'torstai': 'torstaita',
    'perjantai': 'perjantaita',
    'lauantai': 'lauantaita',
    'sunnuntai': 'sunnuntaita'
  }[weekday] || weekday`
)

// Injektoi ensimmäinen lause suoraan koodissa eikä Claudella
code = code.replace(
  "  const dialogue = JSON.parse(raw)\n\n  console.log",
  `  const dialogue = JSON.parse(raw)
  
  // Injektoi tervehdys ensimmäiseksi lauseeksi
  dialogue.lines.unshift({ speaker: 'Laura', text: \`Mukavaa \${weekdayPartitive}, täällä Laura ja Toneko Radio.\` })

  console.log`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
