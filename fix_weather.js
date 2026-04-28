const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  `  const fetchCity = async (lat, lon) => {
    const r = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m,weathercode&timezone=Europe/Helsinki\`)
    const d = await r.json()
    const temp = Math.round(d.current.temperature_2m)`,
  `  const fetchCity = async (lat, lon) => {
    const r = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m,weathercode&timezone=Europe/Helsinki\`)
    const d = await r.json()
    if (!d.current) return 'ei saatavilla'
    const temp = Math.round(d.current.temperature_2m)`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
