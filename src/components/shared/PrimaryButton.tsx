import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props {
  disabled?: boolean;
  onPress: () => void;
  text: string;
}

const PrimaryButton = ({disabled, onPress, text}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, disabled && styles.disabled]}
    disabled={disabled}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5B58AD',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 148,
    height: 48,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#DDDDDD',
  },
});

export default PrimaryButton;
