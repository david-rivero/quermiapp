import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import SignUpCarouselIndex from './SignUpCarouselIndex';

/** Views */
import SignUpProfile from './Steps/SignUpProfile';
import SignUpName from './Steps/SignUpName';
import SignUpBirthDate from './Steps/SignUpBirthDate';
import SignUpProfilePhoto from './Steps/SignUpProfilePhoto';
import SignUpIDPhoto from './Steps/SignUpIDPhoto';
import SignUpCareList from './Steps/SignUpCareList';
import SignUpCareHour from './Steps/SignUpCareHour';
import SignUpUserPass from './Steps/SignUpUserPass';
import SignUpCareReferences from './Steps/SignUpCareReferences';
import SignUpDisclaimer from './Steps/SignUpDisclaimer';


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
  nextDisabled: {
    color: '#848484'
  },
  nextDisabledLogo: {
    opacity: 0.5
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
    nextStep: false,
    indexActive: 0
  };

  updateCarouselIndex = () => {
    const isLatestPage = (this.state.indexActive === 9 && !this.state.isPatient) || (this.state.indexActive === 8 && this.state.isPatient);
    if (!isLatestPage) {
      this.setState({
        indexActive: this.state.indexActive + 1,
        nextStep: false
      });
    }
  };

  setProfileStatus = profileStatus => {
    this.setState({
      isPatient: profileStatus === 'PATIENT'
    });
  }

  setCheckedStep = checkedStep => {
    this.setState({
      nextStep: checkedStep
    });
  }

  render() {
    const nextCaretLogo = require('../../../Assets/caret-right.png');
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.subContainer]}>
          {
            this.state.indexActive === 0 &&
            <SignUpProfile onChangeProfileValue={this.setProfileStatus}
                           onChangeCheckedStep={this.setCheckedStep}
                           style={styles.signUpView} />
          }
          {
            this.state.indexActive === 1 &&
            <SignUpName style={styles.signUpView}
                        onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.state.indexActive === 2 &&
            <SignUpBirthDate style={styles.signUpView}
                             onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.state.indexActive === 3 &&
            <SignUpProfilePhoto style={styles.signUpView}
                                navigation={this.props.navigation}
                                onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.state.indexActive === 4 &&
            <SignUpIDPhoto style={styles.signUpView}
                           navigation={this.props.navigation}
                           onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.state.indexActive === 5 &&
            <SignUpCareList isPatient={this.state.isPatient}
                            onChangeCheckedStep={this.setCheckedStep}
                            style={styles.signUpView} />
          }
          {
            this.state.indexActive === 6 &&
            <SignUpCareHour isPatient={this.state.isPatient}
                            onChangeCheckedStep={this.setCheckedStep}
                            style={styles.signUpView} />
          }
          { 
            (this.state.indexActive === 7 && !this.state.isPatient) &&
            <SignUpCareReferences onChangeCheckedStep={this.setCheckedStep}
                                  style={styles.signUpView} />
          }
          {
            ((this.state.indexActive === 8 && !this.state.isPatient) ||
             (this.state.indexActive === 7 && this.state.isPatient)) &&
             <SignUpUserPass onChangeCheckedStep={this.setCheckedStep}
                             style={styles.signUpView} />
          }
          {
            ((this.state.indexActive === 9 && !this.state.isPatient) ||
             (this.state.indexActive === 8 && this.state.isPatient)) &&
             <SignUpDisclaimer onChangeCheckedStep={this.setCheckedStep}
                               navigation={this.props.navigation}
                               style={styles.signUpView} />
          }
        </View>
        {
          this.state.indexActive > 0 &&
          ((this.state.indexActive < 9 && !this.state.isPatient) ||
             (this.state.indexActive < 8 && this.state.isPatient)) &&
          <SignUpCarouselIndex style={styles.carousel} isPatient={this.state.isPatient}
            indexActive={this.state.indexActive} />
        }
        {
          ((this.state.indexActive < 9 && !this.state.isPatient) ||
          (this.state.indexActive < 8 && this.state.isPatient)) && 
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={!this.state.nextStep}
                              style={styles.buttonNext}
                              onPress={() => this.updateCarouselIndex()}>
              <Text style={!this.state.nextStep && styles.nextDisabled}>Siguiente</Text>
              <Image style={[styles.nextCaretLogo, !this.state.nextStep &&styles.nextDisabledLogo]}
                    source={nextCaretLogo} />
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}
