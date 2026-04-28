const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Yksi juontaja
code = code.replace(
  `const VOICES = {
  'Mikko': 'BlAlpGV1KY8jfuqWubtQ',
  'Laura': 'YSabzCJMvEHDduIDMdwV'
}`,
  `const VOICES = {
  'Laura': 'YSabzCJMvEHDduIDMdwV'
}`
)

// Päivitä prompti
code = code.replace(
  'kahdelle suomalaiselle juontajalle: Mikolle ja Lauralle. He juontavat TONECO FM -kesäradiota.',
  'yhdelle suomalaiselle naispuoliselle juontajalle: Lauralle. Hän juontaa TONECO FM -kesäradiota yksin.'
)

code = code.replace(
  '- Kanavan nimi on TONECO FM — älä koskaan mainitse muita radiokanavia tai mediabrändeJä',
  '- Kanavan nimi on Toneco äf äm — kirjoita se AINA muodossa "Toneco äf äm", ei koskaan taivutettuna kuten "äf ämmässä" tai "äf ämmiin" — lausu aina vain "Toneco äf äm"'
)

code = code.replace(
  '- Yhteensä 7-9 vuoroa',
  '- Laura puhuu yksin, monologi — ei toista henkilöä\n- Luonnollinen, lämmin ja persoonallinen tyyli kuin hyvällä tutulle puhuisi\n- Yhteensä 5-7 lausumaa'
)

code = code.replace(
  '"lines": [\n    {"speaker": "Mikko", "text": "..."},\n    {"speaker": "Laura", "text": "..."}\n  ]',
  '"lines": [\n    {"speaker": "Laura", "text": "..."},\n    {"speaker": "Laura", "text": "..."}\n  ]'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
