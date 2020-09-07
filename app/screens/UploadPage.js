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

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},      
      name: "",
      region: "",
      course: "",      
    };
  }

  updateValue = ({field, value}) => {

    if(field == "name"){
      this.setState({
        name: value,
      })
    }    
    else if(field == "region"){
      this.setState({
        region: value,
      })
    }
    else {
      this.setState({
        course: value,
      })
    }    
  }


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

    if(this.state.name == ""){
      alert("Errore: Nome non inserito");
      Actions.upload()
    }
    else if(this.state.upload == ""){
      alert("Errore: Immagine non caricata");
      Actions.upload()
    }
    else if(this.state.course == ""){
      alert("Errore: Portata non selezionata");
      Actions.upload()
    }
    else if(this.state.region == ""){
      alert("Errore: Regione non selezionata");
      Actions.upload()   
    }          

    var data = new FormData();
    data.append('name', this.state.name);
    data.append('upload', {
      uri: this.state.resourcePath.uri, 
      name: this.state.resourcePath.name,
      type: this.state.resourcePath.type
    })
    data.append('region', this.state.region);
    data.append('course', this.state.course); 


    AsyncStorage.getItem("userData").then((res) => {
      let userData = JSON.parse(res);

      axios
      .post("http://192.168.1.200:8000/api/upload/", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Token ' + userData.token
        }})
        .then(res => {
        alert('Immagine caricata con successo');

        Actions.home();
      });
    })
  }


render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Header
            containerStyle={{ backgroundColor: '#009387'}}
            placement="left"
            centerComponent={<Text style={styles.text}>Carica un nuovo Piatto</Text>}
            leftComponent={<Icon name="arrow-left" type="font-awesome" color="white" onPress={()=> Actions.pop()}/>}
          />
        </View>
        <View style={styles.containerItem}>
            <TextInput
              placeholder="Nome del Piatto"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}      
              style={styles.input}            
              placeholderTextColor="white"
              underlineColorAndroid="white"
              onChangeText={(text) => this.setState({name: text})}
            />
        </View>

        <View style={styles.containerItem}>
        <View style={styles.itemContainer}> 
            <Picker
              selectedValue={this.state.course}
              style={{ height: 60, width: DEVICE_WIDTH - 20 }}
              onValueChange={(itemValue) => this.setState({course: itemValue})}
            >
              <Picker.Item label="🥣  Portata" value="" color="white" />
              <Picker.Item label="Primo" value="primo" />
              <Picker.Item label="Secondo" value="secondo" />
              <Picker.Item label="Dolce" value="dessert" />
            </Picker>
        </View>
        </View>

        <View style={styles.containerItem}>
        <View style={styles.itemContainer}>
            <Picker
              selectedValue={this.state.region}
              style={{ height: 60, width: DEVICE_WIDTH - 20}}
              onValueChange={(itemValue) => this.setState({region: itemValue})}
            >
              <Picker.Item label="🇮🇹   Regione" value="" color="white" />
              <Picker.Item label="Abruzzo" value="abruzzo" />
              <Picker.Item label="Basilicata" value="basilicata" />
              <Picker.Item label="Calabria" value="calabria" />
              <Picker.Item label="Campania" value="campania" />
              <Picker.Item label="Emilia-Romagna" value="emilia" />
              <Picker.Item label="Friuli Venezia Giulia" value="friuli" />
              <Picker.Item label="Lazio" value="lazio" />
              <Picker.Item label="Liguria" value="liguria" />
              <Picker.Item label="Lombardia" value="lombardia" />
              <Picker.Item label="Marche" value="marche" />
              <Picker.Item label="Molise" value="molise" />
              <Picker.Item label="Piemonte" value="piemonte" />
              <Picker.Item label="Puglia" value="puglia" />
              <Picker.Item label="Sardegna" value="sardegna" />
              <Picker.Item label="Sicilia" value="sicilia" />
              <Picker.Item label="Toscana" value="toscana" />
              <Picker.Item label="Trentino-Alto Adige" value="trentino" />
              <Picker.Item label="Umbria" value="umbria" />
              <Picker.Item label="Valle d'Aosta" value="valled\'aosta" />
              <Picker.Item label="Veneto" value="veneto" />
            </Picker>
        </View>
        </View>

        <View style={styles.containerItem}>
        <View style={styles.button}>
        <Button title="Scegli File" color='#009387' onPress={this.selectFile.bind(this)} />
          <Text style={{ alignItems: 'center' }}>
              {this.state.resourcePath.name}
          </Text>         
        </View>
        </View>

        <Animatable.View 
            style={[styles.footer]}
            animation="fadeInUpBig"
        > 
        <View style={styles.button}>
          <TouchableOpacity onPress={() => this.submit()}>
              <LinearGradient
                  colors={['#00FFFF', '#00FF7F']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>Carica</Text>
              </LinearGradient>
          </TouchableOpacity>         
        </View>        
      </Animatable.View>
 

      </View>
    );      
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 30
  },  
  containerItem: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  text: {
    color: 'white',
    marginTop:5,
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: { 
    flex: 1,
    backgroundColor: '#009387',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 100
  },  
  input: {
    backgroundColor: '#009387',
    width: DEVICE_WIDTH - 20,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 5,
    borderRadius: 10,
    color: '#ffffff',
    fontSize: 15,
    top: 20
  },
  inputWrapper: {
    flex: 0.5,
    padding: 0,
    top: 40
  },  
  itemContainer: {
    backgroundColor: '#009387',
    width: DEVICE_WIDTH - 20,
    height: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    color: '#ffffff',
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

});


  // <Button raised icon={{name: 'upload', type: 'font-awesome'}} title="Scegli File" onPress={this.selectFile.bind(this)} />
  // <Text style={{ alignItems: 'center' }}>
  //     {this.state.resourcePath.name}
  // </Text>

  // <Button title="Carica" onPress={this.submit} />


{/* <RNPickerSelect
    placeholder='Nome Piatto'
    onValueChange={(value) => this.setState({course: value})}
    items={[
        { label: 'Prima portata', value: 'primo' },
        { label: 'Seconda portata', value: 'secondo' },
        { label: 'Dolce', value: 'dessert' },
    ]}
/> */}
