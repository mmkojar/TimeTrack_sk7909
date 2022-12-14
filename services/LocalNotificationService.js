import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
// import { Platform } from "react-native";

class LocalNotificationService { 

    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "timetrack-id", // (required)
                channelName: "timetrack channel", // (required)
            },
            // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister : function (token) {
                // console.log("[LocalNotificationService] onRegister:",token);
            },
            onNotification: function (notification) {
                // console.log("[LocalNotificationService] onNotification:",notification);
                if(!notification?.data) {
                    return
                }
                // notification.userInteraction = false;
                onOpenNotification(notification);

                 // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
    }

    unregister = () => {
        PushNotification.unregister();
    }

    deleteChannel = () => {
        PushNotification.deleteChannel('Heytap PUSH');
    }

    getAllChannels = () => {
        PushNotification.getChannels(function (channel_ids) {
            // console.log(channel_ids); // ['channel_id_1']
        });
    }

    showNotification = (title, message, data = {}, options = {}) => {

        //For Android
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(title, message, data, options),
            channelId: "timetrack-id",
            title : title || "",
            message : message || "",
            playSound : true,
            soundName : 'default',
            userInteraction : true , // BOOLEAN : If notification was opened by the user from notification
            badge : true,
            // picture: "ic_launcher",
            userInfo: data,
        });
    }

    buildAndroidNotification = ( title, message, data = {}, options = {}) => {
        return {
            autoCancel : true,
            largeIcon : "",
            smallIcon : "ic_notification",
            bigText : message || '',
            subText : title || '',
            vibrate : true,
            vibration : 300,
            priority : 'high',
            importance : 'high',
            data : data,
        }
    }

    cancelAllLocalNotifications = () => {
        if(Platform.OS=='ios') {
            PushNotificationIOS.removeAllPendingNotificationRequests();
        }
        else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationId) => {
        // console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotification({id: `${notificationId}`})
    }

    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
}

export const localNotificationService = new LocalNotificationService();