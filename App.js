
import React from "react";
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "938c1fa87cfd21620b41e35eb87a5277";

export default class extends React.Component{
  state = {
    isLoading: true
  };

  getWeather = async(latitude,longitude)=>{
    const {data: {
        main:{temp},
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
    this.setState({
      isLoading: false, 
      condition:weather[0].main, 
      temp
    });
  };

  // method get location using expo-location in async
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad.");
    }
  };

  // get location using expo-location
  componentDidMount(){
    this.getLocation();
  }
  
  // when use class, render should be called
  render(){
    // const { isLoading} = this.state;
    // return (isLoading? <Loading/> :  null);

    const { isLoading, temp, condition} = this.state;
    return (isLoading? <Loading/> :  <Weather temp = {Math.round(temp)} condition={condition}/>);
  }
}

