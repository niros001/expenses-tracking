import * as React from 'react';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import WelcomeScreen from './src/components/WelcomeScreen';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';

const storage = new MMKVLoader().initialize();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{tabBarIcon: () => null}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{tabBarIcon: () => null}}
    />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useMMKVStorage('user', storage, null);
  const [expenses, setExpenses] = useMMKVStorage('expenses', storage, []);

  return (
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
