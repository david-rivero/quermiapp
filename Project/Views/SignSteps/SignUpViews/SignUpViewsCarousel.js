import React from 'react';
import { connect } from 'react-redux';
import { of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import SignUpCarouselIndex from './SignUpCarouselIndex';
import { UPDATE_MY_PROFILE } from '../../../Store/Actions/DetailProfile';
import { SPANISH_LANG } from '../../../Store/Reducers/LoadLanguage';
import store from '../../../Store/store';
import { ProfileSerializer } from '../../../Providers/SerializerProvider';
import LanguageProvider from '../../../Providers/LanguageProvider';
import { requestEndpoint, requestDataEndpoint } from '../../../Providers/EndpointServiceProvider';

/** Views */
import SignUpProfile from './Steps/SignUpProfile';
import SignUpName from './Steps/SignUpName';
import SignUpBirthDate from './Steps/SignUpBirthDate';
import SignUpProfilePhoto from './Steps/SignUpProfilePhoto';
import SignUpCareList from './Steps/SignUpCareList';
import SignUpCareHour from './Steps/SignUpCareHour';
import SignUpAdditionalInfo from './Steps/SignUpAdditionalInfo';
import SignUpUserPass from './Steps/SignUpUserPass';
import SignUpDisclaimer from './Steps/SignUpDisclaimer';
import { setToken } from '../../../Providers/AuthUtilProvider';

import { signupViewsCarouselStyles as styles } from './SignUpViewsStyles';

const nextCaretLogo = require('../../../Assets/caret-right.png');

function SignUpStepTemplate (SignUpStepWrapper, basedProps={}) {
  const props = {...this.props, ...basedProps};
  return <SignUpStepWrapper {...props}
                            onChangeCheckedStep={basedProps.setCheckedStep}
                            style={styles.signUpView}/>;
}

class SignUpCarousel extends React.Component {
  state = {
    isPatient: false,
    indexActive: 0,
    nextStep: false,
    defaultLang: null
  };

  componentDidMount() {
    this.setState({
      defaultLang: this.props.listLanguages.find(
        row => row.name === SPANISH_LANG)
    });
  }

  goToCamera = fromView => {
    this.props.navigation.navigate('Camera', { from: fromView });
  }

  setLoadStatus = status => {
    if(this.props.displayLoadState) {
      this.props.displayLoadState(status);
    }
  }

  updatePatientStatus = role => {
    this.setState({
      isPatient: role === 'PATIENT'
    });
  }

  checkIfLatestPage = () => {
    return this.state.indexActive === 8;
  }

  checkIfFirstPage = () => {
    return this.state.indexActive === 0;
  }

  updateCarouselIndex = status => {
    const increaseVal = status === 'increase' ? + 1 : - 1;
    if (!this.checkIfLatestPage() && !this.checkIfFirstPage() ||
        (this.checkIfFirstPage() && status === 'increase')) {
      this.setState({
        indexActive: this.state.indexActive + increaseVal,
        nextStep: increaseVal > 0 ? false : true
      });
    } else if (this.checkIfFirstPage() && status === 'decrease') {
      this.setState({
        nextStep: false,
        indexActive: 0,
        isPatient: false
      });
      this.props.navigation.navigate('HomeGuest');
    }
  };

  setCheckedStep = checkedStep => {
    this.setState({ nextStep: checkedStep });
  }

  signUpToHome = () => {
    if (this.checkIfLatestPage() && this.state.nextStep) {
      this.signUpProcess();
    }
  }

  signUpProcess = () => {
    const [ first_name, last_name ] = this.props.profile.name.split(' ');
    const userData = {
      ...this.props.profile.account, first_name, last_name
    };

    this.setLoadStatus(true);
    requestDataEndpoint('user', userData, 'POST').pipe(
      switchMap(uData => {
        if (!uData.error) {
          let profileData = ProfileSerializer.fromViewToAPI(
            this.props.profile, this.props.careServicesAPI, uData, this.state.defaultLang);
          return requestEndpoint('profile', profileData, 'POST');
        }
        return throwError({...uData});
      }),
      switchMap(resp => {
        if (!resp.error) {
          return requestDataEndpoint('login', { ...this.props.profile.account }, 'POST');
        }
        return throwError({...uData});
      }),
      switchMap(tokenData => {
        if (!tokenData.error) {
          setToken(tokenData.access, tokenData.refresh);
          return of({});
        }
        return throwError({...uData});
      }),
      switchMap(rowData => {
        if (!rowData.error) {
          const email = this.props.profile.account.email;
          const username = email.split('@').shift();
          return requestDataEndpoint('profile',  undefined, 'GET', `user__username=${username}`);
        }
        return throwError({...uData});
      }),
      catchError(e => {
        this.setLoadStatus(false);
        return of({...e});
      })
    ).subscribe(ppData => {
      if (!ppData.error) {
        store.dispatch({
          type: UPDATE_MY_PROFILE,
          payload: ProfileSerializer.fromAPIToView(ppData.pop())
        });
        this.setLoadStatus(false);
        this.setState({ nextStep: false, indexActive: 0, isPatient: false });
        this.props.navigation.navigate('HomeSignedIn');
      }
    });
  }

  render() {
    const langProvider = LanguageProvider(this.props.language);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.subContainer}>
          {
            (() => {
              const baseProps = { setCheckedStep: this.setCheckedStep };
              switch (this.state.indexActive) {
                case 0:
                  const profprops = {
                    ...baseProps,
                    updateParentRoleState: this.updatePatientStatus
                  };
                  return SignUpStepTemplate(SignUpProfile, profprops);
                case 1:
                  return SignUpStepTemplate(SignUpName, baseProps);
                case 2:
                  return SignUpStepTemplate(SignUpBirthDate, baseProps);
                case 3:
                  const phprops = {
                    ...baseProps, goToCamera: this.goToCamera,
                    nextStep: this.state.nextStep
                  };
                  return SignUpStepTemplate(SignUpProfilePhoto, phprops);
                case 4:
                  const clprops = {...baseProps, isPatient: this.state.isPatient};
                  return SignUpStepTemplate(SignUpCareList, clprops);
                case 5:
                  const chprops = {...baseProps, isPatient: this.state.isPatient};
                  return SignUpStepTemplate(SignUpCareHour, chprops);
                case 6:
                  return SignUpStepTemplate(SignUpAdditionalInfo, baseProps);
                case 7:
                  return SignUpStepTemplate(SignUpUserPass, baseProps);
                case 8:
                  const sd_props = {...baseProps, checkFinalStep: this.signUpToHome };
                  return SignUpStepTemplate(SignUpDisclaimer, sd_props);
              }
            })()
          }
        </ScrollView>
        <View style={styles.footerSignUp}>
          {
            this.state.indexActive > 0 &&
            this.state.indexActive < 8 &&
            <SignUpCarouselIndex style={styles.carousel} isPatient={this.state.isPatient}
              indexActive={this.state.indexActive} />
          }
          <View style={styles.actionSection}>
            {
              this.state.indexActive < 8 && 
              <TouchableOpacity style={styles.buttonNext}
                                onPress={() => this.updateCarouselIndex('decrease')}>
                <Image style={[styles.nextCaretLogo, styles.prevCaretLogo]}
                    source={nextCaretLogo} />
                <Text style={styles.carouselCaretText}>{langProvider.components.backButton.backLabel}</Text>
              </TouchableOpacity>
            }
            {
              this.state.indexActive < 8 && 
              <View>
                <TouchableOpacity disabled={!this.state.nextStep}
                                  style={[styles.buttonNext, !this.state.nextStep ? styles.nextDisabledArea : null]}
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
    careServicesAPI: state.categories.careListServices.careListServicesAPIMap,
    listLanguages: state.availableLangs
  };
}
export default connect(mapStateToProps, null)(SignUpCarousel);
