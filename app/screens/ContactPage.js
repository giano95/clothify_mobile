import React, { Component } from 'react';
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
Dimensions,
AsyncStorage,
TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {Icon, Header, Card, SearchBar} from 'react-native-elements';
import axios from 'axios';

const DEVICE_WIDTH = Dimensions.get('window').width;

class MainHeader extends Component {

    async handleRequest() {
        let url = 'http://192.168.1.39:8000/api/auth/logout'
        AsyncStorage.getItem("userData").then((res) => {
          let data = JSON.parse(res);
    
          fetch('http://192.168.1.39:8000/api/auth/logout', {
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
              alert("Logout avvenuto con successo!")
              Actions.host()
              return responseData; 
              })
            .catch(err => {
                console.log("fetch error" + err); //stampe in node.js
          })
        })
      }  

    render() {
      if(this.props.logged){
        if(this.props.type == "SubSeller"){
          return(
            <View style={styles.container}>
            <Header
              containerStyle={{ backgroundColor: 'black', height: 60}}
              placement='left'
              rightComponent={
                <View style={{flexDirection: "row", justiftyContent:"center", alignItems:"center", marginBottom: 25}}>
                  <TouchableOpacity onPress={() => Actions.cart()}  >
                    <Icon name="shopping-cart" type="font-awesome" size={21} color={"white"} style={{marginRight: 20}} />
                  </TouchableOpacity>
                
                  <TouchableOpacity onPress={() => Actions.add_item()}  >
                      <View style={{ marginRight: 10, backgroundColor: "black", paddingLeft: 10, paddingRight: 10, paddingBottom: 4, paddingTop: 4, borderWidth: 1, borderColor:"white", borderRadius: 8}}>
                          <Text style={{color: "white"}}>Add Item</Text>
                      </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={this.handleRequest.bind(this)}  >
                      <View style={{ marginRight: 5, backgroundColor: "black", paddingLeft: 10, paddingRight: 10, paddingBottom: 4, paddingTop: 4, borderWidth: 1, borderColor:"white", borderRadius: 8}}>
                          <Text style={{color: "white"}}>Logout</Text>
                      </View>
                  </TouchableOpacity>
                </View>
             }
              leftComponent={
                <View style={{  backgroundColor: "black", flexDirection: 'row', marginBottom: 25, marginLeft: 10}}>
                    <Text style={{ color: "white", fontSize: 23}}>Clotify</Text>
                </View>
              }
            />
          </View>
          );
        }
        return (
          <View style={styles.container}>
            <Header
              containerStyle={{ backgroundColor: 'black', height: 60}}
              placement='left'
              rightComponent={
                <View style={{flexDirection: "row", justiftyContent:"center", alignItems:"center", marginBottom: 25}}>
                  <TouchableOpacity onPress={() => Actions.cart()}  >
                    <Icon name="shopping-cart" type="font-awesome" size={21} color={"white"} style={{marginRight: 20}} />
                  </TouchableOpacity>
                  
                  {/* CONTROLLARE CHE SIA UN VENDITORE */}
                  {/* <TouchableOpacity onPress={() => Actions.add_item()}  >
                      <View style={{ marginRight: 10, backgroundColor: "black", paddingLeft: 10, paddingRight: 10, paddingBottom: 4, paddingTop: 4, borderWidth: 1, borderColor:"white", borderRadius: 8}}>
                          <Text style={{color: "white"}}>Add Item</Text>
                      </View>
                  </TouchableOpacity> */}
                  
                  <TouchableOpacity onPress={this.handleRequest.bind(this)}  >
                      <View style={{ marginRight: 5, backgroundColor: "black", paddingLeft: 10, paddingRight: 10, paddingBottom: 4, paddingTop: 4, borderWidth: 1, borderColor:"white", borderRadius: 8}}>
                          <Text style={{color: "white"}}>Logout</Text>
                      </View>
                  </TouchableOpacity>
                </View>
             }
              leftComponent={
                <View style={{  backgroundColor: "black", flexDirection: 'row', marginBottom: 25, marginLeft: 10}}>
                    <Text style={{ color: "white", fontSize: 23}}>Clotify</Text>
                </View>
              }
            />
          </View>
        );
      }
      else{
        return (
          <View style={styles.container}>
            <Header
              containerStyle={{ backgroundColor: 'black', height: 60}}
              placement='left'
              rightComponent={
                <TouchableOpacity onPress={() => Actions.login()} >
                    <View style={{justiftyContent:"center", alignItems:"center", marginBottom: 25, marginRight: 10, backgroundColor: "black", paddingLeft: 10, paddingRight: 10, paddingBottom: 4, paddingTop: 4, borderWidth: 1, borderColor:"white", borderRadius: 8}}>
                        <Text style={{color: "white"}}>Login</Text>
                    </View>
                </TouchableOpacity>
             }
             leftComponent={
                <View style={{  backgroundColor: "black", flexDirection: 'row', marginBottom: 25}}>
                    {/* <Icon style={{marginTop: 4}} color="white" name="map-marker" type="font-awesome" /> */}
                    <Text style={{ color: "white", fontSize: 23, marginLeft: 15}}>Contact us</Text>
                </View>
            }
            />
          </View>
        );
      }
    }
};

