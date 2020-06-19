import * as React from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import Header from '../Components/Header';
import { Layout } from '../../Theme/Layout';

const styles = StyleSheet.create({
  contentSection: {
    marginTop: 30,
    paddingHorizontal: 10
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  headerRateProfile: {
    flexDirection: 'row',
    marginBottom: 20
  },
  image: {
    height: 75,
    width: 75
  },
  reportActionsContainer: {
    flexDirection: 'row'
  },
  reportActions: {
    marginRight: 5
  },
  reportActionsText: {
    textDecorationLine: 'underline'
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  imageStar: {
    height: 20,
    width: 20
  },
  starContainerToSelect: {
    justifyContent: 'center',
    marginVertical: 10
  },
  imageStarToSelect: {
    height: 40,
    width: 40,
    marginHorizontal: 5
  },
  textAreaComment: {
    backgroundColor: 'transparent',
    marginVertical: 10
  }
});

export default function RateProfile() {
  const profile = {
    imgProfile: require('../../Assets/felicia-varzari-8ZLLpY9r1cM-unsplash.jpg'),
    name: 'Fernando',
    rateQ: 4
  };

  return (
    <View style={Layout.container}>
      <Header></Header>
      <View style={styles.contentSection}>
        <View style={styles.headerRateProfile}>
          <Image source={profile.imgProfile} resizeMode='contain' style={styles.image} />
          <View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <View style={styles.reportActionsContainer}>
              <TouchableOpacity style={styles.reportActions}>
                <Text style={styles.reportActionsText}>Reportar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reportActions}>
                <Text style={styles.reportActionsText}>Bloquear</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.starContainer}>
              {
                Array.from(Array(5), (_, index) => {
                  let imageStar;
                  if (index + 1 <= profile.rateQ) {
                    imageStar = require('../../Assets/images/star-selected.png')
                  } else {
                    imageStar = require('../../Assets/images/star.png')
                  }
                  return <Image source={imageStar}
                                style={styles.imageStar}
                                resizeMode='contain'
                                key={`star-profile-${index}`} />;
                })
              }
            </View>
          </View>
        </View>
        <View>
          <Text>¿Qué calificación le das?</Text>
          <View style={[styles.starContainer, styles.starContainerToSelect]}>
            {
              Array.from(Array(5), (_, index) => {
                return <Image source={require('../../Assets/images/star.png')}
                              style={styles.imageStarToSelect}
                              resizeMode='contain'
                              key={`star-q-profile-${index}`} />;
              })
            }
          </View>
          <Text>Escríbenos acerca de tu experiencia con {profile.name}</Text>
          <TextInput style={styles.textAreaComment} placeholder="Cuenta tu experiencia" />
          <Button title="Calificar" />
        </View>
      </View>
    </View>
  );
}
