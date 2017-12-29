import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import CityListScreen from './screens/CityListScreen'
import WeatherScreen from './screens/WeatherScreen'

const RootNavigator = StackNavigator({
  CityList: {
    screen: CityListScreen,
    navigationOptions: {
      title: '都道府県一覧'
    }
  },
  Weather: {
    screen: WeatherScreen,
  },
})


export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
