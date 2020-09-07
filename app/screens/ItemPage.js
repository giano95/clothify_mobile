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

export default class Item extends Component {

  constructor() {
      super();
      this.state = { 
          isLoading_item: true, 
          isLoading_category: true, 
          isLoading_color: true, 
          isLoading_images: true, 
          isLoading_reviews: true, 
          isLoading_related: true, 
          logFlag: false,
          dataItem: [],
          dataCategory: [],
          dataColor: [],
          dataImages: [],
          dataReviews: [],
          dataRelatedProducts: [],
          item_size: 0,
      }
  }
  
 
  static navigationOptions = {
    //Setting the header of the screen
    headerTransparent: true
  };

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  checkLogin() {
    this.setState({check: false});
    console.log("**********CHECK LOGIN**************");
    AsyncStorage.getItem("userData").then((response) => {
      
      let data = JSON.parse(response);
      let js_data = JSON.stringify(data);
      
      console.log(data.user)
      if(js_data != 'null'){
        this.setState({logged: true});
        this.setState({username: data.user.username});
        this.setState({type: data.user.groups[0].name});
        this.setState({user_id: data.user.id});
        this.setState({token: data.token});
        console.log("L'utente " + data.user.username + " è attualmente loggato")
      }
      })
      .catch(err => {console.log("fetch error" + err); })
  }

  delete_item = async () => {  
      
    let path = "http://192.168.1.39:8000/item/api/delete/"+ this.props.id + "/";

    axios
    .post(path, {
      headers: {
        'Authorization': 'Token ' + this.state.token
      }})
      .then(res => {
        alert('Oggetto eliminato correttamente.');
        Actions.host();
      })
      .then(responseData => { console.log(responseData); return responseData; })
      .catch(err => {
        console.log("fetch error" + err); 
      })
     
   }


  getItem = () => { 
    this.setState({isLoading_item: false});
    let path = "http://192.168.1.39:8000/item/api/item/"+ this.props.id;
    
    console.log("**********GET ITEM**************");
    
      fetch((path), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => {/*  console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataItem": data, isLoading_item: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  getCategory = () => { 
    if(this.state.isLoading_item){
      this.getItem()
    }
    this.setState({isLoading_category: false});
    console.log("**********GET CATEGORY**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_categories/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataCategory": data, isLoading_category: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  getColor = () => { 
    if(this.state.isLoading_category){
      this.getCategory()
    }
    this.setState({isLoading_color: false});
    console.log("**********GET COLOR**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_colors/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataColor": data, isLoading_color: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  getImages = () => { 
    if(this.state.isLoading_color){
      this.getColor()
    }
    this.setState({isLoading_images: false});
    console.log("**********GET IMAGES**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_images/"), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataImages": data, isLoading_images: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  getReviews = () => { 
    if(this.state.isLoading_images){
      this.getImages()
    }
    this.setState({isLoading_reviews: false});
    console.log("**********GET REVIEWS**************");


      fetch(("http://192.168.1.39:8000/item/api/item_reviews/" + this.props.id), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataReviews": data, isLoading_reviews: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  getRelatedProducts = () => { 
    if(this.state.isLoading_reviews){
      this.getReviews()
    }
    this.setState({isLoading_related: false});
    console.log("**********GET RELATED PRODUCTS**************");
    
      fetch(("http://192.168.1.39:8000/item/api/item_category/" + this.props.category), {
          method: 'GET',
      })
          .then(response => { return response.json(); })
          .then(responseData => { /* console.log(responseData); */ return responseData; })
          .then(data => { this.setState({ "dataRelatedProducts": data, isLoading_related: false  }); }) 
          .catch(err => {
              console.log("fetch error " + err); 
          });
  }

