import React, { Component } from 'react';
import { Button, View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView, Dimensions, StatusBar, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Icon, Header, Card} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';


import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import emailImg from '../assets/email.png';
import { ScrollView } from 'react-native-gesture-handler';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      resourcePath: {},  
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
      type: '',
    }
  }

  static navigationOptions = {
    //Setting the header of the screen
    title: "Sign up"
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


validate = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    console.log("Formato email non corretto");
    return false;
  }
  else {
    return true
  }
}

  onUsernameChange(text) {
    this.setState({ username: text });
  }
  onEmailChange(text) {
    this.setState({ email: text});
  }
  onPasswordChange(text) {
    this.setState({ password: text });
  }
  onPassword2Change(text) {
    this.setState({ password2: text });
  }
  onFirstNameChange(text) {
    this.setState({ first_name: text });
  }
  onLastNameChange(text) {
    this.setState({ last_name: text });
  }
  onTypeChange(text) {
    this.setState({ type: text });
  }




  handleRequest = async () => {        
    if(this.state.email == ''){
      alert("Errore: email non inserita")
      Actions.register()
    }
    else if(!this.validate(this.state.email)){
      alert("Errore: formato email non corretto")
      Actions.register()
    }    
    if(this.state.first_name == ''){
      alert("Errore: First Name non inserito")
      Actions.register()
    } 
    if(this.state.last_name == ''){
      alert("Errore: Last Name non inserito")
      Actions.register()
    } 
    if(this.state.username == ''){
      alert("Errore: username non inserito")
      Actions.register()
    }    
    if(this.state.password == ''){
      alert("Errore: password non inserita")
      Actions.register()
    }
    if(this.state.password2 == ''){
      alert("Errore: password non confermata")
      Actions.register()
    }
    else if(this.state.type == ""){
      alert("Errore: Type non selezionata");
      Actions.register()   
  }    
  var data = new FormData();
  data.append('username', this.state.username);
  data.append('email', this.state.email);
  data.append('password', this.state.password);
  data.append('password2', this.state.password2);
  data.append('first_name', this.state.first_name);
  data.append('last_name', this.state.last_name);
  data.append('user_type', this.state.type);
  data.append('profile_img', {
    uri: this.state.resourcePath.uri, 
    name: this.state.resourcePath.name,
    type: this.state.resourcePath.type
  })
          
    
    
     
     axios
     .post("http://192.168.1.39:8000/api/auth/register", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
     })
     .then(res => {
       const { token, user } = res.data;
       AsyncStorage.setItem("userData", JSON.stringify(res.data));
       axios.defaults.headers.common.Authorization = `Token ${token}`;
       Actions.login();
    })
     .catch(err => console.log(err))
   } 
   
   
  render() {

    return ( 
      <ScrollView>   
      <View style={styles.header}>
        <StatusBar backgroundColor='black' barStyle="light-content"/>
        <Animatable.Image 
            animation="bounceIn"
            duraton="1500"
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
        />

        <View style={{ marginTop: 25, justifyContent:"center", alignItems:"center"}}>
          <View style={{ width: DEVICE_WIDTH - 30, flexDirection:"row"}}>
            <TextInput
                placeholder="First name"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}      
                style={{width: "50%"}}            
                placeholderTextColor="black"
                underlineColorAndroid="black"
                onChangeText={this.onFirstNameChange.bind(this)}
              />
              <TextInput
                placeholder="Last name"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}      
                style={{width: "50%"}}            
                placeholderTextColor="black"
                underlineColorAndroid="black"
                onChangeText={this.onLastNameChange.bind(this)}
              />
          </View>
        </View>
        <KeyboardAvoidingView>
          <View>
            <View>
              <Image source={usernameImg} style={styles.inlineImg} />            
              <TextInput
                placeholder="Username"
                autoCorrect={false}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                style={styles.input}            
                placeholderTextColor="black"
                underlineColorAndroid="black"                  
                onChangeText={this.onUsernameChange.bind(this)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Image source={emailImg} style={styles.inlineImg} />              
              <TextInput
                placeholder="Email"
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.input}            
                placeholderTextColor="black"
                underlineColorAndroid="black"                  
                onChangeText={this.onEmailChange.bind(this)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Image source={passwordImg} style={styles.inlineImg} />                                  
              <TextInput
                secureTextEntry
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder="Password"
                style={styles.input}            
                placeholderTextColor="black"
                underlineColorAndroid="black"                  
                onChangeText={this.onPasswordChange.bind(this)}
                />
            </View>
            <View style={styles.inputWrapper}>
              <Image source={passwordImg} style={styles.inlineImg} />                                  
              <TextInput
                placeholder="Conferma Password"
                secureTextEntry
                returnKeyType={'done'}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.input}            
                placeholderTextColor="black"
                underlineColorAndroid="black"                  
                onChangeText={this.onPassword2Change.bind(this)}
                />
            </View>
          </View>                                                
        </KeyboardAvoidingView>  
        <View style={{ marginTop: 55, justifyContent:"center", alignItems:"center"}}> 
          <TouchableOpacity style={{  borderWidth: 1, borderRadius: 10, backgroundColor: "#f2f2f2", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.selectFile.bind(this)}>
            <Text  style={{textAlign: 'center', marginRight: 12, color:"black"}}>Add photo profile</Text>
            <Icon color="black" name="photo" type="font-awesome" />
          </TouchableOpacity>        
        </View>
        <Text style={{ marginLeft: 16, marginTop: 5 }}>Photo uploaded: {this.state.resourcePath.name}</Text>
        <View style={{ marginTop: 30, justifyContent:"center", alignItems:"center"}}>
            <View style={{ borderWidth: 1, borderColor:"black", borderRadius: 8}}>
                <Picker selectedValue={this.state.type} style={{ height: 40, width: DEVICE_WIDTH - 30 }} onValueChange={(itemValue) => this.setState({type: itemValue})}>
                    <Picker.Item label="Choose your type" value="" />
                    <Picker.Item label="Buyer" value="Buyer" />
                    <Picker.Item label="Seller" value="Seller" />
                </Picker>
            </View>
        </View>

        <View style={{ marginTop: 55, justifyContent:"center", alignItems:"center"}}> 
            <TouchableOpacity style={{ backgroundColor: "#00d68f", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: DEVICE_WIDTH - 30 }} onPress={this.handleRequest.bind(this)}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>Sign up</Text>
            </TouchableOpacity>               
        </View>  
        
      </View>      
      </ScrollView>    
    
    );        
  }
}

const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 0,
    marginBottom: 50
  },
  footer: { 
    flex: 0.5,
    backgroundColor: '#009387',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
    top: 180,
  },  
  iconEye: {
    width: 30,
    height: 30,
    tintColor: 'rgba(0,0,0,0.2)',
    right: 30,
    top: 15
  },
  container: {
    flex: 1, 
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 25
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    marginTop:5,
    fontSize: 25,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: 230,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 80,
      flexDirection: 'row'
  },
  textSign: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20
  },
  inputWrapper: {
    marginTop: 20
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
export default Register;