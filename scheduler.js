require('dotenv').config()
const { execSync } = require('child_process')

const INTERVAL_MINUTES = 30 // vaihda tähän haluamasi väli

console.log(`Scheduler käynnistetty — uusi juonto generoidaan ${INTERVAL_MINUTES} minuutin välein`)
console.log('Generoidaan ensimmäinen juonto heti...\n')

const generate = () => {
  const timestamp = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  console.log(`\n[${timestamp}] Generoidaan uusi juonto...`)
  try {
    execSync('node juonto.js', { stdio: 'inherit' })
  } catch (err) {
    console.error('Virhe generoinnissa:', err.message)
  }
}

// Aja heti käynnistyessä
generate()

// Aja sitten säännöllisesti
setInterval(generate, INTERVAL_MINUTES * 60 * 1000)
