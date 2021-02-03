
import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "938c1fa87cfd21620b41e35eb87a5277";

export default class extends React.Component{
  state = {
    isLoading: true
  }

  getWeather = async(latitude,longitude)=>{
    const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    console.log(data);
  }

  // method get location using expo-location in async
  getLocation = async() => {
    try {
      await Location.getPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      this.setState({ isLoading:false });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad. ");
    }
    
  }

  // get location using expo-location
  componentDidMount(){
    this.getLocation();
  }
  
  // when use class, render should be called
  render(){
    const {isLoading} = this.state;
    return isLoading? <Loading/> :  null;
  }
}

