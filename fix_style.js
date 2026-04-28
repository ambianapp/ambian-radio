const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

code = code.replace(
  '- Aloita SUORAAN säällä: "Helsingissä tänään X astetta ja..."\n- ÄLÄ kirjoita minkäänlaista aloituslausetta tai tervehdystä — se on jo lisätty',
  '- Aloita SUORAAN säällä: "Helsingissä tänään X astetta ja..."\n- ÄLÄ kirjoita minkäänlaista aloituslausetta tai tervehdystä — se on jo lisätty\n- ÄLÄ käytä aasinsiltoja kuten "keväthän on sellainen että..." tai "mutta hei..." tai "pidetään tunnelma ylhäällä"\n- Pidä juonto tiukkana: sää, uutinen, lopetus — ei ylimääräistä täytettä\n- Lopeta lyhyesti: "Tässä Toneko Radio" tai "Pistetään musiikkia soimaan"'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
