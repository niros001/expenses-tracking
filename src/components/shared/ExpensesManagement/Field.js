import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const Field = ({title, value, onChangeText}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{title}</Text>
    <TextInput value={value} onChangeText={onChangeText} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  label: {
    fontSize: 18,
    color: '#A6A6A6',
    marginBottom: 5,
  },
});

export default Field;
