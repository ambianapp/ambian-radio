const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Poista promptista kaikki viittaukset aloitukseen
code = code.replace(
  `TÄRKEÄÄ: Ensimmäinen lines-elementti on AINA täsmälleen: {"speaker": "Laura", "text": "Mukavaa \${now}ta, täällä Laura ja Toneko Radio."} — älä muuta tätä lainkaan.`,
  `TÄRKEÄÄ: ÄLÄ aloita tervehdyksellä. Ensimmäinen lause on jo lisätty automaattisesti. Aloita SUORAAN säällä tai uutisella.`
)

code = code.replace(
  '- Aloita SUORAAN säällä tai uutisella — älä toivota huomenta, päivää, iltaa tai mitään muuta tervehdystä',
  '- Aloita SUORAAN säällä: "Helsingissä tänään X astetta ja..."\n- ÄLÄ kirjoita minkäänlaista aloituslausetta tai tervehdystä — se on jo lisätty'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
