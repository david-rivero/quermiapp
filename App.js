import 'react-native-gesture-handler';

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/**** Views ****/
import HomeGuest from './Project/Views/Home/HomeGuest';
import SignIn from './Project/Views/SignSteps/SignIn';
import SignUp from './Project/Views/SignSteps/SignUp';
import HomeSignedIn from './Project/Views/Home/HomeSignedIn';
import SearchProfile from './Project/Views/Profile/SearchProfile';
import Match from './Project/Views/Profile/Match';
import ChatList from './Project/Views/Home/ChatList';
import ChatDetail from './Project/Views/Home/ChatDetail';
import RateProfile from './Project/Views/Profile/RateProfile';


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
          <Stack.Screen name="HomeSignedIn" component={HomeSignedIn} />
          <Stack.Screen name="SearchProfile" component={SearchProfile} />
          <Stack.Screen name="Match" component={Match} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="ChatDetail" component={ChatDetail} />
          <Stack.Screen name="RateProfile" component={RateProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
