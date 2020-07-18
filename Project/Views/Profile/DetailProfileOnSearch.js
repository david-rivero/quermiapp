import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import store from '../../Store/store';
import LanguageProvider from '../Providers/LanguageProvider';

import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';
import { ImageImports } from '../../ImageImports';


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

class DetailProfileOnSearch extends React.Component {
  constructor(props) {
    super(props);
    // Remove component state
    this.state = {
      profile: this.props.route.params.profile,
      galleryEnabledIndex: 0
    };
  }

  render() {
    const langProvider = LanguageProvider(store.getState().language);
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
            <Text style={styles.profileAge}>{this.state.profile.age} {langProvider.views.detailProfileOnSearch.yearLabel}</Text>
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
            <Text style={styles.profileSectionTitle}>{langProvider.views.detailProfileOnSearch.servicesLabel}</Text>
              {
                this.state.profile.services.map((service, index) => {
                  return <Text key={`profile-service-${index}`}>{langProvider.components.services[service]}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>{langProvider.views.detailProfileOnSearch.experienceLabel}</Text>
              {
                this.state.profile.experience.map((experience, index) => {
                  return <Text key={`profile-experience-${index}`}>{experience}</Text>;
                })
              }
            </View>
            <View style={styles.profileSectionInfo}>
              <Text style={styles.profileSectionTitle}>{langProvider.views.detailProfileOnSearch.langLabel}</Text>
              {
                this.state.profile.languages.map((lang, index) => {
                  return <Text key={`profile-lang-${index}`}>{langProvider.components.lang[lang]}</Text>;
                })
              }
            </View>
            <View><Text style={styles.profileSectionTitle}>{langProvider.views.detailProfileOnSearch.timeAvailabilityLabel}:</Text><Text>{this.state.profile.timeAvailability}</Text></View>
          </View>
        </ScrollView>
        <Actions actionsStyles={styles.actionsStyles} navigation={this.props.navigation} isDetail={true}></Actions>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language
  };
}
export default connect(mapStateToProps, null)(DetailProfileOnSearch);
