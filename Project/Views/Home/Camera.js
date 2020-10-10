import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { SIGN_UP_STEP_SET_PROFILE_INFO } from '../../Store/Actions/UserAuth';
import store from '../../Store/store';
import CameraComponent from '../Components/Camera';


class Camera extends React.Component {
  setPhoto = photo => {
    const pageFrom = this.props.route.params.from;
    store.dispatch({
      type: SIGN_UP_STEP_SET_PROFILE_INFO,
      payload: {
        profileField: 'pictsOnRegister',
        profileData: {
          documentID: pageFrom === 'idPhoto' ? photo : this.props.documentID,
          profilePhoto: pageFrom === 'profilePhoto' ? photo : this.props.profilePhoto
        }
      }
    });
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <CameraComponent onSetPicture={this.setPhoto}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    documentID: state.profile.pictsOnRegister.documentID,
    profilePhoto: state.profile.pictsOnRegister.profilePhoto
  };
}
export default connect(mapStateToProps, null)(Camera);
