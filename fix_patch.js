const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

const oldPrompt = `Tämänhetkinen aika: \${now}`
const newPrompt = `Tämänhetkinen aika: \${now} (kirjoita kaikki luvut suomeksi sanoin, esim. "kahdeskymmeneskahdeksas huhtikuuta" ja "kello kolmetoista kuusitoista" — ei koskaan numeroina. FM lyhennetään muotoon "äffäemm" jotta puhuja lausuu sen oikein)`

code = code.replace(oldPrompt, newPrompt)
fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
