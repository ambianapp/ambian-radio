const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Korjaa now-merkkijono — bugi toisti hourText kahdesti
code = code.replace(
  "  const now = `${weekday} ${dayText} ${monthName}, kello ${hourText} ${minText === 'tasan' ? hourText + ' tasan' : hourText + ' ' + minText}`",
  "  const minPart = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)\n  const now = `${weekday} ${dayText} ${monthName} kello ${hourText} ${minPart}`"
)

// Pakota Claude käyttämään now-arvoa sellaisenaan
code = code.replace(
  "'KOPIOI TÄMÄ TÄSMÄLLEEN, älä muuta yhtään sanaa): ${now}'",
  "'KÄYTÄ TÄMÄ SELLAISENAAN ensimmäisessä lauseessa, sana sanalta): ${now} — EI muutoksia, EI uudelleenmuotoilua'"
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
