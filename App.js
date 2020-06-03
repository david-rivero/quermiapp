import 'react-native-gesture-handler';

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**** Views ****/
import HomeGuest from './Project/Views/Home/HomeGuest';
import SignIn from './Project/Views/SignSteps/SignIn';
import SignUp from './Project/Views/SignSteps/SignUp';


const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions} initialRouteName="HomeGuest">
          <Stack.Screen name="HomeGuest" component={HomeGuest} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
