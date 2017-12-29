import React, { Component } from 'react'
import {
  Platform, 
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { Constants, Location, Permissions } from 'expo';

import CITIES from '../cities.json'

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    height: 48,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
})

export default class CityListScreen extends Component {
  state = {
    cities: CITIES
  }

  componentWillMount() {
    console.log('componentWillMount')
    if (Platform.OS === 'android' && !Constants.isDevice) {
      // Oops, this will not work on Sketch in an Android emulator. Try it on your device!
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    console.log('getLocationAsync')
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status)
    if (status !== 'granted') {
      return
    }
    if (CITIES.length >= 48) {
      return
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    const { latitude, longitude } = location.coords
    CITIES.unshift({
      name: '現在地',
      en: 'current',
      latitude,
      longitude
    })
    this.setState({
      cities: CITIES
    })
  };


  onPress = item => {
    console.log(item)
    this.props.navigation.navigate('Weather', {city: item})
  }

  render () {
    return (
      <FlatList
        data={this.state.cities}
        keyExtractor={item => item.en}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.onPress(item)}
            style={styles.itemContainer} >
            <Text style={styles.text}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )
  }
}