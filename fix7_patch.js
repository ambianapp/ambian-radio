const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Korjaa getNews hakemaan 10 uutista ja suodattamaan käytetyt tarkasti
const oldGetNews = `const getNews = async () => {
  const response = await fetch('https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET')
  const text = await response.text()
  const used = getUsedNews()

  const items = []
  const itemMatches = text.matchAll(/<item>([\\s\\S]*?)<\\/item>/g)
  for (const item of itemMatches) {
    const titleMatch = item[1].match(/<title>([^<]+)<\\/title>/)
    const descMatch = item[1].match(/<description>([^<]+)<\\/description>/)
    if (titleMatch) {
      const title = titleMatch[1].trim()
      const description = descMatch ? descMatch[1].trim() : ''
      if (title && !title.includes('Yle') && title.length > 10 && !used.includes(title)) {
        items.push({ title, description })
      }
    }
    if (items.length >= 5) break
  }

  return items
}`

const newGetNews = `const getNews = async () => {
  const response = await fetch('https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET')
  const text = await response.text()
  const used = getUsedNews()

  const items = []
  const itemMatches = text.matchAll(/<item>([\\s\\S]*?)<\\/item>/g)
  for (const item of itemMatches) {
    const titleMatch = item[1].match(/<title>([^<]+)<\\/title>/)
    const descMatch = item[1].match(/<description>([^<]+)<\\/description>/)
    if (titleMatch) {
      const title = titleMatch[1].trim()
      const description = descMatch ? descMatch[1].trim() : ''
      const alreadyUsed = used.some(u => u === title)
      if (title && !title.includes('Yle') && title.length > 10 && !alreadyUsed) {
        items.push({ title, description })
      }
    }
    if (items.length >= 10) break
  }

  return items
}`

code = code.replace(oldGetNews, newGetNews)

// Tallenna aina pelkkä otsikko
const oldSave = `  if (dialogue.chosen_news) {
    // Tallenna vain otsikko ilman kuvausta
    const titleOnly = dialogue.chosen_news.split(' — ')[0].trim()
    saveUsedNews(titleOnly)
  }`

const newSave = `  // Tallenna kaikkien tarjottujen uutisten otsikot — ei vain valittua
  news.forEach(n => saveUsedNews(n.title))`

code = code.replace(oldSave, newSave)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
