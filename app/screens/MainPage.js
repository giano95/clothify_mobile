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
  Button,
  Dimensions,
  AsyncStorage
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

import {Icon, Header, Card} from 'react-native-elements';

const width = (Dimensions.get('window').width - 4 * 10) / 2;


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
                    <Text style={{ color: "white", fontSize: 23}}>{this.props.title}</Text>
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
                    <Text style={{ color: "white", fontSize: 23}}>{this.props.title}</Text>
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
                <View style={{  backgroundColor: "black", flexDirection: 'row', marginBottom: 25, marginLeft: 10}}>
                    <Text style={{ color: "white", fontSize: 23}}>{this.props.title}</Text>
                </View>
              }
            />
          </View>
        );
      }
    }
};


export default class MainActivity extends Component {

  

  constructor() {
      super();
      this.state = { 
          isLoading: true,
          dataSource: [],
          dataCategory: [],
          check: true,
          type: '',
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
        this.setState({username: data.user.username});
        this.setState({type: data.user.groups[0].name});
        console.log("L'utente " + data.user.username + " è attualmente loggato")
      }
      })
      .catch(err => {console.log("fetch error" + err); })
  }
  
  
  _renderItem = ({ item, index }) => {
    let path = "http://192.168.1.39:8000" + item.img;
    

    return(
        
        <TouchableOpacity onPress={() => Actions.item({'id': item.id, 'title': item.name, 'category': item.category, 'username': this.state.username})}>
          <Card
            image={{uri: path}}
            imageStyle={{height:225}}
            containerStyle={[styles.card, { height: 275}]}
          >
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardTextPrice} >{item.price} $</Text>
          </Card>
        </TouchableOpacity>         
    );
  }

  _renderCategory = ({ item, index }) => {
    let path = "http://192.168.1.39:8000" + item.img;

    const dimensions = Dimensions.get('window');
    
    var imageWidth = Math.round(dimensions.width / 4) - 6;
    
    return(
      /* Actions.shop({'categorySelected': item.id}) */
      <TouchableOpacity onPress={() => {Actions.shop(); setTimeout(() => {Actions.refresh({'categorySelected': item.id});},0);                         } }>
        <View>
        <Image source={{uri: path}}
          style={{width: imageWidth, height: imageWidth, margin: 3, borderRadius: 20}} />
        {/* <Text style={{position: 'absolute', left: 10,  bottom: 5, justifyContent: 'center', alignItems: 'center', color:"white"}}>{item.name}</Text> */}
        </View>
      </TouchableOpacity>
            
    );
  }
  

  getImages = () => { 
    
    this.setState({isLoading: false});
    console.log("**********GET IMAGES**************");
    
      fetch(("http://192.168.1.39:8000/item/api/items/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataSource": data, isLoading: false }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }
  getCategory = () => { 
    
    this.setState({isLoading: false});
    console.log("**********GET CATEGORY**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_categories/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataCategory": data, isLoading: false }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  render () {
    
    if (this.state.isLoading) {
      this.checkLogin();
      this.getImages();  
      this.getCategory();      
      return (
          <View>
              <ActivityIndicator size="large" animating />
          </View>
      );
    }    
    else {
      return (
        <ScrollView>
          <View style={styles.container}>   
            <MainHeader logged={this.state.logged} username={this.state.username} type={this.state.type} title={"Clotify"}/>
            <View style={{width: "100%", paddingLeft: 15, }}>
              <Text style={{ textAlign: "left", fontWeight: "bold"}}>Categories</Text>
              <Text style={{ textAlign: "left", fontSize: 10}}>Discover our unique clothes</Text>
            </View>
            <FlatList
              data={this.state.dataCategory}
              renderItem={this._renderCategory}
              keyExtractor={(item, index) => index}
              numColumns={4}
              style={styles.flatContainerCategory}
              contentContainerStyle={styles.list}
              columnWrapperStyle={styles.column}
            />
            <View style={{width: "100%", paddingLeft: 15, marginTop: 20,}}>
              <Text style={{ textAlign: "left", fontWeight: "bold"}}>Home</Text>
              <Text style={{ textAlign: "left", fontSize: 10}}>Clothes selected for you</Text>
            </View>
            <FlatList
              data={this.state.dataSource}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index}
              numColumns={2}
              style={styles.flatContainer}
              contentContainerStyle={styles.list}
              columnWrapperStyle={styles.column}
            />
          </View>
        </ScrollView>
      );          
    }
  }
}


const styles = StyleSheet.create({
 flatContainer: {
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: "white",
    flexShrink: 1,
  },
  flatContainerCategory: {
    marginTop: 20,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'space-around',
  },
  column: {
    flexShrink: 1,
  },
  card: {
    width: width,
    margin: 5,
  },  
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: 20,
  },
  
  text: {
    color: 'white',
    marginTop:5,
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  cardText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },  
  cardTextPrice: {
    color: 'blue',
    fontSize: 12,
    textAlign: 'center',
  },  
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  },
  logo: {
    width: 66,
    height: 58,
  },
    button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15       
  },
});