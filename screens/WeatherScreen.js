import React, { Component } from 'react'
import { 
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native'
import { 
  getCurrentWeather,
  getWeatherForecast,
} from '../services/WeatherService'
import ForecastListItem from '../components/ForecastListItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 8,
  },
  icon: {
    width: 100,
    height: 100
  }
})

export default class WeatherScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const { city } = navigation.state.params
    return {
      title: city.name + 'の天気'
    }
  }

  state = {
    forecasts: [],
  }

  componentDidMount () {
    console.log(this.props)
    const { city } = this.props.navigation.state.params


    getCurrentWeather(city)
      .then(current => {
        // console.log(current)
        this.setState({ current })
      })

    getWeatherForecast(city)
      .then(forecasts => {
        // console.log(forecasts)
        this.setState({ forecasts })
      })
  }

  renderForecasts () {
    return (
      <FlatList
        data={this.state.forecasts}
        renderItem={({item}) => <ForecastListItem item={item} />}
        keyExtractor={item => item.date.toString()}
      />
    )
  }

  render () {
    const { current } = this.state
    if (current == null) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
    const { main, iconURL } = current
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {main}
        </Text>
        <Image
          source={{uri: iconURL}}
          style={styles.icon} />
        {this.renderForecasts()}
      </View>
    )
  }
}