import CurrentWeather from '../entities/CurrentWeather'
import WeatherForecast from '../entities/WeatherForecast'

const BASE_URL = 'http://api.openweathermap.org/data/2.5'
const API_KEY  = 'YOUR_API_KEY'

getCurrentWeatherEndpoint = (city) => {
  const { en, latitude, longitude } = city
  if (latitude && longitude) {
    return `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ja`
  } else {
    return `${BASE_URL}/weather?q=${en}&appid=${API_KEY}&lang=ja`
  }
}

getWeatherForecastEndpoint = (city) => {
  const { en, latitude, longitude } = city
  if (latitude && longitude) {
    return `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ja`
  } else {
    return `${BASE_URL}/forecast?q=${en}&appid=${API_KEY}&lang=ja`
  }
}

getCurrentWeather = (city) => {
  const endpoint = getCurrentWeatherEndpoint(city)
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => new CurrentWeather(json))
}

getWeatherForecast = (city) => {
  const endpoint = getWeatherForecastEndpoint(city)
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => json.list.map(item => new WeatherForecast(item)))
}

export { getCurrentWeather, getWeatherForecast }