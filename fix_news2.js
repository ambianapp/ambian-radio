const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Palautetaan yksinkertainen feedi
const oldFeeds = `  const feeds = [
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147',
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-134',
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET'
  ]

  for (const url of feeds) {
    const response = await fetch(url)
    const text = await response.text()
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
      if (items.length >= 10) break
    }
    if (items.length >= 10) break
  }`

const newFeeds = `  const response = await fetch('https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET')
  const text = await response.text()
  const all = []
  const itemMatches = text.matchAll(/<item>([\\s\\S]*?)<\\/item>/g)
  for (const item of itemMatches) {
    const titleMatch = item[1].match(/<title>([^<]+)<\\/title>/)
    const descMatch = item[1].match(/<description>([^<]+)<\\/description>/)
    if (titleMatch) {
      const title = titleMatch[1].trim()
      const description = descMatch ? descMatch[1].trim() : ''
      if (title && !title.includes('Yle') && title.length > 10 && !used.includes(title)) {
        all.push({ title, description })
      }
    }
  }
  // Sekoita järjestys niin että ei aina sama uutinen
  all.sort(() => Math.random() - 0.5)
  items.push(...all.slice(0, 10))`

code = code.replace(oldFeeds, newFeeds)
fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
