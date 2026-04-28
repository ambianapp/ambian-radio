const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Tallenna vain otsikko, ei kuvausta
code = code.replace(
  `  if (dialogue.chosen_news) {
    saveUsedNews(dialogue.chosen_news)
  }`,
  `  if (dialogue.chosen_news) {
    // Tallenna vain otsikko ilman kuvausta
    const titleOnly = dialogue.chosen_news.split(' — ')[0].trim()
    saveUsedNews(titleOnly)
  }`
)

// Vertaa vain otsikkoon
code = code.replace(
  `if (title && !title.includes('Yle') && title.length > 10 && !used.includes(title)) {`,
  `if (title && !title.includes('Yle') && title.length > 10 && !used.some(u => title.includes(u) || u.includes(title))) {`
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
