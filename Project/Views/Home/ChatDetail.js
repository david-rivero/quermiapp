import * as React from 'react';
import { getUnixTime } from 'date-fns';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';

import Header from '../Components/Header';
import ConfigProvider from '../../Providers/ConfigProvider';
import LanguageProvider from '../../Providers/LanguageProvider';
import { requestDataEndpoint } from '../../Providers/EndpointServiceProvider';

const serverURI = ConfigProvider().serverUrl;
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
  chatItemMe: {
    flexDirection: 'row-reverse'
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
  chatItemTextMe: {
    marginRight: 10
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
  },
  chatSendIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 30,
    height: 30,
    zIndex: 10
  },
  chatSendIcon: {
    width: '100%',
    height: '100%'
  }
});

class ChatDetail extends React.Component {
  constructor(props){
    super(props);
    const chatProfile = this.props.route.params.chatProfile;
    const rules = [
      {key: '$from_profile', value: chatProfile.fromProfile.username},
      {key: '$to_profile', value: chatProfile.toProfile.username}
    ];
    requestDataEndpoint('chatRoom', undefined, 'GET', '', rules)
      .subscribe(data => {
        const chatUrl = `${serverURI}/ws/chat/${data.chat_room_id}/${chatProfile.fromProfile.username}/${chatProfile.toProfile.username}/`.replace(/http[s]?/g, 'ws');
        this.socket = new WebSocket(chatUrl);
        this.socket.onmessage = e => this.getResponse(e);
        this.socket.onopen = () => {
          this.socket.send(JSON.stringify(
            {
              command: 'fetch_messages'
            }
          ));
        };
      });

    this.state = {
      messagesFromProfile: [],
      textMessage: ''
    };
  }

  _getCurrentProfileFromMessage = (chatProfile, messageItem) => {
    if (chatProfile.fromProfile.username === messageItem.from_profile) {
      return {
        ...chatProfile.fromProfile,
        isMyProfile: true
      };
    }
    return chatProfile.toProfile;
  }

  updateText = text => {
    this.setState({
      textMessage: text
    });
  }

  getResponse = rowData => {
    if (rowData && rowData.data) {
      this.setState({
        messagesFromProfile: [
          ...this.state.messagesFromProfile,
          JSON.parse(rowData.data)
        ]
      });
    }
  }

  sendMessage = () => {
    const chatProfile = this.props.route.params.chatProfile;
    const messageModel = {
      command: 'new_message',
      message: this.state.textMessage
    };

    this.setState({
      messagesFromProfile: [
        ...this.state.messagesFromProfile,
        {
          from_profile: chatProfile.fromProfile.username,
          to_profile: chatProfile.toProfile.username,
          message: this.state.textMessage,
          ts_message: getUnixTime(new Date())
        }
      ]
    });
    this.setState({
      textMessage: ''
    });
    this.socket.send(JSON.stringify(messageModel));
  }

  componentWillUnmount() {
    if (this.socket && this.socket.disconnect) {
      this.socket.disconnect();
    }
  }

  render() {
    const chatProfile = this.props.route.params.chatProfile;
    const langProvider = LanguageProvider(this.props.language);

    const logoCaret = require('../../Assets/caret-right.png');
    const sendButton = require('../../Assets/send-button.png');

    return (
      <View style={styles.container}>
        <Header isCarePerson={this.props.myProfile.profileRole === 'CARE_PROVIDER'} />
        <View style={styles.locationSection}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatList')}>
            <Image style={styles.backLogo} source={logoCaret} />
          </TouchableOpacity>
          <View style={styles.locationProfileName}>
            <Text>{chatProfile.toProfile.name}</Text>
            <Text>{langProvider.views.chatDetail.distanceReport}</Text>
          </View>
        </View>
        <ScrollView style={styles.chatContainer}
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
          {
            this.state.messagesFromProfile.map((messageItem, index) => {
              const currentProfile = this._getCurrentProfileFromMessage(chatProfile, messageItem);
              return (
                <View style={[styles.chatItem, currentProfile.isMyProfile ? styles.chatItemMe : null]} key={`chat-message-${index}`}>
                  <Image resizeMode='cover' style={styles.chatItemImg} source={{uri: currentProfile.pictsOnRegister.profilePhoto}} />
                  <View style={[styles.chatItemText, currentProfile.isMyProfile ? styles.chatItemTextMe : null]}>
                    <Text>{messageItem.message}</Text>
                  </View>
                </View>
              );
            })
          }
        </ScrollView>
        <View style={styles.chatInputContainer}>
          <TextInput value={this.state.textMessage} onChangeText={this.updateText} style={styles.chatInput} />
          <TouchableOpacity style={styles.chatSendIconContainer} onPress={() => this.sendMessage()}>
            <Image resizeMode='cover' source={sendButton} style={styles.chatSendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myProfile: state.profile,
    language: state.language
  };
}

export default connect(mapStateToProps, null)(ChatDetail);
