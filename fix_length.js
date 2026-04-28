const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace('- 5-7 erillistä lausumaa', '- 3 erillistä lausumaa maksimissaan')

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
