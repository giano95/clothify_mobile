import React, { Component } from 'react';
import decode from 'jwt-decode';
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
  AsyncStorage,
  Dimensions,
  Alert,
  Header
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import {Icon, Card} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';


import Flat from '../components/Flat';

const width = (Dimensions.get('window').width - 4 * 10) / 2;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ChooseSize extends Component {

  constructor() {
      super();
      this.state = { 
          isLoading: true,
          dataSizes: [],
      }
  }
  
  static navigationOptions = {
    //Setting the header of the screen
    title: "Choose Size"
  };

  
  add_to_cart = async (size_) => {  
      
    /* console.log(this.props.item.id)
    console.log(size_) */

    if(size_ == 'XS'){
        var size_id = 1
    } else if (size_ == 'S'){
        var size_id = 2
    } else if (size_ == 'M'){
        var size_id = 3
    } else if (size_ == 'L'){
        var size_id = 4
    } else if (size_ == 'XL'){
        var size_id = 5
    } else if (size_ == 'XXL'){
        var size_id = 6
    }

    /* console.log(size_id) */
 
     AsyncStorage.getItem("userData").then((res) => {
       let userData = JSON.parse(res);
       
       var data = new FormData();
        data.append('user', userData.user.id);
        data.append('item', this.props.item.id );
        data.append('item_size', size_id); 
        data.append('quantity', '1')
      
       axios
       .post("http://192.168.1.39:8000/order/api/add_order_item/", data, {
         headers: {
           'Authorization': 'Token ' + userData.token
         }})
          .then(res => {
            alert('Oggetto messo nel carrello con successo');
            Actions.home();
          })
          .catch(err => {
            console.log("fetch error" + err); 
          })
     })
   }

  /*  getQuantitySize = () => { 
    console.log("**********GET QUANTITY SIZE**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_quantitysize/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { console.log(responseData); return responseData; })
          .then(data => { this.setState({ "dataSizes": data }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  } */

   _renderQuantitySize = ({ item, index }) => {    
    if (item.quantity > 0){ 
        return(
            <TouchableOpacity style={{ borderBottomWidth: 1, height: 60, justifyContent:"center"}} onPress={() => {this.add_to_cart(item.size);}} >
                <Text style={{ fontSize: 25}}>{item.size}</Text>
            </TouchableOpacity>        
        );
    } 
  }


  render () {
    
    if (this.state.isLoading) {
     /*  this.getQuantitySize(); */
      this.setState({isLoading: false});
      return (
          <View>
              <ActivityIndicator size="large" animating />
          </View>
      );
    }    
    else 
        console.log(this.props.item)
         return (
        <ScrollView>
          
            <View style={{margin: 10}}>
                <FlatList
                data={this.props.item.quantities_size}
                renderItem={this._renderQuantitySize}
                keyExtractor={(item, index) => index}
                />
            </View>
        </ScrollView>
      );
  }
}

