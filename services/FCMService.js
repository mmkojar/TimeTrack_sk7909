import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    register  (onRegister, onOpenNotification) {        
        if(Platform.OS == 'ios') {
            this.checkPermission(onRegister);
        }
        else{
            this.getToken(onRegister);
        }
        
        this.createNotificationListeners(onRegister, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = async (onRegister) => {
        await messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permission
                    this.getToken(onRegister);
                    // console.log("[FCMService] IOS has Permission")
                } else {
                    // User don't have permission
                    this.requestPermission(onRegister);
                }
            }).catch(error => {
                // console.log("[FCMService] Permission Rejected", error);
            })
    }

    getToken = async (onRegister) => {
        await messaging().getToken()
        .then(fcmToken => {
            if (fcmToken) {
                onRegister(fcmToken)
            } else {
                console.log("[FCMService] User does not have a devices token")
            }
        }).catch(error => {
            // console.log("[FCMService] getToken Rejected", error);
        })
    }

    requestPermission = async (onRegister) => {
        await messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister);
                // console.log("[FCMService] IOS Permission requested")
            }).catch(error => {
                // console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    deleteToken = () => {
        // console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                // console.log("[FCMService] Delete Token Error", error);
            })
    }

    createNotificationListeners = (onRegister, onOpenNotification) => {

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

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            // console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    }
}

export const fcmService = new FCMService()