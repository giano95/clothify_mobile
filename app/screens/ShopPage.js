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
Picker,
AsyncStorage,
TextInput
} from 'react-native';

import {Icon, Header, Card, SearchBar} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import DocumentPicker from 'react-native-document-picker';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


/* import {RadioButton} from 'react-native-paper' */
import { FlatList } from 'react-native-gesture-handler';

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
                    {/* <Icon style={{marginTop: 4}} color="white" name="search" type="font-awesome" /> */}
                    <Text style={{ color: "white", fontSize: 23, marginLeft: 15}}>Shop</Text>
                </View>
            }
            />
          </View>
        );
      }
    }
};

function RadioButton(props) {
    return (
        <View style={[{
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 10,
                width: 10,
                borderRadius: 6,
                backgroundColor: '#000',
              }}/>
              : null
          }
        </View>
    );
  }

  function RadioButton_color(props) {
    return (
        <View style={[{
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          backgroundColor: props.color
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 10,
                width: 10,
                borderRadius: 6,
                backgroundColor: '#000',
              }}/>
              : null
          }
        </View>
    );
  }

export default class Shop extends Component {

    constructor() {
        super();
        this.state = { 
            isLoading: true,
            dataSource: [],
            dataCategory: [],
            dataColor: [],
            dataSize: [],
            dataReviews: [],
            min_price: '',
            max_price: '',
            search: ''
        }
    }

    updateSearch = (search) => {
        this.setState({ search });
    };

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

