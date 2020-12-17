import 'react-native-gesture-handler';

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

/**Store**/
import store from './Project/Store/store';

/**** Views ****/
import HomeGuest from './Project/Views/Home/HomeGuest';
import SignIn from './Project/Views/SignSteps/SignIn';
import SignUp from './Project/Views/SignSteps/SignUp';
import HomeSignedIn from './Project/Views/Home/HomeSignedIn';
import SearchProfile from './Project/Views/Profile/SearchProfile';
import DetailProfileOnSearch from './Project/Views/Profile/DetailProfileOnSearch';
import Match from './Project/Views/Profile/Match';
import ChatList from './Project/Views/Home/ChatList';
import ChatDetail from './Project/Views/Home/ChatDetail';
import RateProfileList from './Project/Views/Profile/RateProfileList';
import RateProfile from './Project/Views/Profile/RateProfile';
import BaseConfiguration from './Project/Views/Configuration/BaseConfiguration';
import Camera from './Project/Views/Home/Camera';
import Payments from './Project/Views/Configuration/Payments';
import Billing from './Project/Views/Configuration/Billing';

const NOTIFICATION_CLOSE_INTERVAL = 5000;
const iconAppSrc = require('./Project/Assets/nurse-pink-48.png');
const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false
};

export default function App() {
  return (
    <Provider store={store}>
      <InAppNotificationProvider closeInterval={NOTIFICATION_CLOSE_INTERVAL} iconApp={iconAppSrc}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} initialRouteName="HomeGuest">
              <Stack.Screen name="HomeGuest" component={HomeGuest} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="HomeSignedIn" component={HomeSignedIn} />
              <Stack.Screen name="SearchProfile" component={SearchProfile} />
              <Stack.Screen name="DetailProfileOnSearch" component={DetailProfileOnSearch} />
              <Stack.Screen name="Match" component={Match} />
              <Stack.Screen name="ChatList" component={ChatList} />
              <Stack.Screen name="ChatDetail" component={ChatDetail} />
              <Stack.Screen name="RateProfile" component={RateProfile} />
              <Stack.Screen name="RateProfileList" component={RateProfileList} />
              <Stack.Screen name="Settings" component={BaseConfiguration} />
              <Stack.Screen name="Camera" component={Camera} />
              <Stack.Screen name="Payments" component={Payments} />
              <Stack.Screen name="Billing" component={Billing} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </InAppNotificationProvider>
    </Provider>
  );
}
