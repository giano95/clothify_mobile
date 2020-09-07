import * as React from 'react';
import {Component} from 'react';
import { StatusBar, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import SplashScreen from 'react-native-splash-screen'

export default class WelcomePage extends Component {

    componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    componentWillUnmount() {
      StatusBar.setHidden(false);
    }

    render() {
      return (
        <>
          <StatusBar
          hidden={true}
          />
          <Router />
        </>
      )
    }
  
}

