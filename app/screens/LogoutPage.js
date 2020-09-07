import React, { Component } from 'react';
import { View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Router from '../Router';
import axios from 'axios';


class Logout extends Component {

  async handleRequest() {
    let url = 'http://192.168.1.200:8000/api/auth/logout/'
    AsyncStorage.getItem("userData").then((res) => {
      let data = JSON.parse(res);

      fetch('http://192.168.1.200:8000/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + data.token
        }
        })
        .then(response => {
          try {
            response = JSON.stringify(response);
          } catch (e) {
              dispatch({ type: XXX_SSSSS, service: null });
          } 
          return JSON.stringify(response); 
          })
        .then(responseData => { 
          console.log(responseData); 
          AsyncStorage.removeItem("userData");
          Actions.host()
          return responseData; 
          })
        .catch(err => {
            console.log("fetch error" + err); //stampe in node.js
      })
    })
  }    

  render() {
    const { buttonContainerStyle } = styles;
    return (
      <View style={buttonContainerStyle}>
        <Button title="Logout" onPress={this.handleRequest.bind(this)}/>
      </View>
      
    );
  }
}


const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

export default Logout;