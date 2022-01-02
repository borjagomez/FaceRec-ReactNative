// ./components/Header.js
import React from 'react';
import logo from '../assets/rever-logo.jpg';
import { View, Image, StyleSheet } from 'react-native';
const Header = () => (
  <View style={styles.headerContainer}>
    <Image source={logo} style={styles.logo} /> 
  </View>
);
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 40
  },
  logo: {
    width: 100,
    height: 100 
  },
});
export default Header;