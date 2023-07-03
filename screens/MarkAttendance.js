import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, StyleSheet, Image, Pressable, Alert, Platform, } from 'react-native';
import { Text, Modal, Portal, TextInput } from 'react-native-paper';
import { getTodaysAttLogs, getMarkEmpLogs, insertAttendance } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import LoopItems from './Reusable/LoopItems';
import Nodatafound from './Reusable/Nodatafound';
import CustomButtons from '../components/utils/CustomButtons';
import { geolocationService } from '../services/GeolocationService';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';
import { getDistance } from 'geolib';

function MarkAttendance({ navigation, route }) {

  const [theme] = useThemeStyle();
  const { ecode,isHod } = route.params;

  const result = useSelector((state) => state.employee.attlogs);
  const result1 = useSelector((state) => state.employee.markemplogs);

  const attlogs = result && result.GetLogsFromMarkMyAttendance;
  const markemplogs = result1 && result1.GetMarkMyAttendanceForEmployee[0];

  const getqrValue = markemplogs && markemplogs.IsGeoFancingCoOrdinates[0].QRCodeValues.split(',')
  const listGeoFencingType = markemplogs && markemplogs.IsGeoFancingCoOrdinates
  const checkAttType = markemplogs && markemplogs.Type;

  const scanner = useRef();
  const [location, setLocation] = useState(null);
  const [type, setType] = useState();
  const [remark, setRemark] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [qrvisible, setQrVisible] = useState(false);
  const [boxvisible, setBoxVisible] = useState(false);
  const d = new Date();
  const punchdate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

  const dispatch = useDispatch();

  const watchId = useRef(null);
  useEffect(() => {
    geolocationService.getLocation(setLocation);
    // geolocationService.getLocationUpdates(watchId,setLocation);
    dispatch(getTodaysAttLogs(ecode));
    dispatch(getMarkEmpLogs(ecode));
    
    return () => {
      geolocationService.stopLocationUpdates(watchId)
    }
  }, [ecode]);

  const openModals = (param) => {
    geolocationService.getLocation(setLocation);
    setType(param);
    if (markemplogs.Desc == 'MA') {
      setBoxVisible(true);
    }
    else if(markemplogs.Desc == 'MA-QR') {
      setQrVisible(true)
    }
    else if(markemplogs.Desc == 'MA-GO') {
      let isMatch = false;
      let Lat = parseFloat(listGeoFencingType[0].Lat)
      let Lang = parseFloat(listGeoFencingType[0].Lang)
      
      if (location) {
        var dist = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: Lat, longitude: Lang },
        );
        const range = (listGeoFencingType[0].RangeForGeo)
        if (dist >= range) {
          isMatch = false;
        } else {
          isMatch = true;
        }
        if (isMatch) {
          setBoxVisible(true)
        }
        else {
          Toast.show({ type: 'error', text1: `Your are Outside of Geofence ${location.latitude} - ${location.longitude}` })
        }
      }
      else {
        Toast.show({ type: 'error', text1: `Please Try again` })
      }
    }
    else if (markemplogs.Desc == 'MA-GO-QR') {
      
      let isMatch = false;
      let Lat = parseFloat(listGeoFencingType[0].Lat)
      let Lang = parseFloat(listGeoFencingType[0].Lang)
      
      if (location) {
        var dist = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: Lat, longitude: Lang },
        );
        const range = (listGeoFencingType[0].RangeForGeo)
        if (dist >= range) {
          isMatch = false;
        } else {
          isMatch = true;
        }
        if (isMatch) {
          setQrVisible(true)
        }
        else {
          Toast.show({ type: 'error', text1: `Your are Outside of Geofence ${location.latitude} - ${location.longitude}` })
        }
      }
      else {
        Toast.show({ type: 'error', text1: `Please Try again` })
      }
    }
    else if(markemplogs.Desc == '') {
      Toast.show({ type: 'error', text1: 'You are not Allowed to Mark Attendance' });
      navigation.navigate('Home');
    }
    // else {
    //   setQrVisible(true)
    // }
  };

  const onQrSuccess = e => {

    geolocationService.getLocation(setLocation);
    if (getqrValue.indexOf(e.data) == '-1') {
      // Alert.alert('Error', 'Invalid QR Value', [
      //   {
      //     text: 'OK', onPress: () => {
      //       scanner.current.reactivate()
      //       // setQrVisible(false)
      //     }
      //   }
      // ], { cancelable: false })
      setQrVisible(false)
      Toast.show({ type: 'error', text1: 'Marathi Barcode not matching' })
    }
    else {
      setQrvalue(e.data);
      setQrVisible(false)
      setBoxVisible(true);
      setRemark('');
    }
  };

  const attmarkDetail = () => {
      navigation.navigate('MarkEmpAtt',{
        ecode:ecode
      })
  }

  const addAttend = () => {
    setBoxVisible(false);
    dispatch(insertAttendance(ecode, type, location.longitude, location.latitude, location.accuracy, punchdate, remark, qrvalue))
    setTimeout(() => {
      dispatch(getTodaysAttLogs(ecode));
    }, 1000);
    setRemark('');
    // console.warn(ecode,type,longi,lati,accuracy,punchdate,remark,qrvalue);
  }

  const HomeIn = ({ type }) => {
    return (
      <Pressable onPress={() => openModals(type)}>
        <Image
          style={styles.image}
          source={require('../assets/home.png')} />
      </Pressable>
    )
  }

  const CUST = ({ type }) => {
    return (
      <Pressable onPress={() => openModals(type)}>
        <Image
          style={styles.image}
          source={require('../assets/cust.png')} />
      </Pressable>
    )
  }

  const OFFICE = ({ type }) => {
    return (
      <Pressable onPress={() => openModals(type)}>
        <Image
          style={styles.image}
          source={require('../assets/office.png')} />
      </Pressable>
    )
  }

  const header = ['LogTime', 'Type', 'Location'];

  return (
    <View style={[theme.dtcontainer]}>
      <Portal>
        <Modal visible={qrvisible} onDismiss={() => setQrVisible(false)}>
          <QRCodeScanner
            onRead={onQrSuccess}
            fadeIn={false}
            reactivate={false}
            // reactivateTimeout={1000}
            ref={scanner}
            // flashMode={Camera.Constants.FlashMode.torch}
            containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            cameraContainerStyle={{justifyContent:'center'}}
            cameraStyle={{ height: Platform.OS=='ios' ? 350 : 140, width: Platform.OS=='ios' ? 350 : 250 }}
          // cameraContainerStyle={{width:250}}
          />
        </Modal>
        <Modal visible={boxvisible} onDismiss={false} contentContainerStyle={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 14, marginHorizontal: 40 }}>
          <Text style={{ color: theme.colors.primary, fontSize: 20, marginBottom: 10 }}>Remark</Text>
          <TextInput            
            keyboardType='default'
            value={remark}
            multiline={true}
            numberOfLines={4}
            maxLength={150}
            textAlignVertical="top"
            onChangeText={val => setRemark(val)}
          />
          <CustomButtons title="Submit" pressHandler={addAttend}></CustomButtons>
        </Modal>
      </Portal>
      <View style={{display:'flex',flexDirection:'row',marginVertical:16}}>
        <View style={{width:`${isHod == 'true' ? '70%' : '100%'}`,marginTop:16}}>
          <Text style={styles.heading}>Please Click on IN/OUT Buttons to Mark your Attendance</Text>
        </View>
        <View style={{width:'30%'}}>
        {
            isHod == 'true' && 
            <Pressable onPress={attmarkDetail}>
              <Image
                style={{width: 50,height: 50,alignSelf:'flex-end',marginRight:20}}
                source={require(`../assets/iii.png`)}
              />
            </Pressable>
        }
        </View> 
      </View>
      <View style={{ marginVertical: 16 }}>
        <View style={[styles.action]}>
          {/* <Text style={{ fontSize: 24, marginVertical: 16, paddingRight: 30 }}>IN</Text> */}
          {markemplogs && markemplogs.ButtonPair == '1' ?
            <Pressable onPress={() => openModals('HOME-IN')}>
              <Image
                style={styles.image}
                source={require(`../assets/in.png`)}
              />
            </Pressable>
            : markemplogs && markemplogs.ButtonPair == '2' ?
              <>
                <HomeIn type='HOME-IN' />
                <CUST type='CUST-IN' />
              </>
              : markemplogs && markemplogs.ButtonPair == '3' ?
                <>
                  <HomeIn type='HOME-IN' />
                  <CUST type='CUST-IN' />
                  <OFFICE type='OFFICE-IN' />
                </>
                : null
          }
        </View>
        <Text></Text>
        <View style={styles.action}>
          {/* <Text style={{ fontSize: 24, marginVertical: 16, paddingRight: 16 }}>Out</Text> */}
          {markemplogs && markemplogs.ButtonPair == '1' ?
            <Pressable onPress={() => openModals('HOME-OUT')}>
              <Image
                style={styles.image}
                source={require('../assets/out.png')} />
            </Pressable>
            : markemplogs && markemplogs.ButtonPair == '2' ?
              <>
                <HomeIn type='HOME-OUT' />
                <CUST type='CUST-OUT' />
              </>
              : markemplogs && markemplogs.ButtonPair == '3' ?
                <>
                  <HomeIn type='HOME-OUT' />
                  <CUST type='CUST-OUT' />
                  <OFFICE type='OFFICE-OUT' />
                </>
                : null
          }
        </View>
      </View>
      <Dtheader headtitle={header} />
      {
        attlogs && attlogs.length > 0 ?
          <>
            <FlatList
              data={attlogs && attlogs}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <LoopItems
                  type='dt'
                  dttable={Object.values(item)} />
              )} />
          </>
          : <Nodatafound />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    // color:'#000',
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 14,
  },
  image: {
    width: 64,
    height: 64,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

export default MarkAttendance
