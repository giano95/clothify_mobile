import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView, Dimensions, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import FormInput from '../components/FormInput';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, Header, Card} from 'react-native-elements';
import KeyboardShift from '../components/KeyboardShift'

import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Login"
  };
  
  onUsernameChange(text) {
    this.setState({ username: text });
  }
    onPasswordChange(text) {
    this.setState({ password: text });
  }

  handleRequest = async () => {

    if(this.state.username == ''){
      alert("Errore: username non inserito")
      Actions.login()
    }    
    if(this.state.password == ''){
      alert("Errore: password non inserita")
      Actions.login()
    }    

    let url = 'http://192.168.1.39:8000/api/auth/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => { return response.json(); })
      .then(responseData => { console.log(responseData); return responseData; })
      .then(data => { 
       const { token, user } = data;
       if(token != undefined){
        AsyncStorage.setItem("userData", JSON.stringify(data));
        console.log("LOGIN TOKEN " + token)
        Actions.host();         
       }
       else{
         alert("Errore: credenziali inserite non corrette")
         Actions.login();
       }       
      }) 
      .catch(err => {
          console.log("fetch error" + err); 
      })
  }
          
  render() {
    return (    
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        
        <Animatable.Image 
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
        />
        <KeyboardAvoidingView>
          <View style={{ marginTop: 40}} >
            <Image color="black" source={usernameImg} style={styles.inlineImg} />
            <TextInput
              placeholder="Username"                
              source={usernameImg}
              autoCorrect={false}
              returnKeyType={'done'}
              autoCapitalize={'none'}
              style={styles.input}
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={this.onUsernameChange.bind(this)}
            />
          </View>            
          <View style={{ marginTop: 20}}>
            <Image source={passwordImg} style={styles.inlineImg} />
            <TextInput
              placeholder="Password"
              source={passwordImg}
              secureTextEntry
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={styles.input}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={this.onPasswordChange.bind(this)}
              />
          </View>                    
        </KeyboardAvoidingView>  
          
        <View style={{ marginTop: 70, justifyContent:"center", alignItems:"center"}}> 
          <TouchableOpacity style={{ backgroundColor: "#f2f2f2", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH / 4 }} onPress={this.handleRequest.bind(this)}>
            <Text style={{textAlign: 'center', color: 'black',fontWeight: 'bold', fontSize: 16}}>Login</Text>
          </TouchableOpacity>        
        </View>
        <Text style={{ color: 'black', fontSize: 10, marginTop: 10 }}>
              Don't you have an account yet? Then 
              <Text style={{ color: "blue" }} onPress={() => Actions.register()}>
                  {' Sign Up'}
              </Text>
        </Text> 
    </View>
    );        
  }
}

const styles = StyleSheet.create({

  logo: {
    width: 150,
    height: 150,
    marginTop: 80
  },
  input: {
    backgroundColor: 'white',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 50,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    top: 20
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 59,
    width: 30,
    height: 30,
    left: 30,
    top: 29,
    backgroundColor: "black",
    borderRadius: 4
  },      
});
export default Login;