// App.js
import React from 'react';
import Main from './Main';
import PhotoScreen from './components/PhotoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;