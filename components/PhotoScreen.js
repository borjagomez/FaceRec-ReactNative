// ./components/Camera.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PhotoScreen(props) {

  return (
    <View style={styles.container}>
      <Text>Photo</Text>
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
