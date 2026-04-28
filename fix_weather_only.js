const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Lisää tuuli API-kutsuun
code = code.replace(
  'current=temperature_2m,weathercode&timezone=Europe/Helsinki',
  'current=temperature_2m,weathercode,windspeed_10m,winddirection_10m&timezone=Europe/Helsinki'
)

// Lisää tuuli fetchCity-funktioon
code = code.replace(
  'if (!d.current) return \'ei saatavilla\'\n    const temp = Math.round(d.current.temperature_2m)',
  `if (!d.current) return 'ei saatavilla'
    const temp = Math.round(d.current.temperature_2m)
    const wind = Math.round(d.current.windspeed_10m)`
)

// Lisää tuuli paluuarvoon
code = code.replace(
  "return `${temp} astetta, ${desc}`",
  "return `${temp} astetta, ${desc}${wind >= 10 ? ', tuulista (' + wind + ' m/s)' : ''}${wind >= 17 ? ' — KOVA TUULI' : ''}`"
)

// Poista uutiset promptista
code = code.replace(
  `Uutiset (valitse yksi ja avaa se kuulijoille):
\${news.map((n, i) => \`\${i + 1}. \${n.title}\${n.description ? ' — ' + n.description : ''}\`).join('\\n')}

`,
  ''
)

// Päivitä säännöt
code = code.replace(
  '- Valitse POSITIIVINEN tai kiinnostava uutinen — ei katastrofeja, kuolemia, väkivaltaa tai pelottavia asioita\n- Mainitse uutinen YHDELLÄ lauseella ja viittaa lähteeseen: "Ylen mukaan..." tai "Yle uutisoi..." — ei enempää',
  '- Kerro säästä luontevasti ja kommentoi sitä — jos on tuulista tai kylmää, mainitse se\n- Jos tuuli on yli 10 m/s, mainitse että on tuulista. Jos yli 17 m/s, varoita kovasta tuulesta.'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
