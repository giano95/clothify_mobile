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

export default class Checkout extends Component {

  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      first_address: "",
      billing_address: null,
      country: "Italy",
      region: "Emilia-Romagna",
      city: "Modena",
      zip_code:"",
    };
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Checkout"
  };

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }


  async submit () {
  
   if(this.state.first_name == ""){
        alert("Errore: FirstName non selezionato");
        Actions.Checkout()  
    } 
      else if(this.state.last_name == ""){
        alert("Errore: LastName non selezionata");
        Actions.Checkout()   
    }    
      else if(this.state.email == 0){
        alert("Errore: Email non selezionata");
        Actions.Checkout()   
    }    
      else if(this.state.first_address == {}){
        alert("Errore: FirstAddress non selezionata");
        Actions.Checkout()   
    }   
    else if(this.state.zip_code == ""){
        alert("Errore: ZipCode non selezionata");
        Actions.Checkout()   
    }
    

    AsyncStorage.getItem("userData").then((res) => {
        let userData = JSON.parse(res);
        var data_1 = new FormData();
        data_1.append('user', userData.user.id);
        data_1.append('first_name', this.state.first_name);
        data_1.append('last_name', this.state.last_name);
        data_1.append('email', this.state.email); 
        data_1.append('first_address', this.state.first_address);
        if ( this.state.billing_address != null)
            data_1.append('billing_address', this.state.billing_address) 
        data_1.append('country', this.state.country);
        data_1.append('region', this.state.region);
        data_1.append('city', this.state.city);
        data_1.append('zip_code', this.state.zip_code);

        
        console.log(data_1)
      
      axios
      .post("http://192.168.1.39:8000/api/checkout_info/add/", data_1, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + userData.token
        }
      })
      .then(response => { console.log(response); Alert.alert("Post aggiunto con successo!"); Actions.host()})
      .catch(err => { console.log("fetch error " + err); })
     
    })  
  }


render() {
    return (
      <ScrollView style={{}}>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="First Name"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({first_name: text})}
            />
        </View>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="Last Name"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({last_name: text})}
            />
        </View>
        <Text style={{ marginTop: 25, marginLeft: 16}}>Email:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <TextInput
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}
                multiline
                numberOfLines={1}
                onChangeText={text => this.setState({email: text})}
            />
        </View>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="First Address"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({first_address: text})}
            />
        </View>
        <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center"}}>
            <TextInput
              placeholder="Billing Address"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({billing_address: text})}
            />
        </View>
        <Text style={{ marginTop: 25, marginLeft: 16}}>Zip Code:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <TextInput
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}
                multiline
                numberOfLines={1}
                onChangeText={text => this.setState({zip_code: text})}
            />
        </View>
        
        
        <View style={{ marginTop: 25, justifyContent:"center", alignItems:"center", marginBottom: 30}}> 
            <TouchableOpacity style={{ backgroundColor: "#00d68f", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={() => setTimeout(() => {this.submit();},1000)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>Payment</Text>
            </TouchableOpacity>               
        </View>        

      </ScrollView>
    );      
  }
}

const styles = StyleSheet.create({

});
