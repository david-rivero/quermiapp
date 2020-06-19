import * as React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../Components/Header';
import Layout from '../../Theme/Layout';
import profiles from '../../Assets/json/profiles.json';

const styles = StyleSheet.create({
  subView: {
    padding: 10
  },
  titleText: {
    fontWeight: 'bold'
  },
  profileImg: {
    borderRadius: 500,
    height: 60,
    width: 75
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 10
  }
});

export default function ChatList() {
  const chatGroups = profiles;
  return (
    <View style={styles.container}>
      <Header></Header>
      <View style={styles.subView}>
        <Text style={styles.titleText}>Mensajes</Text>
        <ScrollView style={styles.scrollSection}>
          {
            chatGroups.map((chatItem, index) => {
              // chatItem.gallery[0].url
              return (
                <View key={`chat-item-${index}`}>
                  <TouchableOpacity style={styles.chatItem}>
                    <Image source={require('../../Assets/felicia-varzari-8ZLLpY9r1cM-unsplash.jpg')}
                           style={styles.profileImg}
                           resizeMode='contain' />
                    <View>
                      <Text>{chatItem.name}</Text>
                      <Text>{chatItem.latestMessage}</Text>
                    </View>
                  </TouchableOpacity>
                </View>);
            })
          }
        </ScrollView>
      </View>
    </View>
  );
}
