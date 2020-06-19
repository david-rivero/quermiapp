import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import SignUpCarouselIndex from './SignUpCarouselIndex';

/** Views */
import SignUpProfile from './Common/SignUpProfile';
import SignUpName from './Common/SignUpName';
import SignUpBirthDate from './Common/SignUpBirthDate';
import SignUpProfilePhoto from './Common/SignUpProfilePhoto';
import SignUpCareList from './Common/SignUpCareList';
import SignUpCareHour from './Common/SignUpCareHour';
import SignUpUserPass from './Common/SignUpUserPass';
import SignUpCareReferences from './CarePerson/SignUpCareReferences';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  subContainer: {
    justifyContent: 'flex-start',
  },
  signUpView: {
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginLeft: 'auto',
    width: '50%'
  },
  buttonNext: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    marginRight: 10
  },
  nextCaretLogo: {
    width: 7,
    height: 10,
    marginLeft: 8
  }
});

export default class SignUpCarousel extends React.Component {
  state = {
    isPatient: false,
    indexActive: 0
  };

  updateCarouselIndex = () => {
    const isLatestPage = (this.state.indexActive === 7 && !this.state.isPatient) || (this.state.indexActive === 6 && this.state.isPatient);
    if (isLatestPage) {
      this.signToHome();
    } else {
      this.setState({
        indexActive: this.state.indexActive + 1
      });
    }
  };

  setProfileStatus = profileStatus => {
    this.setState({
      isPatient: profileStatus === 'PATIENT'
    });
  }

  signToHome() {
    this.props.navigation.navigate('HomeSignedIn');
  }

  render() {
    const nextCaretLogo = require('../../../Assets/caret-right.png') 
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.subContainer]}>
          {
            this.state.indexActive === 0 && <SignUpProfile onChangeProfileValue={this.setProfileStatus} style={styles.signUpView} />
          }
          {
            this.state.indexActive === 1 && <SignUpName style={styles.signUpView} />
          }
          {
            this.state.indexActive === 2 && <SignUpBirthDate style={styles.signUpView} />
          }
          {
            this.state.indexActive === 3 && <SignUpProfilePhoto style={styles.signUpView} />
          }
          {
            this.state.indexActive === 4 && <SignUpCareList isPatient={this.state.isPatient} style={styles.signUpView} />
          }
          {
            this.state.indexActive === 5 && <SignUpCareHour isPatient={this.state.isPatient} style={styles.signUpView} />
          }
          { 
            (this.state.indexActive === 6 && !this.state.isPatient) && <SignUpCareReferences style={styles.signUpView} />
          }
          {
            ((this.state.indexActive === 7 && !this.state.isPatient) || (this.state.indexActive === 6 && this.state.isPatient)) &&
            <SignUpUserPass style={styles.signUpView} />
          }
        </View>
        {
          this.state.indexActive > 0 &&
          <SignUpCarouselIndex style={styles.carousel} isPatient={this.state.isPatient}
            indexActive={this.state.indexActive} />
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonNext} onPress={() => this.updateCarouselIndex()}>
            <Text>Siguiente</Text>
            <Image source={nextCaretLogo} style={styles.nextCaretLogo}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
