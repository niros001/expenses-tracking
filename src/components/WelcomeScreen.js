import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  const onLogin = useCallback(() => {
    navigation.navigate('Tabs');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Welcome!</Text>
      </View>
      <View style={styles.loginButtonWrapper}>
        <Button onPress={onLogin} title="Login" />
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
  loginButtonWrapper: {
    marginBottom: 50,
  },
});

export default HomeScreen;
