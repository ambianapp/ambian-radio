const fs = require('fs')
let code = fs.readFileSync('juonto.js', 'utf8')

// Korjaa käsittelytapa paikallisuutisille - oikeat Yle aluekoodit
code = code.replace(
  "'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147&limit=10',\n    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-134&limit=10'",
  "'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-147',\n    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET&concepts=18-134',\n    'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET'"
)

// Älä sano ilta/aamu/päivä — poista kellonajan viittaukset promptista
code = code.replace(
  '- Aloita aina toivottamalla hyvää viikonpäivää, esim. "Mukavaa tiistaita" tai "Hyvää tiistaita kuulijoille" — käytä muotoa "Mukavaa/Hyvää + viikonpäivä + -ta/-tä"',
  '- Aloita aina toivottamalla hyvää viikonpäivää, esim. "Mukavaa tiistaita" tai "Hyvää tiistaita" — käytä muotoa "Mukavaa/Hyvää + viikonpäivä + -ta/-tä"\n- ÄLÄ koskaan sano "aamu", "päivä", "ilta" tai "yö" — et tiedä mihin aikaan kuulija kuuntelee'
)

// Lyhyempi uutisosio
code = code.replace(
  '- Avaa valittu uutinen kunnolla — selitä mistä on kyse, anna kontekstia',
  '- Mainitse uutinen lyhyesti 1-2 lauseella, älä avaa sitä liikaa'
)

fs.writeFileSync('juonto.js', code)
console.log('Valmis!')
