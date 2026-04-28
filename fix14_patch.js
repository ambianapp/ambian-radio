const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Älä mainitse muita radiokanavia tai mediabrändeJä',
  '- Uutisissa saa mainita yritysten ja brändien nimiä normaalisti\n- Älä koskaan viittaa itseesi tai kanavaan muulla nimellä kuin Toneko Radio — ei Radio Suomipop, ei Yle, ei mikään muu'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
