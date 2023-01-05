import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { navigate } from './RootNavigation';

class GeolocationService  {

    getLocation = (setLocation) => {
           
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
            console.log(position);
          },
          error => {
            
            Alert.alert('Error',error.message,[
            {text: 'Go Back', onPress: () => navigate('Home')}
            ],{cancelable:false})            
            setLocation(null);
          
          },
          {
            // accuracy: {  android: 'high', ios: 'best' },
            enableHighAccuracy: true,
            // distanceFilter: 0,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
    };

    getLocationUpdates = (watchId,setLocation) => {        
        // setObserving(true);
    
        watchId.current = Geolocation.watchPosition(
          position => {
            setLocation(position.coords);
            // console.log(position);
          },
          error => {
            Alert.alert('Error',error.message,[
              {text: 'Go Back', onPress: () => navigate('Home')}
              ],{cancelable:false})            
              setLocation(null); 
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            distanceFilter: 0,
            interval: 5000,
            fastestInterval: 2000,
            showLocationDialog:false
          },
        );
    };

    stopLocationUpdates = (watchId) => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
    
}

export const geolocationService = new GeolocationService()