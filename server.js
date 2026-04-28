const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const FILE = '/app/juonto.mp3'

http.createServer((req, res) => {
  if (req.url === '/juonto.mp3') {
    if (!fs.existsSync(FILE)) {
      res.writeHead(404)
      return res.end('Ei vielä saatavilla')
    }
    const stat = fs.statSync(FILE)
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': stat.size
    })
    fs.createReadStream(FILE).pipe(res)
  } else {
    const exists = fs.existsSync(FILE)
    const size = exists ? fs.statSync(FILE).size : 0
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Toneko Radio OK — tiedosto: ' + (exists ? size + ' tavua' : 'ei loydy'))
  }
}).listen(PORT, () => {
  console.log('Server kaynnissa portissa ' + PORT)
})
