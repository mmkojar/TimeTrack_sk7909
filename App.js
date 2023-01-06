import React, { Fragment, useEffect } from 'react';
import { Alert,BackHandler } from 'react-native';
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

const App = () => {  
  const [theme ] = useThemeStyle();
  
  // function handleBackButtonClick() {
  //   Alert.alert(
  //       'Exit!',
  //       'Are you sure you want to exit the app?', [{
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel'
  //       }, {
  //           text: 'OK',
  //           onPress: () => BackHandler.exitApp()
  //       }, ], {
  //           cancelable: false
  //       }
  //    )
  //    return true;
  // }


  useEffect(() => {
    // if(navigationRef.current.canGoBack() === false) {
    //   BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    // }
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister,onNotification,onOpenNotification)
    const unsubscribe = messaging().onMessage(async remoteMessage => {            
            
      if (remoteMessage) {
          console.log("[FCMService] A new FCm message arrived", remoteMessage);
          // let notification = null;
          // if (Platform.OS === 'ios') {
          //     notification = remoteMessage.notification
          // } else {
          //     notification = remoteMessage.data
          // }
          onNotification(remoteMessage.data);
      }
    });
    localNotificationService.createChannel()
    localNotificationService.configure(onOpenNotification);
    localNotificationService.getAllChannels();
    SplashScreen.hide();
      return () => {
        // fcmService.createNotificationListeners(onRegister,onNotification,onOpenNotification)
        unsubscribe();
      };
  },[])

  const onRegister = (token) => {
    // console.log(token);
  }

  const onNotification = (notify) => {
    // localNotificationService.cancelAllLocalNotifications();
    const options = {
      soundName: 'default',
      playSound: true,
      priority:'high'
    }
    localNotificationService.showNotification(
      'TimeTrack',
      notify.message ? notify.message : notify.body,
      notify,
      options,
    )
  };

  const onOpenNotification =  () => {   
    navigate('Notifi');
  };

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