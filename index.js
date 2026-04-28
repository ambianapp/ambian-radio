require('dotenv').config()
const http = require('http')
const fs = require('fs')
const { execSync } = require('child_process')

const PORT = process.env.PORT || 3000
const FILE = '/app/juonto.mp3'
const INTERVAL_MINUTES = 60

let lastUpdated = null

console.log('Kaynnistetaan server portissa ' + PORT)

http.createServer((req, res) => {
  if (req.url === '/juonto.mp3') {
    if (!fs.existsSync(FILE)) {
      res.writeHead(404)
      return res.end('Ei viela saatavilla')
    }
    const stat = fs.statSync(FILE)
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    })
    fs.createReadStream(FILE).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Toneko Radio OK\nViimeksi paivitetty: ' + (lastUpdated || 'ei viela'))
  }
}).listen(PORT, () => {
  console.log('Server kaynnissa portissa ' + PORT)
})

const generate = () => {
  const timestamp = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  console.log('[' + timestamp + '] Generoidaan uusi juonto...')
  try {
    execSync('node juonto.js', { stdio: 'inherit' })
    lastUpdated = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
    console.log('Valmis: ' + lastUpdated)
  } catch (err) {
    console.error('Virhe generoinnissa:', err.message)
  }
}

generate()
setInterval(generate, INTERVAL_MINUTES * 60 * 1000)
