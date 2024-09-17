import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Campeonato = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenName}>Campeonato</Text>
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

export default Campeonato;