    getReviews = () => { 
        
        this.setState({isLoading_reviews: false});
        console.log("**********GET REVIEWS**************");
        
          fetch(("http://192.168.1.39:8000/item/api/item_reviews_all/"), {
              method: 'GET',
          })
              .then(response => { return response.json(); })
              .then(responseData => { /* console.log(responseData); */ return responseData; })
              .then(data => { this.setState({ "dataReviews": data, isLoading_reviews: false  }); }) 
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

    getColors = () => {
        this.setState({isLoading: false});
        console.log("**********GET COLORS**************");
        
          fetch(("http://192.168.1.39:8000/item/api/item_colors/"), {
              method: 'GET',
          })
              .then(response => { return response.json(); })
              .then(responseData => { /* console.log(responseData); */ return responseData; })
              .then(data => { this.setState({ "dataColor": data, isLoading: false }); }) 
              .catch(err => {
                  console.log("fetch error " + err); 
              });
    }

    getSizes = () => {
        this.setState({isLoading: false});
        console.log("**********GET SIZES**************");
        
          fetch(("http://192.168.1.39:8000/item/api/item_sizes/"), {
              method: 'GET',
          })
              .then(response => { return response.json(); })
              .then(responseData => { /* console.log(responseData); */ return responseData; })
              .then(data => { this.setState({ "dataSize": data, isLoading: false }); }) 
              .catch(err => {
                  console.log("fetch error " + err); 
              });
    }

    _renderItem = ({ item, index }) => {
        let path = "http://192.168.1.39:8000" + item.img;
        
        /* console.log(item) */
        /* Controllo  categorie */
        if(this.props.categorySelected && this.props.categorySelected != item.category){
            return(<View></View>)
        } 
        /* Controllo taglie */
        if(this.props.sizeSelected){
            var print_size = false
            for( var i = 0; i < item.quantities_size.length; i++){
                if(this.props.sizeSelected == item.quantities_size[i].size && item.quantities_size[i].quantity > 0){
                    var print_size = true
                }
            }
            if(!print_size){
                return(<View></View>)
            }
        } 
        /* Controllo color */
        if(this.props.colorSelected){
            
            var print_color = false
            for( var i = 0; i < item.color.length; i++){
                if(this.props.colorSelected == item.color[i].id){
                    var print_color = true
                }
            }
            if(!print_color){
                return(<View></View>)
            }
        }
        /* Controllo min_price */
        if(this.props.min_price){
            if(item.price < this.props.min_price){
                return(<View></View>)
            }
        }
        /* Controllo max_price */
        if(this.props.max_price){
            if(item.price > this.props.max_price){
                return(<View></View>)
            }
        }
        /* Controllo del vote */
        if(this.props.vote){
            var vote_total = 0
            var count = 0
            for ( var i = 0; i < this.state.dataReviews.length; i++){
                if(this.state.dataReviews[i].item == item.id){
                    count += 1
                    vote_total += this.state.dataReviews[i].vote
                }
            }
            if(count == 0){
                return(<View></View>)
            }
            vote_total = vote_total / count
            if(vote_total<= this.props.vote -1 || vote_total > this.props.vote ){
                return(<View></View>)
            }
        }
        /* Controllo search */
        if(this.props.search){
            var match = this.props.search
            var name = item.name
            if(!name.toLowerCase().includes(match.toLowerCase())){
                return(<View></View>)
            }
        }



        
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
        
        if(this.props.categorySelected && item.id == this.props.categorySelected ){
            return (
                <TouchableOpacity  onPress={() => Actions.refresh({'categorySelected': ''})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton selected={true}/>
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>  
            );
            
        } else {
            return(
                <TouchableOpacity  onPress={() => Actions.refresh({'categorySelected': item.id})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton />
                        <Text>{item.name}</Text>
                    </View>
                </TouchableOpacity>         
            );
        }
        
    }

    _renderSize = ({ item, index }) => {
        
        if(this.props.sizeSelected && item.tag == this.props.sizeSelected ){
            return (
                <TouchableOpacity  onPress={() => Actions.refresh({'sizeSelected': ''})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton selected={true}/>
                        <Text>{item.tag}</Text>
                    </View>
                </TouchableOpacity>  
            );
            
        } else {
            return(
                <TouchableOpacity  onPress={() => Actions.refresh({'sizeSelected': item.tag})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton />
                        <Text>{item.tag}</Text>
                    </View>
                </TouchableOpacity>         
            );
        }
        
    }

    _renderColor = ({ item, index }) => {
        
        if(this.props.colorSelected && item.id == this.props.colorSelected ){
            return (
                <TouchableOpacity  onPress={() => Actions.refresh({'colorSelected': ''})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton_color selected={true} color={ item.name} />
                        <Text >{item.name}</Text>
                    </View>
                </TouchableOpacity>  
            );
            
        } else {
            return(
                <TouchableOpacity  onPress={() => Actions.refresh({'colorSelected': item.id})}>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <RadioButton_color color={ item.name}/>
                        <Text >{item.name}</Text>
                    </View>
                </TouchableOpacity>         
            );
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

    

    render() {

        const { search } = this.state;
        if (this.state.isLoading){
            this.getImages();
            this.getCategory();
            this.getColors();
            this.getSizes();
            this.checkLogin();
            this.getReviews();
            return(
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            );
        }
        else{   

            
            var vote = []
            if(this.props.vote){
                if(this.props.vote == 1) {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': ''})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton selected={true}/>
                            <Text>⭐</Text>
                        </View>
                    </TouchableOpacity>) 
                } else {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': 1})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton/>
                            <Text>⭐</Text>
                        </View>
                    </TouchableOpacity> )
                }
                if(this.props.vote == 2) {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': ''})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton selected={true}/>
                            <Text>⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                } else {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': 2})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton/>
                            <Text>⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                }
                if(this.props.vote == 3) {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': ''})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton selected={true}/>
                            <Text>⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                } else {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': 3})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton/>
                            <Text>⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                }
                if(this.props.vote == 4) {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': ''})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton selected={true}/>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                } else {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': 4})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton/>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                }
                if(this.props.vote == 5) {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': ''})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton selected={true}/>
                            <Text>⭐⭐⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                } else {
                    vote.push(<TouchableOpacity  onPress={() => Actions.refresh({'vote': 5})}>
                        <View style={{ flexDirection: "row", marginTop: 7}}>
                            <RadioButton/>
                            <Text>⭐⭐⭐⭐⭐</Text>
                        </View>
                    </TouchableOpacity>  )
                }
                
            } else {
                vote.push(
                    <View>
                        <TouchableOpacity  onPress={() => Actions.refresh({'vote': 1})}>
                            <View style={{ flexDirection: "row", marginTop: 7}}>
                                <RadioButton/>
                                <Text>⭐</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => Actions.refresh({'vote': 2})}>
                            <View style={{ flexDirection: "row", marginTop: 7}}>
                                <RadioButton/>
                                <Text>⭐⭐</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => Actions.refresh({'vote': 3})}>
                            <View style={{ flexDirection: "row", marginTop: 7}}>
                                <RadioButton/>
                                <Text>⭐⭐⭐</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => Actions.refresh({'vote': 4})}>
                            <View style={{ flexDirection: "row", marginTop: 7}}>
                                <RadioButton/>
                                <Text>⭐⭐⭐⭐</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => Actions.refresh({'vote': 5})}>
                            <View style={{ flexDirection: "row", marginTop: 7}}>
                                <RadioButton/>
                                <Text>⭐⭐⭐⭐⭐</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                )
            }


            return(
                
                <ScrollView>  
                    <MainHeader logged={this.state.logged} username={this.state.username} type={this.state.type}/>
                    <View style={{ margin: 15, flexDirection:"row"}}>
                        <SearchBar
                            leftIconContainerStyle={{backgroundColor: 'white', color: "black"}}
                            rightIconContainerStyle={{backgroundColor: 'white'}}
                            inputStyle={{backgroundColor: 'white'}}
                            inputContainerStyle={{backgroundColor: 'white'}}
                            containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5, width: "80%"}}
                            
                            placeholder="Search here"
                            onChangeText={this.updateSearch}
                            value={search}
                        /> 
                        <View style={{ alignItems:"center", justifyContent:"center", width:"20%"}}>
                            <TouchableOpacity onPress={() => Actions.refresh({'search': this.state.search})}  >
                                <Icon name="angle-right" type="font-awesome" size={45} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>

                        <View style={{width: "40%", flexDirection: 'column'}}>

                            <View style={{marginLeft: 15}}>
                                <Text style={{marginTop: 8, fontWeight:"bold", fontSize:18, marginBottom: 5}}>Category:</Text>
                                <FlatList
                                    data={this.state.dataCategory}
                                    renderItem={this._renderCategory}
                                    keyExtractor={(item, index) => index}
                                    style= {{ }}
                                />
                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15, marginTop: 15 }}></View>
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontWeight:"bold", fontSize:18, marginBottom: 5}}>Color:</Text>
                                <FlatList
                                    data={this.state.dataColor}
                                    renderItem={this._renderColor}
                                    keyExtractor={(item, index) => index}
                                    style= {{ }}
                                />
                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15, marginTop: 15 }}></View>
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontWeight:"bold", fontSize:18, marginBottom: 5}}>Size:</Text>
                                <FlatList
                                    data={this.state.dataSize}
                                    renderItem={this._renderSize}
                                    keyExtractor={(item, index) => index}
                                    style= {{ }}
                                />
                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15, marginTop: 15 }}></View>
                            </View>
                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontWeight:"bold", fontSize:15}}>Min price:</Text>
                                <View style={{flexDirection: "row"}}>
                                    <TextInput
                                        value = {this.state.min_price}
                                        keyboardType = 'numeric'  
                                        style={{ borderWidth: 1, borderRadius: 8, width:"70%", marginTop: 10, marginRight: 15}}            
                                        onChangeText={(text) => this.setState({min_price: text})}
                                        />
                                    <TouchableOpacity style={{ justifyContent:"center", alignItems: "center"}} onPress={() => Actions.refresh({'min_price': this.state.min_price})} >
                                        <Icon name="search" type="font-awesome" />
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={{ fontWeight:"bold", fontSize:15, marginTop: 10}}>Max price:</Text>
                                <View style={{flexDirection: "row"}}>
                                    <TextInput
                                        value = {this.state.max_price}
                                        keyboardType = 'numeric'  
                                        style={{ borderWidth: 1, borderRadius: 8, width:"70%", marginTop: 10, marginRight: 15}}            
                                        onChangeText={(text) => this.setState({max_price: text})}
                                        />
                                    <TouchableOpacity style={{ justifyContent:"center", alignItems: "center"}} onPress={() => Actions.refresh({'max_price': this.state.max_price})}>
                                        <Icon name="search" type="font-awesome" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 15, marginTop: 15 }}></View>
                            </View>

                            <View style={{marginLeft: 15}}>
                                <Text style={{ fontWeight:"bold", fontSize:18, marginBottom: 5}}>Vote:</Text>
                                {vote}
                            </View>
                        </View>

                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index}
                            style= {{ width: "60%"}}
                        />
                         
                    </View>
                </ScrollView>
            );
        }
    }
}
const styles = StyleSheet.create({
  
  headerText: {
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
});    


    
  
