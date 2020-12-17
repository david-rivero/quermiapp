import Config from 'react-native-config';

export default function ConfigProvider() {
  return {
    serverUrl: Config.SERVER_URL,
    stripeAPIKey: Config.STRIPE_API_KEY
  }
}
