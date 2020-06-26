import * as React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';
import { ImageImports } from '../../ImageImports';
import profiles from '../../Assets/json/profiles.json';


const styles = StyleSheet.create({
  container: {
    position:  'relative'
  },
  gallery: {
    flex: 1,
    height: '50%'
  },
  imageGallery: {
    flex: 1,
    width: '100%'
  },
  scrollView: {
    flex: 1,
    padding: 18,
    width: '100%'
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 24
  },
  profileAge: {
    fontSize: 18
  },
  imageStar: {
    height: 20,
    width: 20
  },
  initSection: {
    marginBottom: 20
  },
  starQContainer: {
    flexDirection: 'row',
    marginVertical: 5
  },
  profileSectionInfo: {
    marginTop: 10,
    marginBottom: 10
  },
  descriptionSection: {
    marginBottom: 30
  },
  profileSectionTitle: {
    fontWeight: 'bold'
  },
  actionsStyles: {
    position: 'absolute',
    bottom: '2.5%',
    left: 0,
    zIndex: 1,
    width: '100%'
  }
});

export default class SearchProfile extends React.Component {
  state = {
    profiles: [...profiles],
    currentProfileIndex: 0,
    galleryEnabledIndex: 0
  };


  saveProfile = () => {

  }

  sendRequest = () => {

  }

  swipeProfile = (gestureName, _) => {
    let indexUpdate = 0;
    if (gestureName === 'SWIPE_RIGHT' && this.state.currentProfileIndex > 0) {
      indexUpdate = -1;
    } else if (gestureName === 'SWIPE_LEFT' && this.state.currentProfileIndex < this.state.profiles.length -1) {
      indexUpdate = +1;
    }

    this.setState({
      currentProfileIndex: this.state.currentProfileIndex + indexUpdate
    });
  }

  render() {
    const profile = this.state.profiles[this.state.currentProfileIndex];
    return (
      <GestureRecognizer style={[Layout.container, styles.container]}
                         onSwipe={(gestureName, gestureState) => this.swipeProfile(gestureName, gestureState)}>
        <View style={styles.gallery}>
          {
            profile.gallery.map((image, index) => {
              if (this.state.galleryEnabledIndex === index) {
                return <Image style={styles.imageGallery}
                              source={ImageImports[image.key]}
                              resizeMode='cover'
                              key={`profile-img-${index}`} />;
              }
              return null;
            })
          }
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.initSection}>
          <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileAge}>{profile.age} años</Text>
            <View style={styles.starQContainer}>
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
            <Text>{profile.description}</Text>
          </View>
          <View style={styles.descriptionSection}>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Servicios</Text>
              {
                profile.services.map((service, index) => {
                  return <Text key={`profile-service-${index}`}>{service}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Experiencia</Text>
              {
                profile.experience.map((experience, index) => {
                  return <Text key={`profile-experience-${index}`}>{experience}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Idiomas</Text>
              {
                profile.languages.map((lang, index) => {
                  return <Text key={`profile-lang-${index}`}>{lang}</Text>;
                })
              }
            </View>
            <View><Text style={styles.profileSectionTitle}>Horario:</Text><Text>{profile.timeAvailability}</Text></View>
          </View>
        </ScrollView>
        <View style={styles.swipes}>
          <TouchableOpacity style={styles.actionSwipe}>
            <Image />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionSwipe}>
            <Image />
          </TouchableOpacity>
        </View>
        <Actions actionsStyles={styles.actionsStyles} navigation={this.props.navigation}></Actions>
      </GestureRecognizer>
    );
  }  
}
