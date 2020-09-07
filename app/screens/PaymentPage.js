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
    AsyncStorage
} from 'react-native';
import {Icon, Header, Card, SearchBar} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import RadioButton from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { PaymentCardTextField } from 'tipsi-stripe'
import {loadStripe} from '@stripe/stripe-js';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

 
const width = Dimensions.get('window').width;

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
    field: {
        flex: 1,
        color: '#449aeb',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    }
  })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class Payment extends Component {
    
    constructor() {
        super();
        this.state = { 
            search: '',
            isLoading: true,
            dataSource: [],
            dataOrder: {},
            dataCategory: [],
            categorySource: [],
            user: null,
            isCardValid: false,
            cardParams: null,
            paymentCardInput: null
        }

        // GET the user object
        AsyncStorage.getItem("userData").then((response) => {
            let data = JSON.parse(response);
            let js_data = JSON.stringify(data);
            if(js_data != 'null'){
                this.state.user = data.user
            }
        })
        .catch(err => {console.log("fetch error" + err); })
    }

    static navigationOptions = {
        //Setting the header of the screen
        title: "Payment"
    };

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }


    getOrder = () => { 
        console.log("**********GET ORDER**************");
        AsyncStorage.getItem("userData").then((res) => {
            let data = JSON.parse(res);
            let js_data = JSON.stringify(data);
            if(js_data != 'null'){
                var user_id = data.user.id
            }
            fetch(("http://192.168.1.39:8000/api/payment/" + user_id + '/'), {
                method: 'GET',
                headers: {  
                    'Authorization': 'Token ' + data.token,
                }
            })
            .then(response => { /* console.log(response); */ return response.json(); })
            .then(responseData => { /* console.log(responseData); */ return responseData; })
            .then(data => { this.setState({"dataOrder": data}); console.log(this.state.dataOrder)}) 
            .catch(err => { console.log("fetch error " + err); })
        })
    }

    checkLogin() {
      
      console.log("**********CHECK LOGIN**************");
      AsyncStorage.getItem("userData").then((response) => {
        let data = JSON.parse(response);
        let js_data = JSON.stringify(data);
        if(js_data != 'null'){
          this.setState({logged: true});
          this.setState({username: data.user.username});
          console.log("L'utente " + data.user.username + " è attualmente loggato")
        }
        })
        .catch(err => {console.log("fetch error" + err); })
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
        .then(data => {this.setState({ "dataCategory": data, isLoading_category: false  }); }) 
        .catch(err => {
            console.log("fetch error " + err); 
        });
    }

    _renderOrderItem = ({ item, index }) => {
        let path = "http://192.168.1.39:8000" + item.item.img;

        var colors = []
        for (var n = 0; n < item.item.color.length; n++){
            colors.push(<View style={{ borderRadius: 10, borderColor: "black", borderWidth: 1, width: 15, height: 15, marginTop: 10, marginRight: 10, backgroundColor: item.item.color[n].name}}></View>)
        }
      
        var category = []
        for (var z = 0; z < this.state.dataCategory.length; z++){
            if (this.state.dataCategory[z].id == item.item.category){
                category.push(<Text>{this.state.dataCategory[z].name}</Text>) 
            }
        }
      
        return(

            <View style={{ flexDirection: 'row', marginTop: 20, width:"100%"}}>
              
                <TouchableOpacity style={{ width:"30%", height: 180}} onPress={() => Actions.item({'id': item.item.id, 'title': item.item.name, 'category': item.item.category, 'username': this.state.username})}>
                    <Image source={{ uri : path}}  style={{ width:"100%", height: 180}}/>
                </TouchableOpacity>
                <View style={{ paddingLeft: 20, flexDirection: 'column', flexShrink: 1, width:"100%", borderBottomWidth: 1, borderRightWidth: 1, borderTopWidth: 1}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5}}>{item.item.name}</Text>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>{category}</Text>
                    <View style={{flexDirection:"row"}}>
                        {colors}
                    </View>
                    <Text style={{ fontSize: 12, marginTop: 10}}>{item.item_size}</Text>
                    <View style={{ position:"absolute", bottom: 10, right: 20, flexDirection:"row"}}>
                        <Text style={{ fontSize: 12}}> {item.quantity} X </Text>
                        <Text style={{ fontSize: 12, color:"blue"}}> {item.item.price} $</Text>
                    </View>
                </View>
            </View>        
        );
    }

    send_the_payment = async () => {

        if (!this.state.isCardValid) {
            alert("Inserisci una carta valida")
            return
        }

        var params = this.state.cardParams
        
        var information = {
            card: {
              number: params.number,
              exp_month: params.expMonth,
              exp_year: params.expYear,
              cvc: params.cvc,
              name: 'Billy Joe'
            }
        }

        const stripe_client = require('stripe-client')('pk_test_TdGOpdYCABUJprWUIHJEnwxs00TVEej5Xv');

        var token = await stripe_client.createToken(information);
        console.log(token.id)
        
        AsyncStorage.getItem("userData").then((res) => {
            let data = JSON.parse(res);
            let js_data = JSON.stringify(data);
            if(js_data != 'null'){
                var user_id = data.user.id
            }
            // fetch the client_seceret key from our website API
            fetch(('http://192.168.1.39:8000/api/post_payment/' + user_id + '/'), {
                method: 'POST',
                headers: {  
                    'Authorization': 'Token ' + data.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(token.id)
            })
            .then(response => { return response.json(); })
            .then(responseData => { return responseData; })
            .then(data => {
                if(data.response == 'payment') {
                    Actions.payment()
                }
                else if(data.response == 'home') {
                    alert("Pagamento completato con successo")
                    Actions.home()
                }
                else {
                    console.log('_____PAYMENT__ERROR_____')
                    console.log(data.response)
                }
            }) 
            .catch(err => { console.log("fetch error " + err); });
        })
    }
    
    handleFieldParamsChange = (valid, params) => {
    
        // if the card number are valid save the info
        if (valid == true) {
            this.state.isCardValid = true
            this.state.cardParams = params
        }
    }
    
    isPaymentCardTextFieldFocused = () => this.state.paymentCardInput.isFocused()
    
    focusPaymentCardTextField = () => this.state.paymentCardInput.focus()
    
    blurPaymentCardTextField = () => this.state.paymentCardInput.blur()
    
    resetPaymentCardTextField = () => this.state.paymentCardInput.setParams({})

    render() {
      
        if (this.state.isLoading){
            this.checkLogin();
            this.getOrder();
            this.getCategory();
            this.setState({isLoading: false});
            return(
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            );
        }
        else {

            var cart_empty = []
            if(!this.isEmpty(this.state.dataOrder)) {
                if(this.state.dataOrder.order.length > 0) {
                    cart_empty.push(<View style={{ marginTop: 30, marginBottom: 20, justifyContent:"center", alignItems:"center"}}> 
                                    <TouchableOpacity style={{ backgroundColor: "#1266f1", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: width - 30 }} onPress={()=> this.send_the_payment()}>
                                        <Text  style={{textAlign: 'center', marginRight: 12, color:"white"}}>Pay</Text>
                                    </TouchableOpacity>               
                                </View>
                    );
                }
                else {
                    cart_empty.push(<View style={{marginTop: 20, alignItems:"center"}}><Text style={{fontSize:20, fontWeight:"bold" }}>Your cart is empty :(</Text></View>)
                }
            } else {
                cart_empty.push(<View style={{marginTop: 20, alignItems:"center"}}><Text style={{ fontSize:20, fontWeight:"bold"}}>Your cart is empty :(</Text></View>)
            }

            // --- ACTUAL RENDER STUFF HERE ---
            return(
                <>
                    <ScrollView>
                        <View style={{margin: 10, flex: 1}}>
                            {/* <Text style={{marginTop: 10}}>Content of your cart:</Text> */}
                            <FlatList
                                data={this.state.dataOrder.order}
                                renderItem={this._renderOrderItem}
                                keyExtractor={(item, index) => index}
                                style={{ flexDirection: 'column' , width:"100%", flex: 1}}
                            />
                            {cart_empty}
                            <View>
                            <PaymentCardTextField
                                ref={ (ref) => {
                                    this.state.paymentCardInput = ref
                                }}
                                style={styles.field}
                                    
                                disabled={true}
                                onParamsChange={this.handleFieldParamsChange}
                            />
                            </View>
                        </View>
                    </ScrollView>
                </>
            ); 
        }  
    }
}    
