import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { localNotificationService } from './LocalNotificationService';


class FCMService {
    register  (onRegister, onNotification, onOpenNotification) {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
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

    requestPermission = (onRegister) => {
        messaging().requestPermission({provisional: true,sound: true})
            .then(() => {
                this.getToken(onRegister);
            }).catch(error => {
                console.log("[FCMService] Request Permission Rejected", error);
            })
    }

    deleteToken = () => {
        console.log("[FCMService] Delete Token");
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete Token Error", error);
            })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        
        //Forground state message
        this.messageListener = messaging().onMessage(async remoteMessage => {
            localNotificationService.cancelAllLocalNotifications();
            if (remoteMessage) {
                console.log("[FCMService] A new FCm message arrived", remoteMessage);
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification
                } else {
                    notification = remoteMessage.data
                }
                onNotification(notification);
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            localNotificationService.cancelAllLocalNotifications();
            if (remoteMessage) {
                console.log("[FCMService] A new FCm message arrived from background", remoteMessage);
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.notification
                } else {
                    notification = remoteMessage.data
                }
                // onNotification(notification);
            }
        });

        // When Application Running on Background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] Running From background", remoteMessage);
            if (remoteMessage) {
                const notification = remoteMessage;
                notification.userInteraction = true;
                onOpenNotification(notification);
            }
        });

        //When Application open from quit state
        messaging().getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] From quit State", remoteMessage);
                if (remoteMessage) {
                    const notification = remoteMessage;
                    notification.userInteraction = true;
                    // localNotificationService.cancelAllLocalNotifications();
                    onOpenNotification(notification);
                }
            });


        // Triggered when have new Token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] New token refresh", fcmToken);
            onRegister(fcmToken);
        });
    }

    unRegister = () => {
        this.messageListener();
    }

    stopAlarmRing = async () => {
        if (Platform.OS != 'ios') {
            await messaging().stopAlarmRing();
            console.log('sdfghjkldfgh', "stopAlarmRing");
        }
    }
}

export const fcmService = new FCMService()