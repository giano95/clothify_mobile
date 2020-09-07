import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import {Icon, Header} from 'react-native-elements';



import MainActivity from './screens/MainPage';
import Login from './screens/LoginPage';
import Register from './screens/RegisterPage';
import Start from './screens/StartPage';
import Upload from './screens/UploadPage';
import Rank from './screens/RankPage';
import Item from './screens/ItemPage';
import Shop from './screens/ShopPage';
import AddReview from './screens/AddReviewPage';
import Cart from './screens/CartPage';
import Contact from './screens/ContactPage';
import SendMail from './screens/SendMailPage';
import ChooseSize from './screens/ChooseSizePage';
import AddItem from './screens/AddItemPage';
import UpdateItem from './screens/UpdateItemPage';
import Checkout from './screens/CheckoutPage';
import Payment from './screens/PaymentPage';


class HomeIcon extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', width:30, height:30 }}>
                <Icon name="home" type="font-awesome" />
            </View>
        );
    }
};
class ShopIcon extends React.Component {
  render() {
      return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', width:30, height:30 }}>
              <Icon name="search" type="font-awesome" />
          </View>
      );
  }
};
class MapIcon extends React.Component {
  render() {
      return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', width:30, height:30 }}>
              <Icon name="map-marker" type="font-awesome" />
          </View>
      );
  }
};

class RouterComponent extends React.Component {

  constructor() {
    super();
    this.state = { 
        logged: false,
        isLoading: true,
    }
  }

  render(){

      return(
        <Router>
        <Scene header={null}>
          <Scene
              key="host"
              tabs={true}  
          >          
            <Scene 
              key="home" 
              title="Home" 
              component={MainActivity}
              icon={HomeIcon} 
              initial
            />
            <Scene
              key="shop"
              title="Shop"
              component={Shop}
              icon={ShopIcon}
            />  
            
            {/* <Scene 
              key="add_item" 
              title="Add item" 
              icon={PlusIcon} 
              component={Cart}
            />
            <Scene
              title="Cart"
              key="cart"
              component={Cart}
              icon={CartIcon}
            />   */}
            <Scene
              title="Contact us"
              key="contact_us"
              component={Contact}
              icon={MapIcon}
            />                            
          </Scene>

          <Scene
            title="Login"
            key="login"
            component={Login}
          />
          <Scene 
            key="add_item" 
            title="Add item" 
            component={AddItem}
          />
          <Scene 
            key="update_item" 
            title="Update item" 
            component={UpdateItem}
          />
          <Scene
            title="Cart"
            key="cart"
            component={Cart}
          />  
          <Scene
            title="Register"
            key="register"
            component={Register}
          />
          <Scene
            title="Item"
            key="item"
            component={Item}
          />
          <Scene
            title="AddReview"
            key="AddReview"
            component={AddReview}
          /> 
          <Scene
            title="SendMail"
            key="SendMail"
            component={SendMail}
          /> 
          <Scene
            title="ChooseSize"
            key="ChooseSize"
            component={ChooseSize}
          />
          <Scene 
            key="checkout" 
            title="Checkout" 
            component={Checkout}
          />
          <Scene 
            key="payment" 
            title="Payment" 
            component={Payment}
          />
          {/* <Scene
            title="Carica immagine"
            key="upload"
            component={Upload}
            icon={UploadIcon}
          />    */}                                 
        </Scene>                               
      </Router>
    );  
  }
}


const style = StyleSheet.create({
  navBarStyle: {
    top: StatusBar.currentHeight,
    backgroundColor: '#009387'
  },
  titleStyle: {
    flexDirection: 'row',
    width: 200,
    color: 'white',
    fontWeight: 'bold'
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

export default RouterComponent;


          // <Scene hideNavBar header={null}
          //     key="logged"
          //     tabs={true}
          //     initial={this.props.logged}            
          // >          
          //   <Scene 
          //     key="home" 
          //     title="Foodfight" 
          //     icon={HomeIcon} 
          //     component={MainActivity}
          //   />
          //   <Scene 
          //     key="rank" 
          //     title="Classifica" 
          //     icon={TabIcon} 
          //     component={Rank}
          //   />
          //   <Scene
          //     title="Statistiche"
          //     key="statistics"
          //     component={Statistics}
          //     icon={ChartIcon}
          //   />           
          //   <Scene
          //     title="Carica immagine"
          //     key="upload"
          //     component={Upload}
          //     icon={UploadIcon}
          //   />
          //   <Scene
          //     title="Logout"
          //     key="logout"
          //     component={Logout}
          //   />            
          //   </Scene>                              
          //   <Scene header={null}
          //     title="Profilo Utente"
          //     key="profile"
          //     component={Profile}
          //   /> 