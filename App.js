import React, { Fragment, useEffect } from 'react';
import { Provider as PaperProvider, withTheme } from 'react-native-paper';
import { Alert,BackHandler } from 'react-native';
import Nav from './components/Nav';
import Spinner from './components/utils/Spinner';
import { navigationRef, navigate } from './services/RootNavigation';
//  import factory from './components/redux/store';
import useThemeStyle from './components/utils/useThemeStyle';
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-toast-message';
import toastConfig from './components/utils/useToast';
import { fcmService } from './services/FCMService';
import { localNotificationService } from './services/LocalNotificationService';
//  const { store } = factory();

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
    fcmService.getToken(onRegister)
    localNotificationService.createChannel()
    localNotificationService.configure(onOpenNotification);
    // console.log(localNotificationService.getAllChannels());
    SplashScreen.hide();
      // return () => {
      //     BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      // };
  },[])

  const onRegister = (token) => {
    
  }

  const onNotification = (notify) => {
    // console.log("notify:-",notify);
    const options = {
      soundName: 'default',
      playSound: true,
      priority:'high'
    }
    // if(navigationRef.current.getCurrentRoute().name !== 'ChatBox') {
      localNotificationService.showNotification(
        notify.title,
        notify.body,
        notify,
        options,
      )
    // }
  }; 

  const onOpenNotification = async (notify) => {
    // check for auth    
    // notify.userInteraction == true && console.log("notify2-",notify);
    navigate(notify.data.type)
  };

  return (
      <PaperProvider theme={theme}>
        <Fragment>
          <Nav color={theme.colors.primary} refer={navigationRef}/>
          <Spinner/>
          <Toast config={toastConfig} visibilityTime={2500} position="bottom"/>
        </Fragment>
      </PaperProvider>
  );
};

export default App;