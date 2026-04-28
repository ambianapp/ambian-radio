const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  "  const monthName = toHki({ month: 'long' })",
  `  const monthNominative = toHki({ month: 'long' })
  const monthMap = {
    'tammikuu': 'tammikuuta', 'helmikuu': 'helmikuuta', 'maaliskuu': 'maaliskuuta',
    'huhtikuu': 'huhtikuuta', 'toukokuu': 'toukokuuta', 'kesäkuu': 'kesäkuuta',
    'heinäkuu': 'heinäkuuta', 'elokuu': 'elokuuta', 'syyskuu': 'syyskuuta',
    'lokakuu': 'lokakuuta', 'marraskuu': 'marraskuuta', 'joulukuu': 'joulukuuta'
  }
  const monthName = monthMap[monthNominative] || monthNominative`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
