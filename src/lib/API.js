const proxy = 'https://cors-anywhere.herokuapp.com/'
const API_KEY = '45f1967f7da62d538c6a2883326baa3c'
const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/`
const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`
const ADDRESS_API_URL = `${proxy}https://darksky.net/rgeo?hires=1`

function getForecast (lat, lon) {
  return fetch(`${WEATHER_API_URL}${lat},${lon}`)
    .then(response => response.json())
}


function getCoordinates (location) {
  return fetch(`${GEO_API_URL}${location}`)
    .then(response => response.json())
}

function getAddress (lat, lon) {
  return fetch(`${ADDRESS_API_URL}&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
}

export default {
  getForecast,
  getCoordinates,
  getAddress
}