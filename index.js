import 'react-native-gesture-handler';
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import factory from './components/redux/store';
import { fcmService } from './services/FCMService';
// import { localNotificationService } from './services/LocalNotificationService';

const { store, persistor } = factory();

fcmService.bgheadlessTask()

export const Main = () => {
            
    // if (isHeadless) {
    //     return null;
    // }
    return (
        <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </StoreProvider>
    )
  }

  
AppRegistry.registerComponent(appName, () => Main);
/* AppRegistry.registerHeadlessTask('RNFBHedlessTask', () =>
    require('./services/RNFBHedlessTask')
); */