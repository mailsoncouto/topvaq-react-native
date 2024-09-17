import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Play = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Play</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  screenName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Play;
