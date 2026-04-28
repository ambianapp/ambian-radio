const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  'stability: 0.45,\n          similarity_boost: 0.75,\n          style: 0.55,',
  'stability: 0.70,\n          similarity_boost: 0.80,\n          style: 0.20,'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
