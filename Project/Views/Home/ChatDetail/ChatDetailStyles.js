import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backLogo: {
    transform: [{ rotate: '180deg' }],
    width: 12,
    height: 12
  },
  locationSection: {
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 5
  },
  locationProfileName: {
    flex: 1,
    alignItems: 'center'
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10
  },
  chatItemMe: {
    flexDirection: 'row-reverse'
  },
  chatItemImg: {
    borderRadius: 100,
    height: 40,
    width: 40,
    marginRight: 15
  },
  chatItemText: {
    borderWidth: 0.5,
    borderColor: '#424242',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15
  },
  chatItemTextMe: {
    marginRight: 10
  },
  chatContainer: {
    flex: 1,
    height: '100%'
  },
  chatInputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  chatInput: {
    height: 48,
    borderBottomColor: '#A1A1A1',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  chatSendIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 30,
    height: 30,
    zIndex: 10
  },
  chatSendIcon: {
    width: '100%',
    height: '100%'
  }
});

export default styles;
