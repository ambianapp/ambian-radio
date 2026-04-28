const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const FILE = '/app/juonto.mp3'

http.createServer((req, res) => {
  if (req.url === '/juonto.mp3') {
    if (!fs.existsSync(FILE)) {
      res.writeHead(404)
      return res.end('Ei vielä saatavilla — ' + FILE)
    }
    const stat = fs.statSync(FILE)
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    })
    fs.createReadStream(FILE).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Toneko Radio OK — tiedosto: ' + (fs.existsSync(FILE) ? stat = fs.statSync(FILE), stat.size + ' tavua' : 'ei löydy'))
  }
}).listen(PORT, () => {
  console.log(`Server käynnissä portissa ${PORT}`)
})
