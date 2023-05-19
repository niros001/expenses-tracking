import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {PrimaryButton} from '../shared';
import storage from '../../storage';

const WelcomeScreen = ({navigation}) => {
  const [textInput, setTextInput] = useState('');

  const onLogin = useCallback(() => {
    storage.save({key: 'user', data: textInput}).then(() => {
      navigation.navigate({name: 'Tabs', params: {user: textInput}});
    });
  }, [navigation, textInput]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name please"
          value={textInput}
          onChangeText={setTextInput}
        />
      </View>
      <View style={styles.loginButtonWrapper}>
        <PrimaryButton disabled={!textInput} onPress={onLogin} text="Login" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: '#5B58AD',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 12,
  },
  loginButtonWrapper: {
    marginBottom: 50,
  },
});

export default WelcomeScreen;
