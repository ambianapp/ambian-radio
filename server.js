const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000

http.createServer((req, res) => {
  if (req.url === '/juonto.mp3') {
    const file = path.join(__dirname, 'juonto.mp3')
    if (!fs.existsSync(file)) {
      res.writeHead(404)
      return res.end('Ei vielä saatavilla')
    }
    res.writeHead(200, { 'Content-Type': 'audio/mpeg' })
    fs.createReadStream(file).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Toneko Radio OK')
  }
}).listen(PORT, () => {
  console.log(`Server käynnissä portissa ${PORT}`)
})