export default class Contact extends Component {

    constructor() {
        super();
        this.state = { 
            isLoading: true,
            email: '',
            subject: '',
            content: '',
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

    checkLogin() {
        this.setState({check: false});
        console.log("**********CHECK LOGIN**************");
        AsyncStorage.getItem("userData").then((response) => {
          let data = JSON.parse(response);
          let js_data = JSON.stringify(data);
          if(js_data != 'null'){
            this.setState({logged: true});
            this.setState({isLoading: false});
            this.setState({username: data.user.username});
            this.setState({type: data.user.groups[0].name});
            console.log("L'utente " + data.user.username + " è attualmente loggato")
          }
          })
          .catch(err => {console.log("fetch error" + err); })
      }

      async SendMail () {

        if(this.state.subject == ""){
             alert("Errore: Subject non selezionato");
             Actions.contact_us()   
         } 
           else if(this.state.content == ""){
             alert("Errore: Content non selezionata");
             Actions.contact_us()   
         }    
         else if(!this.validate(this.state.email)){
          alert("Errore: formato email non corretto")
          Actions.contact_us()
        }           

        var data = JSON.stringify({ email : this.state.email, subject: this.state.subject, content: this.state.content})
     
        axios.post("http://192.168.1.39:8000/api/contact/", data, {
          headers: {
            'Content-Type': 'application/json',
        }})
        .then(res => { alert('Email mandata con successo'); Actions.host();})
        .catch(err => { console.log("fetch error " + err); }) 
    }



    render() {
        
        if (this.state.isLoading){
            this.checkLogin();
            this.setState({isLoading: false});
            return(
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            );
        } else {
            return(
                <ScrollView>  
                    <MainHeader logged={this.state.logged} username={this.state.username} type={this.state.type}/>
                    <View style={{  margin: 10}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection:"column",}}>
                            {/* <Text style={{fontSize: 20, marginTop: 30}}>Clotify's house</Text> */}
                            <Image source={{ uri : "http://192.168.1.39:8000/static/img/map.png"}}  style={{ height: 180, marginTop: 40, width: "100%"}}/>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, marginTop: 40, width:"100%" }}>
                                <Text style={{marginTop: 20,}}>Via Ravenna, 24</Text>
                                <Text style={{marginTop: 5,}}>Modena (MO)</Text>
                                <Text style={{marginTop: 5,}}>Italia</Text>
                            </View>
                            <View style={{ borderTopColor: 'black', borderTopWidth: 1, borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 20, width:"100%" }}>
                                <Text style={{marginTop: 20,}}>Enrico Petrucci: (+39) 3894308922</Text>
                                <Text style={{marginTop: 5,marginBottom: 20}}>Marco Gianelli: (+39) 3347840776</Text>
                            </View>
                            <Text style={{ marginTop: 35, marginLeft: 16, fontWeight:"bold", fontSize: 20}}>Send us an email</Text>
                            <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center", width:"100%"}}>
                                <TextInput
                                  placeholder="Email"
                                  returnKeyType={'done'}
                                  autoCapitalize={'none'}
                                  autoCorrect={false}      
                                  style={{width: "100%"}}            
                                  placeholderTextColor="black"
                                  underlineColorAndroid="black"
                                  onChangeText={(text) => this.setState({email: text})}
                                />
                            </View>
                            <View style={{ marginTop: 15, justifyContent:"center", alignItems:"center", width:"100%"}}>
                                <TextInput
                                  placeholder="Subject"
                                  returnKeyType={'done'}
                                  autoCapitalize={'none'}
                                  autoCorrect={false}      
                                  style={{width:"100%"}}            
                                  placeholderTextColor="black"
                                  underlineColorAndroid="black"
                                  onChangeText={(text) => this.setState({subject: text})}
                                />
                            </View>
                            <View style={{width:"100%"}}><Text style={{ marginTop: 30, marginRight: "auto"}}>Content:</Text></View>
                            <View style={{ marginTop: 5, justifyContent:"center", alignItems:"center", width:"100%"}}>
                                <TextInput
                                    returnKeyType={'done'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    style={{width:"100%", borderWidth: 1, borderRadius: 8}}
                                    multiline
                                    numberOfLines={10}
                                    onChangeText={text => this.setState({content: text})}
                                />
                            </View>
                            <TouchableOpacity style={{ marginBottom: 20, width:"100%", backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 40 }} onPress={() => this.SendMail()}>
                                <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>SEND AN EMAIL</Text>
                                <Icon color="white" name="pencil" type="font-awesome" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            );
        }
        
    }
}
const styles = StyleSheet.create({
  
 
});    


    
  
