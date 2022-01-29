import React from 'react';
import Header from './components/Header';
import Capture from './components/Capture';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Main({ navigation }) {

  var faceCaptured = (photo) => {
    navigation.navigate('Photo')
  }

  return (
    <View style={styles.container}>

      <Header/>

      <Capture onCapture={faceCaptured}/>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});
