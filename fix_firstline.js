const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Muuta promptia niin että ensimmäinen lause tulee valmiina
code = code.replace(
  `Olet kirjoittamassa noin 45 sekunnin radiomonologin suomalaiselle naispuoliselle juontajalle Lauralle. Hän juontaa Toneko Radio -kesäradiota yksin.`,
  `Olet kirjoittamassa noin 45 sekunnin radiomonologin suomalaiselle naispuoliselle juontajalle Lauralle. Hän juontaa Toneko Radio -kesäradiota yksin.

TÄRKEÄÄ: Ensimmäinen lines-elementti on AINA täsmälleen: {"speaker": "Laura", "text": "Mukavaa \${now}ta, täällä Laura ja Toneko Radio."} — älä muuta tätä lainkaan.`
)

// Poista vanhat kiellot jotka eivät toimi
code = code.replace(
  `- Ensimmäinen lause on AINA täsmälleen: "Mukavaa \${now}ta, täällä Laura ja Toneko Radio." — kopioi tämä sellaisenaan, älä muuta sanaakaan`,
  `- Aloita SUORAAN säällä tai uutisella — älä toivota huomenta, päivää, iltaa tai mitään muuta tervehdystä`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
