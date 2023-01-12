import React, { Fragment, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
import { navigationRef, navigate } from './services/RootNavigation';
import useThemeStyle from './components/utils/useThemeStyle';
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message';
import toastConfig from './components/utils/useToast';
import { fcmService } from './services/FCMService';
import { localNotificationService } from './services/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';
import useHelper from './components/hooks/useHelper';
import Config from './components/utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const App = () => {
  
  const [theme ] = useThemeStyle();
  const { onNotification, onOpenNotification } = useHelper();
  const getUrl = async () => {
      const url = await AsyncStorage.getItem('clientUrl');
      if(url) {
          Config.clientUrl = url;
      }
  }

  useEffect(() => {
    /* if (Platform.OS === 'ios') {
      fcmService.registerAppWithFCM();
    } */
    getUrl();
    fcmService.register(onRegister,onOpenNotification)
    localNotificationService.createChannel()
    localNotificationService.configure(onOpenNotification);
    localNotificationService.cancelAllLocalNotifications()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
          onNotification(remoteMessage.data);
      }
    });
    SplashScreen.hide();
    return () => {
      unsubscribe();
    };
  },[])  
  const onRegister = () => { }
  return (
      <PaperProvider theme={theme}>
        <Fragment>
          <Nav color={theme.colors.primary} refer={navigationRef}/>
          <Spinner/>
          <Toast config={toastConfig} visibilityTime={3000} position="bottom"/>
        </Fragment>
      </PaperProvider>
  );
};

export default App;