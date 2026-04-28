const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

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
    if (items.length >= 10) break
  }
  return items
}`

const newGetNews = `const getNews = async () => {
  const used = getUsedNews()
  const items = []

  const feeds = [
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147&limit=10',
    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-134&limit=10'
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
  }

  return items
}`

code = code.replace(oldGetNews, newGetNews)
fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
