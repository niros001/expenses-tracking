import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  onPress: () => void;
}

const RoundButton = ({onPress}: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name="plus" size={30} color="white" />
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
});

export default RoundButton;
