import { fcmService } from "./FCMService";
import { localNotificationService } from "./LocalNotificationService";

class Notify {

    constructor(){
        fcmService.registerAppWithFCM();
        fcmService.register(this.onRegister,this.onNotification,this.onOpenNotification)
        localNotificationService.configure(this.onOpenNotification);
    }

    onNotification = (notify) => {
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
    }

    onOpenNotification = async (notify) => {
        // check for auth    
        console.log("notify:",notify);
        if(notify.userInteraction == true) { 
          if(notify.data.type=="message") {
            navigate('ChatBox', {
              id: notify.data.sender_id,
              full_name: notify.data.sender_name,
            });
          }
          else if(notify.data.type=="polling")  {
            navigate('Polling');
          }
        }
      }
}

export const Notify = new Notify();