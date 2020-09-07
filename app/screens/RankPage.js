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
  Button,
  Lightbox,
  Avatar,
  Dimensions,
  Modal
} from 'react-native';


import Flat from '../components/Flat';




export default class Rank extends Component {

  constructor() {
      super();
      this.state = { 
          isLoading: true, 
          dataSource: [],
          tableHead: ['Punteggio', 'Vinte', 'Perse', 'Totali'],   
          tableData: [[]]         
      }
  }


  getImages = () => { 
      
      fetch(("http://192.168.1.200:8000/api/images"), {
          method: 'GET'
      })
          .then(response => { return response.json(); })
          .then(responseData => { console.log(responseData); return responseData; })
          .then(data => { this.setState({ "dataSource": data, isLoading: false, isModalVisible:false }); }) //dati caricati e messi in datasource --> isLoading false perché no più rotellina
          .catch(err => {
              console.log("fetch error" + err); //stampe in node.js
          });
  }

  
  render() {
      if (this.state.isLoading) {
          this.getImages();
          return (
              <View>
                  <ActivityIndicator size="large" animating />
              </View>
          )
      }
      else {
        return(
          <SafeAreaView>
            <Flat dataSource={this.state.dataSource} rank={true}/>
          </SafeAreaView>
        )
      }
  }
}