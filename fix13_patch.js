const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  "  const minPart = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)\n  const now = `${weekday} ${dayText} ${monthName} kello ${hourText} ${minPart}`",
  "  const minPart = minNum === 0 ? 'tasan' : mins[minNum] || String(minNum)\n  const now = `kello ${hourText} ${minPart}, ${weekday}na ${dayText} ${monthName}`"
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
