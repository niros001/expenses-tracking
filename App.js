import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  WelcomeScreen,
  HomeScreen,
  ProfileScreen,
} from './src/components/screens';
import storage from './src/storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = ({route: {params}}) => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{tabBarIcon: () => null, headerTitle: params.user}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{tabBarIcon: () => null, headerTitle: params.user}}
    />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage
      .load({key: 'user'})
      .then(value => {
        setUser(value);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{title: null}}
          />
        )}
        <Stack.Screen
          name="Tabs"
          component={TabsNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialParams={{user}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
