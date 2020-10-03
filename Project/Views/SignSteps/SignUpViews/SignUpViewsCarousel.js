import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import SignUpCarouselIndex from './SignUpCarouselIndex';
import { SIGN_UP_STEP } from '../../../Store/Actions/UserAuth';
import { UPDATE_MY_PROFILE } from '../../../Store/Actions/DetailProfile';
import { SPANISH_LANG } from '../../../Store/Reducers/LoadLanguage';
import store from '../../../Store/store';
import { ProfileSerializer } from '../../../Providers/SerializerProvider';
import { getDateTimeFromStr, formatDate } from '../../../Providers/TimeUtilsProvider';
import LanguageProvider from '../../../Providers/LanguageProvider';
import { requestEndpoint, requestDataEndpoint } from '../../../Providers/EndpointServiceProvider';

/** Views */
import SignUpProfile from './Steps/SignUpProfile';
import SignUpName from './Steps/SignUpName';
import SignUpBirthDate from './Steps/SignUpBirthDate';
import SignUpProfilePhoto from './Steps/SignUpProfilePhoto';
import SignUpIDPhoto from './Steps/SignUpIDPhoto';
import SignUpCareList from './Steps/SignUpCareList';
import SignUpCareHour from './Steps/SignUpCareHour';
import SignUpAdditionalInfo from './Steps/SignUpAdditionalInfo';
import SignUpUserPass from './Steps/SignUpUserPass';
import SignUpCareReferences from './Steps/SignUpCareReferences';
import SignUpDisclaimer from './Steps/SignUpDisclaimer';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5
  },
  subContainer: {
    flex: 1,
    margin: 5
  },
  signUpView: {
    flex: 1,
    justifyContent: 'center'
  },
  nextDisabledArea: {
    opacity: 0.5
  },
  footerSignUp: {
    backgroundColor: 'white',
    paddingTop: 5
  },
  buttonNext: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    marginRight: 10
  },
  actionSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nextCaretLogo: {
    width: 7,
    height: 10,
    marginLeft: 8
  },
  prevCaretLogo: {
    marginLeft: 0,
    marginRight: 8,
    transform: [{rotate: '180deg'}]
  },
  carouselCaretText: {
    fontSize: 16
  }
});
const DEFAULT_PROFILE_RATE = 5;

class SignUpCarousel extends React.Component {
  DEFAULT_LANG = null;

  componentDidMount() {
    this.DEFAULT_LANG = this.props.listLanguages.find(
      row => row.name === SPANISH_LANG);
  }

  setLoadStatus (status) {
    if(this.props.displayLoadState) {
      this.props.displayLoadState(status);
    }
  }

  checkIfLatestPage = () => {
    return (this.props.indexActive === 10 && !this.props.isPatient) || (this.props.indexActive === 9 && this.props.isPatient);
  }

  checkIfFirstPage = () => {
    return this.props.indexActive === 0;
  }

  updateCarouselIndex = status => {
    const increaseVal = status === 'increase' ? + 1 : - 1;
    if (!this.checkIfLatestPage() && !this.checkIfFirstPage() ||
        (this.checkIfFirstPage() && status === 'increase')) {
      store.dispatch({
        type: SIGN_UP_STEP,
        payload: {
          indexActive: this.props.indexActive + increaseVal,
          nextStep: increaseVal > 0 ? false : true
        }
      });
    } else if (this.checkIfFirstPage() && status === 'decrease') {
      this.props.navigation.navigate('HomeGuest');
    }
  };

  setCheckedStep = checkedStep => {
    store.dispatch({
      type: SIGN_UP_STEP,
      payload: {
        nextStep: checkedStep
      }
    });
  }

  signUpToHome = () => {
    if (this.checkIfLatestPage() && this.props.nextStep) {
      this.signUpProcess();
    }
  }

