import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const RoundButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>+</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455EFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 56,
    width: 56,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default RoundButton;
