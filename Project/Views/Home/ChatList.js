import * as React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../Components/Header';
import { ImageImports } from '../../ImageImports';
import profiles from '../../Assets/json/profiles.json';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subView: {
    padding: 10,
    flex: 1
  },
  titleText: {
    fontWeight: 'bold',
    marginRight: 6
  },
  profileImg: {
    borderRadius: 100,
    height: 60,
    width: 60,
    marginRight: 16
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  notifSection: {
    flexDirection: 'row',
    marginBottom: 10
  },
  textName: {
    fontSize: 20
  },
  textUnread: {
    fontWeight: 'bold'
  },
  unreadNotif: {
    backgroundColor: 'red',
    color: 'white',
    width: 18,
    textAlign: 'center',
    borderRadius: 50,
    fontWeight: 'bold'
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  homeRedirectionIcon: {
    marginRight: 5,
    width: 10,
    transform: [{rotate: '180deg'}]
  }
});

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatGroups: [...profiles],
      unreadProfiles: 1
    };
  }

  redirectToChatDetail = () => {
    this.props.navigation.navigate('ChatDetail');
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const caretLogo = require('../../Assets/caret-right.png');

    return (
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.subView}>
          <View style={styles.notifSection}>
            <Text style={styles.titleText}>Mensajes</Text>
            { this.state.unreadProfiles > 0 && <Text style={styles.unreadNotif}>1</Text>}
          </View>
          <ScrollView style={styles.scrollSection}>
            {
              this.state.chatGroups.map((chatItem, index) => {
                return (
                  <View key={`chat-item-${index}`}>
                    <TouchableOpacity style={styles.chatItem} onPress={this.redirectToChatDetail}>
                      <Image source={ImageImports[chatItem.gallery[0].key]}
                             style={styles.profileImg}
                             resizeMode='cover' />
                      <View>
                        <Text style={[styles.textName, chatItem.latestMessages[0].unread && styles.textUnread]}>{chatItem.name}</Text>
                        <Text style={chatItem.latestMessages[0].unread && styles.textUnread}>{chatItem.latestMessages[0].message}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>);
              })
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>Atrás</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
