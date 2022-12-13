import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import { Platform } from "react-native";

class LocalNotificationService { 
    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister : function (token) {
                // console.log("[LocalNotificationService] onRegister:",token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:",notification);
                if(!notification?.data) {
                    return
                }
                // notification.userInteraction = true;
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

    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "eventapp-id", // (required)
                channelName: "eventapp channel", // (required)
            },
            // (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    deleteChannel = () => {
        PushNotification.deleteChannel('Heytap PUSH');
    }

    getAllChannels = () => {
        PushNotification.getChannels(function (channel_ids) {
            console.log(channel_ids); // ['channel_id_1']
        });
    }

    showNotification = (title, message, data = {}, options = {}) => {

        //For Android
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(title, message, data, options),
            channelId: "eventapp-id",
            title : title || "",
            message : message || "",
            playSound : options.playSound || true,
            soundName : options.soundName || 'default',
            userInteraction : true , // BOOLEAN : If notification was opened by the user from notification
            badge : true,             
            picture:'https://i.pinimg.com/originals/a1/47/29/a14729422f50f6c13e835572982b58e2.jpg',
            userInfo: data,
        });          
    }

    buildAndroidNotification = ( title, message, data = {}, options = {}) => {
        return {
            autoCancel : true,
            largeIcon : options.largeIcon || "ic_launcher",
            smallIcon : options.smallIcon || "ic_notification",
            bigText : message || '',
            subText : title || '',
            vibrate : options.vibrate || true,
            vibration : options.vibration || 300,
            priority : options.priority || 'high',
            importance : options.importance || 'high',
            data : data,
        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID:", notificationId);
        PushNotification.cancelLocalNotification({id: `${notificationId}`})
    }

    PushNotification = () => {
        PushNotification.getDeliveredNotifications((message) => {
            return message;
        });
    }

    // applicationBadge = () => {
    //     // PushNotification.setApplicationIconBadgeNumber(2);
    //     // const ShortcutBadger = NativeModules.ShortcutBadger;
    //     // let count = 1;
    //     // ShortcutBadger.applyCount(count);
    // }
}

export const localNotificationService = new LocalNotificationService();