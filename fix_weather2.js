const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  "    return `${temp} astetta, ${desc[d.current.weathercode] || 'vaihtelevaa'}`",
  `    const windStr = wind >= 10 ? ', tuulista (' + wind + ' m/s)' : ''
    const windWarn = wind >= 17 ? ' — KOVA TUULI' : ''
    return {
      today: \`\${temp} astetta, \${desc[d.current.weathercode] || 'vaihtelevaa'}\${windStr}\${windWarn}\`,
      tomorrow: \`\${tomorrowMin}-\${tomorrowMax} astetta\`
    }`
)

// Korjaa logiturinti
code = code.replace(
  "  console.log(`Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}`)",
  "  console.log(`Sää — Helsinki: ${weather.helsinki.today}, Tampere: ${weather.tampere.today}`)"
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
