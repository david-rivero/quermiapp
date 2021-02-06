import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LanguageProvider from '../../../Providers/LanguageProvider';

import { AuthViewCheckProvider } from '../../Components/AuthViewCheck/AuthViewCheck';
import Header from '../../Components/Header/Header';
import styles from './ChatListStyles';

class ChatList extends React.Component {
  redirectToChatDetail = chatProfile => {
    this.props.navigation.navigate('ChatDetail', {'chatProfile': chatProfile});
  }

  redirectToHome = () => {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const caretLogo = require('../../../Assets/images/caret-right.png');

    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <View style={styles.subView}>
          <View style={styles.notifSection}>
            <Text style={styles.titleText}>{langProvider.views.chatList.chatLabel}</Text>
          </View>
          <ScrollView style={styles.scrollSection}>
            {
              this.props.profiles.map((profile, index) => {
                if (profile.contractWithCurrentProfile &&
                  ['CADD', 'CACT'].find(i => i === profile.contractWithCurrentProfile.type)) {
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
export default connect(mapStateToProps, null)(AuthViewCheckProvider(ChatList));
