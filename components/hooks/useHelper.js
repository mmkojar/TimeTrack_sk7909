import React,{ useState, useEffect } from "react";
import DeviceInfo from 'react-native-device-info';
import { localNotificationService } from "../../services/LocalNotificationService";
import { navigate } from "../../services/RootNavigation";
import { fcmService } from "../../services/FCMService";

const useHelper = () => {

    const [token,SetToken] = useState('');
    const [deviceId, setDeviceId] = useState('');
    
    const getToken = async () => {
        fcmService.getToken(onRegister)
    }
    const onRegister = (token) => {
        SetToken(token);
    }
    DeviceInfo.getUniqueId().then((uniquid) => {
        setDeviceId(uniquid);
    })
    
    // Notification Helper
    const onNotification = (notify) => {
        localNotificationService.showNotification(
            'TimeTrack',
            notify.message ? notify.message : notify.body,
            notify
        )
    };
      
    // const isAuth = useSelector((state) => state.auth.isAuthenticated);
        
    const onOpenNotification =  (notifi) => {
        console.log("notifi:",notifi);
       
        if(notifi.userInteraction == true) {
            if(notifi.data.AppID) {
                navigate('PAItemDetail' ,{
                    ecode:notifi.data.EmpCode,
                    apptype:notifi.data.AppType.replace(' ',''),
                    pdtype:notifi.data.AppAction,
                    id:notifi.data.AppID
                });
            }
            
        } 

        // if(isAuth) {
        //     notifi.userInteraction == true && navigate('Notifi');
        // }
        // else{
        //     notifi.userInteraction == true && navigate('Login');
        // }
    };

    useEffect(() => {
        getToken();
    }, [])

    return {
        token, deviceId, onNotification, onOpenNotification
    }

}

export default useHelper;