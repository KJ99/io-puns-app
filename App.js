/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import { NavigationContainer } from '@react-navigation/native';
 import React from 'react';
 import { SafeAreaView, Text, View } from 'react-native';
 import { createStackNavigator } from '@react-navigation/stack';
 import MainMenu from './src/screens/main-menu';
import JoinGame from './src/screens/join-game';
import Settings from './src/screens/settings';
 import CreateGame from './src/screens/create-game'
 import Play from './src/screens/play'
 
 const Stack = createStackNavigator()
 
 const App = () => {
   return (
       <SafeAreaView style={{
          flex: 1, 
          backgroundColor: '#f57242' 
        }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="menu">
              <Stack.Screen name="menu" component={MainMenu} options={{ headerShown: false }} />
              <Stack.Screen name="join" component={JoinGame} options={{ headerShown: false }} />
              <Stack.Screen name="settings" component={Settings} options={{ headerShown: false }} />
              <Stack.Screen name="create" component={CreateGame} options={{ headerShown: false }} />
              <Stack.Screen name="play" component={Play} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
       </SafeAreaView>
   );
 };
 
 export default App;
 