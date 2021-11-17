/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/Home';
import AddContact from './src/screens/AddContact';

const DashboardStack = createNativeStackNavigator();

const App: () => Node = () => {

  return (
      <NavigationContainer>
        <DashboardStack.Navigator initialRouteName="home">
          <DashboardStack.Screen name="home" component={Home} options={{ title: 'Home' }}/>
          <DashboardStack.Screen name="add_contact" component={AddContact} options={{ title: 'Add Contact' }} />
        </DashboardStack.Navigator>
      </NavigationContainer>
  );
};

export default App;
