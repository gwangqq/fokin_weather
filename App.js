
import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import * as Location from "expo-location";

export default class extends React.Component{
  // method get location using expo-location in async
  getLocation = async() => {
    try {
      const response = await Location.getPermissionsAsync();
      console.log(responese);
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
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
    return <Loading/>;
  }
}

