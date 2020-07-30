import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import SignUpCarouselIndex from './SignUpCarouselIndex';
import { SIGN_UP_STEP, LOAD_SERVICES_API } from '../../../Store/Actions/UserAuth';
import { SPANISH_LANG } from '../../../Store/Reducers/LoadLanguage';
import store from '../../../Store/store';
import LanguageProvider from '../../../Providers/LanguageProvider';
import ServiceEndpointProvider from '../../../Providers/EndpointServiceProvider';


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
  nextDisabledArea: {
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

class SignUpCarousel extends React.Component {
  DEFAULT_LANG = null;

  constructor(props) {
    super(props);
    ServiceEndpointProvider.registerEndpoint('user', 'POST');
    ServiceEndpointProvider.registerEndpoint('profile', 'POST');
    ServiceEndpointProvider.registerEndpoint('nameLang', 'GET');
    ServiceEndpointProvider.registerEndpoint('nameServices', 'GET');
  }

  componentDidMount() {
    ServiceEndpointProvider.endpoints.nameLang()
      .then(r => r.json())
      .then(data => {
        this.DEFAULT_LANG = data.find(row => row.name === SPANISH_LANG);
      });
    ServiceEndpointProvider.endpoints.nameServices()
      .then(r => r.json())
      .then(data => {
        store.dispatch({
          type: LOAD_SERVICES_API,
          payload: data
        });
      });
  }

  checkIfLatestPage = () => {
    return (this.props.indexActive === 9 && !this.props.isPatient) || (this.props.indexActive === 8 && this.props.isPatient);
  }

  updateCarouselIndex = () => {
    if (!this.checkIfLatestPage()) {
      store.dispatch({
        type: SIGN_UP_STEP,
        payload: {
          indexActive: this.props.indexActive + 1,
          nextStep: false
        }
      });
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
    ServiceEndpointProvider.endpoints.user({...this.props.profile.account})
      .then(r => {
        if (r.status === 201) {
          return r.json();
        }
        return;
      })
      .then(data => {
        if (data) {
          const birth = this.props.profile.birthDate;
          const day = birth.getDate();
          const month = `${birth.getMonth() < 9 && '0'}${birth.getMonth() + 1}`;
          const year = birth.getFullYear();
          const hourFrom = this.props.profile.time.start;
          const hourTo = this.props.profile.time.end;

          const profileData = {
            "role": this.props.profile.profileRole,
            "rate": 5,
            "profile_description": "Default description",
            "birth_date": `${year}-${month}-${day}T00:00:00Z`,
            "available_hour_from": `${hourFrom.getHours()}:${hourFrom.getMinutes()}`,
            "available_hour_to": `${hourTo.getHours()}:${hourTo.getMinutes()}`,
            "languages": [this.DEFAULT_LANG.id],
            "services": [
              ...this.props.profile.services.map(service => {
                return this.props.careServicesAPI[service.name].id;
              })
            ],
            "experience": "Default experience",
            "user": data.id
          };
          ServiceEndpointProvider.endpoints.profile(profileData)
            .then(_ => this.props.navigation.navigate('HomeSignedIn'));
        }
      });
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    const nextCaretLogo = require('../../../Assets/caret-right.png');

    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.subContainer]}>
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
             <SignUpUserPass onChangeCheckedStep={this.setCheckedStep}
                             style={styles.signUpView} />
          }
          {
            ((this.props.indexActive === 9 && !this.props.isPatient) ||
             (this.props.indexActive === 8 && this.props.isPatient)) &&
             <SignUpDisclaimer checkFinalStep={this.signUpToHome}
                               onChangeCheckedStep={this.setCheckedStep}
                               style={styles.signUpView} />
          }
        </View>
        {
          this.props.indexActive > 0 &&
          ((this.props.indexActive < 9 && !this.props.isPatient) ||
             (this.props.indexActive < 8 && this.props.isPatient)) &&
          <SignUpCarouselIndex style={styles.carousel} isPatient={this.props.isPatient}
            indexActive={this.props.indexActive} />
        }
        {
          ((this.props.indexActive < 9 && !this.props.isPatient) ||
          (this.props.indexActive < 8 && this.props.isPatient)) && 
          <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={!this.props.nextStep}
                              style={[styles.buttonNext, !this.props.nextStep ? styles.nextDisabledArea : null]}
                              onPress={() => this.updateCarouselIndex()}>
              <Text>{langProvider.views.signUp.nextLabel}</Text>
              <Image style={styles.nextCaretLogo}
                     source={nextCaretLogo} />
            </TouchableOpacity>
          </View>
        }
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
    careServicesAPI: state.registerStatus.careListServicesAPIMap
  };
}
export default connect(mapStateToProps, null)(SignUpCarousel);
