import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    /*  registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    } */

    register (onRegister,onOpenNotification) {
        this.checkPermission(onRegister);
        this.handlingInteractions(onRegister, onOpenNotification);
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                console.log("[FCMService] Permission Rejected", error);
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission({provisional: true,sound: true})
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {
                console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log("[FCMService] User does not have a devices token")
                }
            }).catch(error => {
                console.log("[FCMService] getToken Rejected", error);
            })
    }
    /* deleteToken = () => {
        // console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                // console.log("[FCMService] Delete Token Error", error);
            })
    } */

    /* savetokenToAsync = async (fcmToken) => {
        const checkToken = await AsyncStorage.getItem('fcmtoken');
        if(!checkToken) {
            try {
                if (fcmToken) {
                    await AsyncStorage.setItem('fcmtoken',fcmToken);
                } else {
                    // console.log("[FCMService] User does not have a devices token")
                }
            } catch (error) {
                // console.log("[FCMService] error while receiving token:", error);
            }
        }
    } */

    /* getToken = async () => {
        const fcmToken = await messaging().getToken();
        this.savetokenToAsync(fcmToken)
        // console.log("fcmToken:",fcmToken)
    } */
    handlingInteractions = (onRegister, onOpenNotification) => {
        
        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] Running From background", remoteMessage);
            if (remoteMessage) {
                // notification.userInteraction = true;
                onOpenNotification(remoteMessage);
            }
        });
        
        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] From quit State", remoteMessage);
                if (remoteMessage) {
                    // notification.userInteraction = true;
                    onOpenNotification(remoteMessage);
                }
        });
            
        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            // this.savetokenToAsync(fcmToken)
            onRegister(fcmToken);
        });
    }

    // Background state message
    bgheadlessTask = () => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            // console.log("[FCMService] A new FCm message arrived from background", remoteMessage);
            if (remoteMessage) {
                // let notification = null;
                // if (Platform.OS === 'ios') {
                //     notification = remoteMessage.notification
                // } else {
                //     notification = remoteMessage.data
                // }
                // onNotification(notification);
            }
        });
    }

    /* stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            // console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    } */
}

export const fcmService = new FCMService()