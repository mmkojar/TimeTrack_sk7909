import React,{ useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from "react-redux";
import { localNotificationService } from "../../services/LocalNotificationService";
import { navigate } from "../../services/RootNavigation";

const useHelper = () => {

    const [token,SetToken] = useState('');
    const [deviceId, setDeviceId] = useState('');

    const getToken = async () => {
        const token = await AsyncStorage.getItem('fcmtoken');
        if(token) {
            SetToken(token);
        }
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
        navigate('Notifi');
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