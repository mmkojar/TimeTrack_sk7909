import React, { useEffect, useState,useRef } from 'react'
import { View,StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { geolocationService } from '../services/GeolocationService';
import MapView, { Marker,PROVIDER_GOOGLE,Polyline } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import haversine from 'haversine';

const LiveTracking = ({navigation}) => {

    // const [location, setLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [prevLatLng, setPrevLatLng] = useState({});
    const [distanceTravelled, setDistanceTravelled] = useState(0);
    const LATITUDE = 18.7934829;
    const LONGITUDE = 98.9867401;
    const [region, setRegion] = useState({
        latitude:LATITUDE,
        longitude:LONGITUDE,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        // distanceTravelled: 0,  // contain live distance
        // prevLatLng: {}  // contain pass lat and lang value
        // routeCoordinates: [], 
    })
    const initRegion = {
      latitude:region&&region.latitude,
      longitude:region&&region.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    const [zoom, setZoom] = useState(10);

    const mapRef = useRef(null);
    const MAX_ZOOM_LEVEL = 20;
    const MIN_ZOOM_LEVEL = 3;

    const getLatLongDelta = (zoom, latitude) => {
      const LONGITUDE_DELTA = Math.exp(Math.log(360) - zoom * Math.LN2);
      const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
      const accurateRegion =
        LONGITUDE_DELTA *
        (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
      const LATITUDE_DELTA = accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS;
  
      return [LONGITUDE_DELTA, LATITUDE_DELTA];
    };

    const handleZoom = (isZoomIn = false) => {
      let currentZoomLevel = zoom;
      // if zoomlevel set to max value and user click on minus icon, first decrement the level before checking threshold value
      if (!isZoomIn && currentZoomLevel === MAX_ZOOM_LEVEL) {
        currentZoomLevel -= 1;
      } 
      // if zoomlevel set to min value and user click on plus icon, first increment the level before checking threshold value
      else if (isZoomIn && currentZoomLevel === MIN_ZOOM_LEVEL) {
        currentZoomLevel += 1;
      }
      if (
        currentZoomLevel >= MAX_ZOOM_LEVEL ||
        currentZoomLevel <= MIN_ZOOM_LEVEL
      ) {
        return;
      }
  
      currentZoomLevel = isZoomIn ? currentZoomLevel + 1 : currentZoomLevel - 1;
      const zoomedInRegion = {
        ...region,
        latitudeDelta: getLatLongDelta(
          currentZoomLevel,
          region.latitude
        )[1],
        longitudeDelta: getLatLongDelta(
          currentZoomLevel,
          region.latitude
        )[0]
      };
  
      setRegion(zoomedInRegion);
      setZoom(currentZoomLevel);
      mapRef?.current?.animateToRegion(zoomedInRegion, 100);
    };

    const calcDistance = (newLatLng) => {
      // const { prevLatLng } = region; 
      return haversine(prevLatLng, newLatLng) || 0;
    };
    
    const watchId = React.useRef(null);
    CrrLocation = () => {
           
        Geolocation.getCurrentPosition(
          position => {
            setRegion({
              latitude:position.coords.latitude,
              longitude:position.coords.longitude,
            });
          },
          error => {            
            Alert.alert('Error',error.message,[
            {text: 'Go Back', onPress: () => navigate('Home')}
            ],{cancelable:false})
            // setRegion(null);
          },
          {
            // accuracy: {  android: 'high', ios: 'best' },
            enableHighAccuracy: true,
            // distanceFilter: 0,
            timeout: 200000,
            maximumAge: 1000,
          },
      );
    };
    
    getLocationUpdates = () => {        
        // setObserving(true);
    
        watchId.current = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            // const { distanceTravelled } = region;
            const newCoordinate = {  latitude,  longitude  };
            setRegion({
              latitude, longitude,
              // distanceTravelled: distanceTravelled + calcDistance(newCoordinate),
              // prevLatLng: newCoordinate
              // routeCoordinates:routeCoordinates.concat([newCoordinate])
            });
            setDistanceTravelled(distanceTravelled + calcDistance(newCoordinate))
            setPrevLatLng(newCoordinate)
            setRouteCoordinates(routeCoordinates.concat([newCoordinate]))
          },
          error => {
            Alert.alert('Error',error.message,[
              {text: 'Go Back', onPress: () => navigation.navigate('Home')}
              ],{cancelable:false})
              // setRegion(null); 
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 5000,
            fastestInterval: 2000,
            showLocationDialog:false
          },
        );
    };

    
    useEffect(() => {
        // CrrLocation();
        getLocationUpdates();
    
    return () => {
        geolocationService.stopLocationUpdates(watchId)
    }
    }, []);
    
    // console.log("loc:",distanceTravelled&&distanceTravelled); 
    // console.log("cords:",routeCoordinates&&routeCoordinates);
    // console.log("prevLatLng:",region.prevLatLng&&region.prevLatLng);
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={{ ...StyleSheet.absoluteFillObject }}
                initialRegion={initRegion}
                showsUserLocation={true}
                onRegionChangeComplete={(region) => setRegion(region)}
                // mapType="hybrid"
            >
                <Marker coordinate={initRegion} />
                <Polyline coordinates={routeCoordinates} strokeWidth={5} />
            </MapView>
            <View style={{alignSelf:'flex-end',marginRight:10,marginBottom:10}}>
              <TouchableOpacity onPress={() => handleZoom(true)} disabled={zoom === MAX_ZOOM_LEVEL}>
                  <FontAwesome5Icon
                  name={'plus'}
                  size={22}
                  style={{ opacity: zoom === MAX_ZOOM_LEVEL ? 0.2 : 1,backgroundColor: '#fff',padding:8,marginBottom:5 }}
                  />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleZoom()} disabled={zoom === MIN_ZOOM_LEVEL}>
                  <FontAwesome5Icon
                  name={'minus'}
                  size={22}
                  style={{ opacity: zoom === MIN_ZOOM_LEVEL ? 0.2 : 1,backgroundColor: '#fff',padding:8 }}
                  />
              </TouchableOpacity>
            </View>
            <View style={styles.distanceContainer}>
                <Text>{parseFloat(distanceTravelled).toFixed(2)} km</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    distanceContainer: {
      flexDirection: "row",
      marginVertical: 20,
      backgroundColor: "transparent"
    }
  });

export default LiveTracking