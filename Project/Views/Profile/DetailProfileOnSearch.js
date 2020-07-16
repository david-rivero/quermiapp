import * as React from 'react';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';

import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';
import { ImageImports } from '../../ImageImports'


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

export default class DetailProfileOnSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.route.params.profile,
      galleryEnabledIndex: 0
    };
  }

  render() {
    return (
      <View style={[Layout.container, styles.container]}>
        <View style={styles.gallery}>
          {
            this.state.profile.gallery.map((image, index) => {
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
          <Text style={styles.profileName}>{this.state.profile.name}</Text>
            <Text style={styles.profileAge}>{this.state.profile.age} años</Text>
            <View style={styles.starQContainer}>
              {
                Array.from(Array(5), (_, index) => {
                  let imageStar;
                  if (index + 1 <= this.state.profile.rateQ) {
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
            <Text>{this.state.profile.description}</Text>
          </View>
          <View style={styles.descriptionSection}>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Servicios</Text>
              {
                this.state.profile.services.map((service, index) => {
                  return <Text key={`profile-service-${index}`}>{service}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Experiencia</Text>
              {
                this.state.profile.experience.map((experience, index) => {
                  return <Text key={`profile-experience-${index}`}>{experience}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>Idiomas</Text>
              {
                this.state.profile.languages.map((lang, index) => {
                  return <Text key={`profile-lang-${index}`}>{lang}</Text>;
                })
              }
            </View>
            <View><Text style={styles.profileSectionTitle}>Horario:</Text><Text>{this.state.profile.timeAvailability}</Text></View>
          </View>
        </ScrollView>
        <Actions actionsStyles={styles.actionsStyles} navigation={this.props.navigation} isDetail={true}></Actions>
      </View>
    );
  }
}
