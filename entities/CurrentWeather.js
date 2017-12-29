export default class CurrentWeather {
  constructor (data) {
    const { weather } = data
    this.main = weather[0].main
    this.iconURL = 'https://openweathermap.org/img/w/' + weather[0].icon + '.png'
  }
}