  _renderRelatedProducts = ({ item, index }) => {
    let path_card = "http://192.168.1.39:8000" + item.img;
      
    return(
        <TouchableOpacity style={{flex: 0.5}} onPress={() => Actions.item({'id': item.id, 'title': item.name, 'category': item.category, 'username': this.state.username})}>
          <Card
            image={{uri: path_card}}
            imageStyle={{height:225}}
            containerStyle={[styles.card, { height: 275}]}
          >
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardTextPrice} >{item.price} $</Text>
          </Card>
        </TouchableOpacity> 
    );
  }
  



  render () {
    
    if (this.state.isLoading_related) {
      this.getRelatedProducts();
      this.checkLogin()
      return (
          <View>
              <ActivityIndicator size="large" animating />
          </View>
      );
    }    
    else {
      
      let path = "http://192.168.1.39:8000" + this.state.dataItem.img;
      console.log(this.state.dataItem.img)

      
      if(!this.isEmpty(this.state.dataRelatedProducts)){
        this.state.dataRelatedProducts.splice(this.state.dataRelatedProducts.findIndex(v => v.id === this.props.id), 1);
      }

      
      var change = []
      if(!this.isEmpty(this.state.dataItem)){
        if(this.state.user_id == this.state.dataItem.owner){
          change.push(
            <TouchableOpacity
              onPress={()=> Actions.update_item({ 'item' : this.state.dataItem})}
              style={{
                position: "absolute",
                bottom: 50,
                right: 15,
                width: 60,
                height: 60,
                backgroundColor:'blue',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:30,
                padding: 5
              }}>
                <Icon name="edit" type="font-awesome" size={27} color={"white"} />
            </TouchableOpacity>)
            change.push(<TouchableOpacity
              onPress={()=> this.delete_item()}
              style={{
                position: "absolute",
                bottom: 130,
                right: 15,
                width: 60,
                height: 60,
                backgroundColor:'red',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:30,
                padding: 5
              }}>
                <Icon name="trash-o" type="font-awesome" size={27} color={"white"} />
            </TouchableOpacity>)  
        }
        else {
          change.push(<View></View>)
        }
      } else {
        change.push(<View></View>)
      }


      for (var i = 0; i < this.state.dataCategory.length; i++){
        if (this.state.dataCategory[i].id == this.state.dataItem.category){
          var category = this.state.dataCategory[i].name
        }
      }
      
      var color = []
      if(this.state.dataItem.color){
        for (var i = 0; i < this.state.dataItem.color.length; i++){
          color.push(<View style={{ borderRadius: 10, borderColor: "black", borderWidth: 1, width: 15, height: 15, marginTop: 10, marginRight: 10, backgroundColor: this.state.dataItem.color[i].name}}></View>)
        }
      }
      

      var images = []
      if(this.state.dataImages && this.state.dataItem.images){
        for (var i = 0; i < this.state.dataImages.length; i++){
          for(var n = 0; n < this.state.dataItem.images.length; n++){
            if (this.state.dataImages[i].id == this.state.dataItem.images[n]){
              images.push(<Image source={{ uri : "http://192.168.1.39:8000" + this.state.dataImages[i].image}}  style={{ width:"33%", height: 180}}/>)
            }
          }
        }
      }

      var vote = []
      if(this.state.dataReviews){
        var vote_num = 0
        for (var i = 0; i < this.state.dataReviews.length; i++){
          vote_num += this.state.dataReviews[i].vote
        }
        vote_num = vote_num / this.state.dataReviews.length
        vote_num = Math.round(vote_num)
        for (var s = 0; s < vote_num; s++){
          vote.push(<Icon name="star" size={18} type="font-awesome" color="blue" style={{ margin: 3}} />)
        }
        for (var s = 0; s < 5 - vote_num; s++){
          vote.push(<Icon name="star-o" size={18} type="font-awesome" color="blue" style={{ margin: 3}} />)
        }
      }


      var reviews = []
      if(this.state.dataReviews.length > 0){
        reviews.push(<Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: "bold", marginTop: 30}}>Reviews</Text>)
        for (var i = 0; i < this.state.dataReviews.length; i++){
          var vote_review = []
          for (var s = 0; s < this.state.dataReviews[i].vote; s++){
            vote_review.push(<Icon name="star" type="font-awesome" size={18} color="blue" style={{ marginRight: 3}} />)
          }
          for (var s = 0; s < 5 - this.state.dataReviews[i].vote; s++){
            vote_review.push(<Icon name="star-o" type="font-awesome" size={18} color="blue" style={{ marginRight: 3}} />)
          }
          if (this.state.dataReviews[i].img){
            reviews.push(<View style={{ flexDirection: 'row', marginTop: 20}}>
              <Image source={{ uri : "http://192.168.1.39:8000" + this.state.dataReviews[i].img}}  style={{ width:"30%", height: 180}}/>
              <View style={{ paddingLeft: 20, flexDirection: 'column', flexShrink: 1}}>
                <View style={{flexDirection: 'row'}}>
                  {vote_review}
                </View>
                <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 5}}>{this.state.dataReviews[i].title}</Text>
                <Text style={{ fontSize: 10, textAlign:'justify'}}>{this.state.dataReviews[i].comment}</Text>
                <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 3}}>{this.state.dataReviews[i].user}</Text>
              </View>
          </View>
          ) 
          reviews.push(<View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 20, marginTop: 5 }}></View>)
          } else {
            reviews.push(<View style={{ flexDirection: 'row', marginTop: 20}}>
            <View style={{ width:"30%"}}></View>
            <View style={{ paddingLeft: 20, flexDirection: 'column', flexShrink: 1}}>
              <View style={{flexDirection: 'row'}}>
                {vote_review}
              </View>
              <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 5}}>{this.state.dataReviews[i].title}</Text>
              <Text style={{ fontSize: 10, textAlign:'justify'}}>{this.state.dataReviews[i].comment}</Text>
              <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 3}}>{this.state.dataReviews[i].user}</Text>
            </View>
        </View>
       ) 
       reviews.push(<View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 20, marginTop: 5 }}></View>)
          }   
        }
      }
      
      return (
        <ScrollView>
          <View>
            <Image
              style={{ height: 500, width: "100%"}}
              source={{ uri : path}}
            />
            <TouchableOpacity
              onPress={()=> Actions.ChooseSize({ 'item' : this.state.dataItem})}
              style={{
                position: "absolute",
                bottom: -30,
                right: 15,
                width: 60,
                height: 60,
                backgroundColor:'orange',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:"center",
                borderRadius:30,
                padding: 5
              }}>
                <Icon name="shopping-cart" type="font-awesome" size={27} color={"white"} />
            </TouchableOpacity>
            {change}
          </View>
          <View style={{flexDirection: 'column', margin: 20}}>
           <View style={{flexDirection: 'row'}}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 25, fontWeight: "bold"}}>{this.state.dataItem.name}</Text>
           </View>
           <View >
             <View style={{flexDirection: 'row'}}>
              <Text style={{ fontFamily: 'Roboto', fontSize: 15, marginTop: 10}}>{category}</Text>
              <Text style={{ fontFamily: 'Roboto', fontSize: 20, marginLeft: "auto", marginTop: 5, color: "blue"}}>{this.state.dataItem.price} $</Text>
             </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {color}
              <View style={{flexDirection: 'row', marginLeft: "auto", marginTop: 5}}>{vote}</View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {images}
            </View>
            <Text style={{ fontFamily: 'Roboto', fontSize: 15, marginTop: 20, textAlign:'justify'}}>{this.state.dataItem.description}</Text>
            {reviews}
            <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 15 }} onPress={() => Actions.AddReview({'item_id' : this.state.dataItem.id})}>
              <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>ADD REVIEW</Text>
              <Icon color="white" name="comment" type="font-awesome" />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: "bold", marginTop: 50, textAlign: "center", marginBottom: 15}}>Related products</Text>
            
          </View>
          </View>
          <View style={{ marginBottom: 40 }}>
              <FlatList
                data={this.state.dataRelatedProducts}
                renderItem={this._renderRelatedProducts}
                keyExtractor={(item, index) => index}
                numColumns={2}
                style={{ flexDirection: 'column', backgroundColor: "white", flexShrink: 1,}}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize: 23,
    textAlign: 'center',
    color: '#f00',
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
  list: {
    justifyContent: 'space-around',
  },
  column: {
    flexShrink: 1,
  },
});

