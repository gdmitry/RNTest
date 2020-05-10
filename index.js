import { AppRegistry } from 'react-native';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.tron('Reactotron Configured'));
}

import App from './src/App';

AppRegistry.registerComponent('AE500pxProject', () => App);
