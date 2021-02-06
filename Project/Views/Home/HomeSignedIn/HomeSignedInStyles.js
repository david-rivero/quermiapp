import { StyleSheet } from 'react-native';
import { Colors } from '../../../Theme/Colors';

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  container: {
    width: '100%',
  },
  containerMenuOpen: {
    transform: [{translateX: -200}]
  },
  mainActionContent: {
    backgroundColor: Colors.blue,
    height: '30%',
    width: '100%',
    padding: 18
  },
  mainActionCareProvider: {
    backgroundColor: Colors.pink
  },
  mainActionText: {
    color: Colors.white
  },
  homeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32
  },
  homeTitleIcon: {
    marginRight: 12,
    width: 22
  },
  homeViewContent: {
    padding: 18
  },
  homeSubView: {
    marginBottom: 15
  },
  homeRedirectAction: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center'
  },
  homeRedirectionIcon: {
    marginLeft: 5,
    width: 10
  }
});

export default styles;
