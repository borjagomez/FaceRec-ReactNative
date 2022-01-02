import React from 'react';
import Header from './components/Header';
import Capture from './components/Capture';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Main() {

  return (
    <View style={styles.container}>

      <Header/>

      <Capture/>

      <TouchableOpacity
        style={styles.buttonCapture}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>

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
  buttonCapture: {
    backgroundColor: "#888",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }  
});
