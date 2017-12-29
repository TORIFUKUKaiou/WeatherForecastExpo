export default class WeatherForecast {
  constructor (data) {
    const { weather } = data
    this.main = weather[0].main
    this.iconURL = 'https://openweathermap.org/img/w/' + weather[0].icon + '.png'
    this.description = weather[0].description
    this.date = new Date(data.dt * 1000)
    this.humidity = data.main.humidity
    this.temperature = Math.round(data.main.temp - 273.15)
  }
}