import * as React from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { 
  SWIPE_NEXT_PROFILE,
  SWIPE_PREV_PROFILE
} from '../../Store/Actions/ProfilesToSearch';

import Actions from '../Components/Actions';
import { Layout } from '../../Theme/Layout';
import { ImageImports } from '../../ImageImports';
import store from '../../Store/store';


const styles = StyleSheet.create({
  container: {
    position:  'relative',
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  cardProfile: {
    height: '75%',
    width: '75%',
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    borderRadius: 6
  },
  touchSection: {
    flex: 1
  },
  gallery: {
    flex: 1,
    height: '50%'
  },
  imageGallery: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  imageStar: {
    height: 20,
    width: 20
  },
  initSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
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
    width: '100%'
  }
});

class SearchProfile extends React.Component {
  saveProfile = () => {

  }

  sendRequest = () => {

  }

  swipeProfile = (gestureName, _) => {
    if (gestureName === 'SWIPE_RIGHT') {
      store.dispatch({
        type: SWIPE_PREV_PROFILE,
        payload: {
          isNotFirst: this.props.currentProfileIndex > 0
        }
      });
    } else if (gestureName === 'SWIPE_LEFT') {
      store.dispatch({
        type: SWIPE_NEXT_PROFILE,
        payload: {
          isNotLatest: this.props.currentProfileIndex < this.props.profiles.length -1
        }
      });
    }
  }

  loadDetailProfile = profile => {
    this.props.navigation.navigate('DetailProfileOnSearch', { profile: profile });
  };

  render() {
    const profile = this.props.profiles[this.props.currentProfileIndex];
    return (
      <View style={[Layout.container, styles.container]}>
        <GestureRecognizer style={styles.cardProfile}
                           onSwipe={(gestureName, gestureState) => this.swipeProfile(gestureName, gestureState)}>
          <TouchableOpacity style={styles.touchSection} onPress={() => this.loadDetailProfile(profile)}>
            <View style={styles.gallery}>
              <Image style={styles.imageGallery}
                     source={ImageImports[profile.user]}
                     resizeMode='cover' />
            </View>
              <View style={styles.initSection}>
                <Text style={styles.profileName}>{profile.name.split(' ').shift()}</Text>
                <View style={styles.starQContainer}>
                  {
                    Array.from(Array(5), (_, index) => {
                      let imageStar;
                      if (index + 1 <= profile.rate) {
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
          </TouchableOpacity>
        </GestureRecognizer>
        <Actions actionsStyles={styles.actionsStyles} navigation={this.props.navigation}></Actions>
      </View>
    );
  }  
}

function mapStateToProps(state) {
  return {
    currentProfileIndex: state.profileSearchStatus.currentProfileIndex,
    galleryEnabledIndex: state.profileSearchStatus.galleryEnabledIndex,
    profiles: state.profilesLoaded
  };
}

export default connect(mapStateToProps, null)(SearchProfile);
