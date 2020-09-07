import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,  
  KeyboardAvoidingView,
  Form,
  TextInput,
  ImageField,
  Button,
  Keyboard,
  Alert,
  Picker,
  Dimensions,
  Modal,
  AsyncStorage
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {Icon, Header, Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class SendMail extends Component {

  constructor() {
    super();
    this.state = {
      resourcePath: {},  
      email: "",
      subject: "",
      message: "", 
    };
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Send Mail"
  };


  async submit () {

   if(this.state.email == ""){
        alert("Errore: Email non selezionata");
        Actions.SendMail()   
    } 
      else if(this.state.subject == ""){
        alert("Errore: Subjcet non selezionata");
        Actions.SendMail()   
    }    
      else if(this.state.message == ""){
        alert("Errore: Message non selezionata");
        Actions.SendMail()   
    }        

    var data = new FormData();
    data.append('email', this.state.email);
    data.append('subject', this.state.subjcet);
    data.append('message', this.state.message); 


    AsyncStorage.getItem("userData").then((res) => {
      let userData = JSON.parse(res);
      axios
      .post("http://192.168.1.39:8000/item/api/add_review/", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + userData.token
        }})
        .then(res => {
        alert('Review caricata con successo');

        Actions.home();
      });
    })
  }


render() {
    return (
      <ScrollView style={{}}>
          <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="Email"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({email: text})}
            />
        </View>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="Subject"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({subject: text})}
            />
        </View>
        
        <Text style={{ marginTop: 30, marginLeft: 16}}>Message:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <TextInput
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}
                multiline
                numberOfLines={10}
                onChangeText={text => this.setState({message: text})}
            />
        </View>
        

        
        <View style={{ marginTop: 55, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#00d68f", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={() => this.submit()}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>SEND MAIL</Text>
            </TouchableOpacity>               
        </View>        
      </ScrollView>
    );      
  }
}

const styles = StyleSheet.create({

});
