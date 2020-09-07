import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { Actions } from 'react-native-router-flux';

const Start = () => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title]}>Vota il tuo piatto preferito!</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={()=> Actions.home()}>
                    <LinearGradient
                        colors={['#00FFFF', '#00FF7F']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Esplora come Ospite</Text>
                        <MaterialIcons 
                            name="navigate-next"
                            color="#000"
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>                
            <View style={styles.button}>
                <TouchableOpacity onPress={()=> Actions.login()}>
                    <LinearGradient
                        colors={['#00FFFF', '#00FF7F']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Non hai un account? 
                    <Text style={{ color: '#FFF0F5', fontWeight: 'bold' }} onPress={() => Actions.register()}>
                        {' Registrati'}
                    </Text>
                </Text>            
            </View>
        </Animatable.View>
      </View>
    );
};

export default Start;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFF5EE'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#009387',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30
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
  }
  
});
