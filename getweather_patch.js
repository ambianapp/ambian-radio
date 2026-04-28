const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

const oldFn = `const getWeather = async () => {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current=temperature_2m,weathercode&timezone=Europe/Helsinki'
  )
  const data = await response.json()
  const temp = Math.round(data.current.temperature_2m)
  const code = data.current.weathercode
  const weatherDescriptions = {
    0: 'selkeää', 1: 'pääosin selkeää', 2: 'puolipilvistä', 3: 'pilvistä',
    45: 'sumuista', 48: 'sumuista', 51: 'tihkusadetta', 53: 'tihkusadetta',
    55: 'tihkusadetta', 61: 'sadetta', 63: 'sadetta', 65: 'rankka sade',
    71: 'lumisadetta', 73: 'lumisadetta', 75: 'rankka lumisade',
    80: 'sadekuuroja', 81: 'sadekuuroja', 82: 'rankka sadekuuro',
    95: 'ukkosmyrsky', 96: 'ukkosmyrsky', 99: 'ukkosmyrsky'
  }
  return \`\${temp} astetta, \${weatherDescriptions[code] || 'vaihtelevaa'}\`
}`

const newFn = `const getWeather = async () => {
  const fetchCity = async (lat, lon) => {
    const r = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m,weathercode&timezone=Europe/Helsinki\`)
    const d = await r.json()
    const temp = Math.round(d.current.temperature_2m)
    const code = d.current.weathercode
    const desc = {
      0: 'selkeää', 1: 'pääosin selkeää', 2: 'puolipilvistä', 3: 'pilvistä',
      45: 'sumuista', 48: 'sumuista', 51: 'tihkusadetta', 53: 'tihkusadetta',
      55: 'tihkusadetta', 61: 'sadetta', 63: 'sadetta', 65: 'rankka sade',
      71: 'lumisadetta', 73: 'lumisadetta', 75: 'rankka lumisade',
      80: 'sadekuuroja', 81: 'sadekuuroja', 82: 'rankka sadekuuro',
      95: 'ukkosmyrsky', 96: 'ukkosmyrsky', 99: 'ukkosmyrsky'
    }
    return \`\${temp} astetta, \${desc[code] || 'vaihtelevaa'}\`
  }
  const helsinki = await fetchCity(60.17, 24.94)
  const tampere = await fetchCity(61.50, 23.77)
  return { helsinki, tampere }
}`

code = code.replace(oldFn, newFn)
code = code.replace(
  "Sää Helsingissä: ${weather}",
  "Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}"
)
code = code.replace(
  "console.log(`Sää: ${weather}`)",
  "console.log(`Sää — Helsinki: ${weather.helsinki}, Tampere: ${weather.tampere}`)"
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