  signUpProcess = () => {
    const [ first_name, last_name ] = this.props.profile.name.split(' ');
    const userData = {
      ...this.props.profile.account,
      first_name, last_name
    };

    this.setLoadStatus(true);
    requestEndpoint('user', userData, 'POST')
      .then(r => {
        if (r.status === 201) {
          return r.json();
        }
        this.setLoadStatus(false);
        return;
      })
      .then(data => {
        if (data) {
          const docID = this.props.profile.pictsOnRegister.documentID;
          const profilePhoto = this.props.profile.pictsOnRegister.profilePhoto;
          const objBirthDate = getDateTimeFromStr(
            this.props.profile.birthDate, 'dd/MM/yyyy');

          let profileData = {
            role: this.props.profile.profileRole,
            rate: DEFAULT_PROFILE_RATE,
            profile_description: 'Default description',
            birth_date: `${formatDate(objBirthDate, 'api')}Z`,
            available_hour_from: this.props.profile.time.start,
            available_hour_to: this.props.profile.time.end,
            languages: [this.DEFAULT_LANG.id],
            services: [
              ...this.props.profile.services.map(service => {
                return this.props.careServicesAPI[service.name].id;
              })
            ],
            experience: 'Default experience',
            user: data.id,
            id_doc_photo: docID.data,
            profile_photo: profilePhoto.data,
            profile_status: {
              ...this.props.profile.profileStatus
            }
          };

          requestEndpoint('profile', profileData, 'POST')
            .then(_ => {
              const email = this.props.profile.account.email;
              const username = email.split('@').shift();

              // Refactor in rxjs for several calls
              requestDataEndpoint('profile',  undefined, 'GET', `user__email=${username}`)
                .then(ppData => {
                  store.dispatch({
                    type: UPDATE_MY_PROFILE,
                    payload: ProfileSerializer.fromAPIToView(ppData.pop())
                  });
                  this.setLoadStatus(false);
                  this.props.navigation.navigate('HomeSignedIn');
                });
            });
        }
      });
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const nextCaretLogo = require('../../../Assets/caret-right.png');

    return (
      <View style={styles.container}>
        <ScrollView style={styles.subContainer}>
          {
            this.props.indexActive === 0 &&
            <SignUpProfile onChangeCheckedStep={this.setCheckedStep}
                           style={styles.signUpView} />
          }
          {
            this.props.indexActive === 1 &&
            <SignUpName style={styles.signUpView}
                        onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.props.indexActive === 2 &&
            <SignUpBirthDate style={styles.signUpView}
                             onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.props.indexActive === 3 &&
            <SignUpProfilePhoto style={styles.signUpView}
                                navigation={this.props.navigation}
                                onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.props.indexActive === 4 &&
            <SignUpIDPhoto style={styles.signUpView}
                           navigation={this.props.navigation}
                           onChangeCheckedStep={this.setCheckedStep} />
          }
          {
            this.props.indexActive === 5 &&
            <SignUpCareList isPatient={this.props.isPatient}
                            onChangeCheckedStep={this.setCheckedStep}
                            style={styles.signUpView} />
          }
          {
            this.props.indexActive === 6 &&
            <SignUpCareHour isPatient={this.props.isPatient}
                            onChangeCheckedStep={this.setCheckedStep}
                            style={styles.signUpView} />
          }
          { 
            (this.props.indexActive === 7 && !this.props.isPatient) &&
            <SignUpCareReferences onChangeCheckedStep={this.setCheckedStep}
                                  style={styles.signUpView} />
          }
          {
            ((this.props.indexActive === 8 && !this.props.isPatient) ||
            (this.props.indexActive === 7 && this.props.isPatient)) &&
            <SignUpAdditionalInfo onChangeCheckedStep={this.setCheckedStep}
                                  style={styles.signUpView}/>
          }
          {
            ((this.props.indexActive === 9 && !this.props.isPatient) ||
             (this.props.indexActive === 8 && this.props.isPatient)) &&
             <SignUpUserPass onChangeCheckedStep={this.setCheckedStep}
                             style={styles.signUpView} />
          }
          {
            ((this.props.indexActive === 10 && !this.props.isPatient) ||
             (this.props.indexActive === 9 && this.props.isPatient)) &&
             <SignUpDisclaimer checkFinalStep={this.signUpToHome}
                               onChangeCheckedStep={this.setCheckedStep}
                               style={styles.signUpView} />
          }
        </ScrollView>
        <View style={styles.footerSignUp}>
          {
            this.props.indexActive > 0 &&
            ((this.props.indexActive < 10 && !this.props.isPatient) ||
              (this.props.indexActive < 9 && this.props.isPatient)) &&
            <SignUpCarouselIndex style={styles.carousel} isPatient={this.props.isPatient}
              indexActive={this.props.indexActive} />
          }
          <View style={styles.actionSection}>
            {
              ((this.props.indexActive < 10 && !this.props.isPatient) ||
              (this.props.indexActive < 9 && this.props.isPatient)) && 
              <TouchableOpacity style={styles.buttonNext}
                                onPress={() => this.updateCarouselIndex('decrease')}>
                <Image style={[styles.nextCaretLogo, styles.prevCaretLogo]}
                    source={nextCaretLogo} />
                <Text style={styles.carouselCaretText}>{langProvider.components.backButton.backLabel}</Text>
              </TouchableOpacity>
            }
            {
              ((this.props.indexActive < 10 && !this.props.isPatient) ||
              (this.props.indexActive < 9 && this.props.isPatient)) && 
              <View>
                <TouchableOpacity disabled={!this.props.nextStep}
                                  style={[styles.buttonNext, !this.props.nextStep ? styles.nextDisabledArea : null]}
                                  onPress={() => this.updateCarouselIndex('increase')}>
                  <Text style={styles.carouselCaretText}>{langProvider.views.signUp.nextLabel}</Text>
                  <Image style={styles.nextCaretLogo}
                        source={nextCaretLogo} />
                </TouchableOpacity>
              </View>
            }
          </View>
          </View>
      </View>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.language,
    profile: state.profile,
    isPatient: state.profile.profileRole === 'PATIENT',
    nextStep: state.registerStatus.nextStep,
    indexActive: state.registerStatus.indexActive,
    careServicesAPI: state.registerStatus.careListServicesAPIMap,
    listLanguages: state.availableLangs
  };
}
export default connect(mapStateToProps, null)(SignUpCarousel);
