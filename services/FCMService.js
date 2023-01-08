import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    register  (onOpenNotification) {
        if(Platform.OS == 'ios') {
            this.checkPermission();
        }
        else {
            this.getToken();
        }
        this.handlingInteractions(onOpenNotification);
    }    

    checkPermission = async () => {
        await messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken();
                    // console.log("[FCMService] IOS has Permission")
                } else {
                    // User don't have permission
                    this.requestPermission();
                }
            }).catch(error => {
                // console.log("[FCMService] Permission Rejected", error);
            })
    }

    requestPermission = async () => {
        await messaging().requestPermission()
            .then(() => {
                this.getToken();
                // console.log("[FCMService] IOS Permission requested")
            }).catch(error => {
                // console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    savetokenToAsync = async (fcmToken) => {
        const checkToken = await AsyncStorage.getItem('fcmtoken');
        if(!checkToken) {
            try {                
                if (fcmToken) {
                    await AsyncStorage.setItem('fcmtoken',fcmToken);
                } else {
                    console.log("[FCMService] User does not have a devices token")
                }
            } catch (error) {
                console.log("[FCMService] error while receiving token:", error);
            }
        }
    }

    getToken = async () => {
        const fcmToken = await messaging().getToken();
        this.savetokenToAsync(fcmToken)
    }

    deleteToken = () => {
        // console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                // console.log("[FCMService] Delete Token Error", error);
            })
    }

    handlingInteractions = (onOpenNotification) => {
        
        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            // console.log("[FCMService] Running From background", remoteMessage);
            if (remoteMessage) {
                // notification.userInteraction = true;
                onOpenNotification(remoteMessage);
            }
        });
        
        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    // console.log("[FCMService] From quit State", remoteMessage);
                    // notification.userInteraction = true;
                    onOpenNotification(remoteMessage);
                }
            });

            
        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            this.savetokenToAsync(fcmToken)
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

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            // console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    }
}

export const fcmService = new FCMService()