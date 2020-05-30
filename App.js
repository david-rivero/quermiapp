import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**** Views ****/
import HomeGuest from './Project/Views/Home/HomeGuest';
import SignIn from './Project/Views/SignSteps/SignIn';


const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={screenOptions} initialRouteName="HomeGuest">
        <Stack.Screen name="HomeGuest" component={HomeGuest} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
