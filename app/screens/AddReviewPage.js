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

export default class AddReview extends Component {

  constructor() {
    super();
    this.state = {
      resourcePath: {},  
      title: "",
      comment: "",
      vote: 5, 
    };
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Add review"
  };

  async selectFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({ resourcePath: res });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  async submit () {

   if(this.state.title == ""){
        alert("Errore: Title non selezionata");
        Actions.AddReview()   
    } 
      else if(this.state.comment == ""){
        alert("Errore: Comment non selezionata");
        Actions.AddReview()   
    }    
      else if(this.state.vote == ""){
        alert("Errore: Vote non selezionata");
        Actions.AddReview()   
    }    
      else if(this.state.img == ""){
        alert("Errore: Immagine non selezionata");
        Actions.AddReview()   
    }             

    AsyncStorage.getItem("userData").then((res) => {
      let userData = JSON.parse(res);
      var data = new FormData();
      data.append('title', this.state.title);
      data.append('comment', this.state.comment);
      data.append('vote', this.state.vote); 
      data.append('img', {
        uri: this.state.resourcePath.uri, 
        name: this.state.resourcePath.name,
        type: this.state.resourcePath.type
      })
      data.append('item', this.props.item_id)
      data.append('user', userData.user.id )
      console.log(this.props.item_id)
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
              placeholder="Title"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={{width: DEVICE_WIDTH - 30}}            
              placeholderTextColor="black"
              underlineColorAndroid="black"
              onChangeText={(text) => this.setState({title: text})}
            />
        </View>
        <Text style={{ marginTop: 30, marginLeft: 16}}>Comment:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <TextInput
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{width: DEVICE_WIDTH - 30, borderWidth: 1, borderRadius: 8}}
                multiline
                numberOfLines={10}
                onChangeText={text => this.setState({comment: text})}
            />
        </View>
        
        <Text style={{ marginTop: 30, marginLeft: 16}}>Vote:</Text>
        <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center"}}>
            <View style={{ borderWidth: 1, borderColor:"black", borderRadius: 8}}>
                <Picker selectedValue={this.state.vote} style={{ height: 60, width: DEVICE_WIDTH - 30 }} onValueChange={(itemValue) => this.setState({vote: itemValue})}>
                    <Picker.Item label="⭐⭐⭐⭐⭐" value="5" />
                    <Picker.Item label="⭐⭐⭐⭐" value="4" />
                    <Picker.Item label="⭐⭐⭐" value="3" />
                    <Picker.Item label="⭐⭐" value="2" />
                    <Picker.Item label="⭐" value="1" />
                </Picker>
            </View>
        </View>

        <View style={{ marginTop: 35, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD A PHOTO</Text>
              <Icon color="white" name="photo" type="font-awesome" />
            </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath.name}</Text> 

        
        <View style={{ marginTop: 55, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#00d68f", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={() => this.submit()}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD REVIEW</Text>
            </TouchableOpacity>               
        </View>        
      </ScrollView>
    );      
  }
}

const styles = StyleSheet.create({

});
