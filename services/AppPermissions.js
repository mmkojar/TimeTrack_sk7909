import { PERMISSIONS, RESULTS, request, requestMultiple} from 'react-native-permissions';
import { navigationRef, navigate } from './RootNavigation';

class AppPermissions {

    requestMultiple = (permi,navi,param) => {
        requestMultiple(permi)
        .then((result) => {
            if(result['android.permission.ACCESS_FINE_LOCATION'] == 'granted' && result['android.permission.CAMERA'] == 'granted') {
                navigate(navi,param);
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

    requestCamera = (navi) => {
        request(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
            if(result['android.permission.CAMERA'] == 'granted') {
                navigate(navi);
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

    requestLocation = (navi) => {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
            if(result['android.permission.ACCESS_FINE_LOCATION'] == 'granted') {
                navigate(navi);
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