import React, { Fragment, useEffect } from 'react';
import { Button, Modal, Provider as PaperProvider, Portal, Text, Headline } from 'react-native-paper';
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
import { Linking, Platform, StyleSheet, View } from 'react-native';
import checkVersion from 'react-native-store-version';
import deviceInfo from 'react-native-device-info';

const App = () => {
  
  const [theme ] = useThemeStyle();
  const { onNotification, onOpenNotification } = useHelper();
  const getUrl = async () => {
      const url = await AsyncStorage.getItem('clientUrl');
      if(url) {
          Config.clientUrl = url;
      }
  }

  const [visible, setVisible] = React.useState(false);

  const initPopup = async () => {
    try {
      const check = await checkVersion({
        version: deviceInfo.getVersion(), // app local version
        iosStoreURL: 'https://apps.apple.com/us/app/timetrack-mobile/id1670003083',
        androidStoreURL: 'https://play.google.com/store/apps/details?id=com.ttmobile.timetrack_hv1',
        // country: 'jp', // default value is 'jp'
      });
      // console.log(check);
      if (check.result === 'new') {
        // if app store version is new
        setVisible(true);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const redirect = () => {
    if(Platform.OS === 'android') {
      Linking.openURL('https://play.google.com/store/apps/details?id=com.ttmobile.timetrack_hv1')
    }
    else {
      Linking.openURL('https://apps.apple.com/us/app/timetrack-mobile/id1670003083')
    }
  }

  useEffect(() => {
    initPopup();
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
          <Portal>
              <Modal visible={visible} dismissable={true} contentContainerStyle={styles.modal}>
                  <View style={{paddingHorizontal:20,marginVertical:10}}>
                      <Headline style={{textAlign:'center'}}>Update Available</Headline>
                      <View style={{marginVertical:10}}>
                          <Text style={{fontSize:18,textAlign:'center'}}>There is a newer version of this app available</Text>
                      </View>
                      <Button mode="contained" onPress={redirect} style={{width:'50%',alignSelf:'center'}}>Update Now</Button>
                  </View>
              </Modal>
          </Portal>
        </Fragment>
      </PaperProvider>
  );
};

const styles = StyleSheet.create({
  modal:{
      backgroundColor: 'white',
      padding:10,
      marginHorizontal:20,
      borderRadius:10,
  },
})

export default App;