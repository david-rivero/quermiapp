import * as React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ServiceEndpointProvider from '../../Providers/EndpointServiceProvider';
import LanguageProvider from '../../Providers/LanguageProvider';

import Header from '../Components/Header';

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

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    ServiceEndpointProvider.registerEndpoint('chatRoom', 'GET');
  }

  redirectToChatDetail = chatProfile => {
    this.props.navigation.navigate('ChatDetail', {'chatProfile': chatProfile});
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const caretLogo = require('../../Assets/caret-right.png');

    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <View style={styles.subView}>
          <View style={styles.notifSection}>
            <Text style={styles.titleText}>{langProvider.views.chatList.chatLabel}</Text>
            {/* { this.state.unreadProfiles > 0 && <Text style={styles.unreadNotif}>1</Text>} */}
          </View>
          <ScrollView style={styles.scrollSection}>
            {
              this.props.profiles.map((profile, index) => {
                if (profile.contractWithCurrentProfile) {
                  const fromProfile = this.props.myProfile;
                  const toProfile = profile;
                  const chatProfile = {
                    fromProfile: fromProfile,
                    toProfile: toProfile
                  };

                  return (
                    <View key={`chat-item-${index}`}>
                      <TouchableOpacity style={styles.chatItem} onPress={() => this.redirectToChatDetail(chatProfile)}>
                        <Image source={{uri: profile.pictsOnRegister.profilePhoto}}
                               style={styles.profileImg}
                               resizeMode='cover' />
                        <View>
                          {/* chatItem.latestMessages[0].unread && styles.textUnread */}
                          <Text style={[styles.textName]}>{profile.name}</Text>
                          <Text>Mensaje</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
              })
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.homeRedirectAction} onPress={() => this.redirectToHome()}>
          <Image style={styles.homeRedirectionIcon} source={caretLogo} resizeMode='contain' />
          <Text>{langProvider.components.backButton.backLabel}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    myProfile: state.profile,
    profiles: state.profilesLoaded
  };
}
export default connect(mapStateToProps, null)(ChatList);
