import { Platform } from 'react-native';
import { RESULTS,  requestMultiple} from 'react-native-permissions';
import { navigate } from './RootNavigation';


class AppPermissions {

    requestMultiple = (permi,navi,param) => {
        requestMultiple(permi)
        .then((result) => {
            if(Platform.OS ==  'android') {
                if(result['android.permission.ACCESS_FINE_LOCATION'] == 'granted' && result['android.permission.CAMERA'] == 'granted') {
                    navigate(navi,param);
                }
            }
            if(Platform.OS ==  'ios') {
                if(result['ios.permission.CAMERA'] == 'granted' && result['ios.permission.LOCATION_WHEN_IN_USE'] == 'granted') {
                    navigate(navi,param);
                }
            }
           
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');                        
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    break;
                }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export const appPermissions = new AppPermissions();