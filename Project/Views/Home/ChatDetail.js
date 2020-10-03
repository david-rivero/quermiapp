import * as React from 'react';
import { getUnixTime } from 'date-fns';
import { TextInput } from 'react-native-paper';

import Header from '../Components/Header';
import profiles from '../../Assets/json/profiles.json';
import { ImageImports } from '../../ImageImports';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backLogo: {
    transform: [{ rotate: '180deg' }],
    width: 12,
    height: 12
  },
  locationSection: {
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 5
  },
  locationProfileName: {
    flex: 1,
    alignItems: 'center'
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10
  },
  chatItemImg: {
    borderRadius: 100,
    height: 40,
    width: 40,
    marginRight: 15
  },
  chatItemText: {
    borderWidth: 0.5,
    borderColor: '#424242',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15
  },
  chatContainer: {
    flex: 1,
    height: '100%'
  },
  chatInputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  chatInput: {
    height: 48,
    borderColor: 'black'
  }
});

export default function ChatDetail (props) {
  const profile = profiles[0];
  const logoCaret = require('../../Assets/caret-right.png');

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.locationSection}>
        <TouchableOpacity onPress={() => props.navigation.navigate('ChatList')}>
          <Image style={styles.backLogo} source={logoCaret} />
        </TouchableOpacity>
        <View style={styles.locationProfileName}>
          <Text>{profile.name}</Text>
          <Text>A 1 km de distancia</Text>
        </View>
      </View>
      <View style={styles.chatContainer}>
        {
          profile.latestMessages.reverse().map((messageItem, index) => {
            return (
              <View style={styles.chatItem} key={`chat-message-${index}`}>
                <Image resizeMode='cover' style={styles.chatItemImg} source={ImageImports[profile.gallery[0].key]} />
                <View style={styles.chatItemText}>
                  <Text>{messageItem.message}</Text>
                </View>
              </View>
            );
          })
        }
      </View>
      <View style={styles.chatInputContainer}>
        <TextInput style={styles.chatInput} />
      </View>
    </View>
  );
}
