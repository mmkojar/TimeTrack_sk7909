import React,{ useEffect,useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList,StyleSheet,Image, Pressable, Alert, } from 'react-native';
import { Text, Modal, Portal, TextInput } from 'react-native-paper';
import { getTodaysAttLogs, getMarkEmpLogs, insertAttendance } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import LoopItems from './Reusable/LoopItems';
import Nodatafound from './Reusable/Nodatafound';
import CustomButtons from '../components/utils/CustomButtons';
import Geolocation from 'react-native-geolocation-service';
// import GeoFencing from 'react-native-geo-fencing';
import QRCodeScanner from 'react-native-qrcode-scanner';

function MarkAttendance({ navigation, route }) {

  const [theme] = useThemeStyle();
  const { ecode } = route.params;


  const result = useSelector((state) => state.employee.attlogs);
  const result1 = useSelector((state) => state.employee.markemplogs);
  
  const attlogs = result && result.GetLogsFromMarkMyAttendance;
  const markemplogs = result1 && result1.GetMarkMyAttendanceForEmployee[0];
  
  const getqrValue = markemplogs && markemplogs.IsGeoFancingCoOrdinates[0].QRCodeValues.split(',')
  const checkgeorange = markemplogs && markemplogs.IsGeoFancingCoOrdinates[0].RangeForGeo
  const checkAttType = markemplogs && markemplogs.Type;  

  const scanner = useRef();
  const [longi, setLongi] = useState();
  const [lati, setLati] = useState();
  const [accuracy, setAccuracy] = useState();
  const [type, setType] = useState();
  const [remark, setRemark] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [qrvisible, setQrVisible] = useState(false);
  const [boxvisible, setBoxVisible] = useState(false);
  const d = new Date();
  const punchdate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

  const dispatch = useDispatch();

  const setGeoLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLati(position.coords.latitude)
        setLongi(position.coords.longitude)
        setAccuracy(position.coords.accuracy)
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Error',error.message,[
          {text: 'Go Back', onPress: () => navigation.navigate('Home')}
        ],{cancelable:false})
      },
      { enableHighAccuracy: true, accuracy:'high', timeout: 10000, maximumAge: 10000 }
    );
  }

  useEffect(() => {
    dispatch(getTodaysAttLogs(ecode));
    dispatch(getMarkEmpLogs(ecode));
    setGeoLocation();

    return () => {}    
  }, []);

  const openModals = (param) => {
    setType(param);
    if(checkAttType == '1') {
      setBoxVisible(true);
    }
    else if(checkAttType == '3') {
        /* if(accuracy > checkgeorange ) {
          Alert.alert('Error','QR is Out of range',[
            {text: 'OK', onPress: () => {
              if(scanner.current.reactivate()) {
                setQrVisible(false)
              }
            }}
          ],{cancelable:true})
        } */
        /* const polygon = [
          { lat: 19.1746729, lng: 72.8457607 },
          // { lat: 3.3091633559540123, lng: 101.66198730468757 },
          // { lat: 3.091150714460597,  lng: 101.92977905273438 },
          // { lat: 2.7222113428196213, lng: 101.74850463867188 },
          // { lat: 2.7153526167685347, lng: 101.47933959960938 },
          { lat: 19.1746729, lng: 72.8457607 } // last point has to be same as first point
        ];
        Geolocation.getCurrentPosition(
          (position) => {
            let point = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
       
            GeoFencing.containsLocation(point, polygon)
              .then(() => console.log('point is within polygon'))
              .catch(() => console.log('point is NOT within polygon'))
          },
          (error) => alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ); */
    }
    else {
      setQrVisible(true)
    }
  };

  const onQrSuccess = e => {
    console.log(e.data);
    setGeoLocation();
      if(getqrValue.indexOf(e.data) == '-1') {
        Alert.alert('Error','Invalid QR Value',[
          {text: 'OK', onPress: () => {
            scanner.current.reactivate()
            // setQrVisible(false)
          }}
        ],{cancelable:false})
      }
      else{
        setQrvalue(e.data);
        setQrVisible(false)
        setBoxVisible(true);
        setRemark('');    
      }  
  };
  
  const addAttend = () => {
    if(remark == '') {
      alert('Enter Remark');
    }
    else {
      setBoxVisible(false);
      // dispatch(insertAttendance(ecode,type,longi,lati,accuracy,punchdate,remark,qrvalue))
      dispatch(getTodaysAttLogs(ecode));
      console.warn(ecode,type,longi,lati,accuracy,punchdate,remark,qrvalue);
    }
  }

  const header = ['Login Time', 'Type', 'Location'];

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
                  containerStyle={{alignItems:'center',justifyContent:'center'}}
                  cameraStyle={{height:80,width:250}}
                  // cameraContainerStyle={{width:250}}
                />
              </Modal>
              <Modal visible={boxvisible} onDismiss={() => setBoxVisible(false)} contentContainerStyle={{backgroundColor:'#ffffff',borderRadius:5,padding:20,marginHorizontal:40}}>
                  <Text style={{color:theme.colors.primary,fontSize:20,marginBottom:10}}>Remark</Text>
                  <TextInput                   
                    style={[theme.textinput,{height:0}]} 
                    keyboardType='default'
                    value={remark}
                    multiline={true}
                    numberOfLines={4}                    
                    maxLength={150}
                    textAlignVertical="top"
                    onChangeText={val => setRemark(val)}
                  />
                  <Text></Text>
                <CustomButtons title="Submit" pressHandler={addAttend}></CustomButtons>
              </Modal>
          </Portal>
          <View>
            <Text style={styles.heading}>Please Click on IN/OUT Buttons to Mark your Attendance</Text>
          </View>
          <View style={{marginVertical:20}}>
            <View style={[styles.action]}>         
              <Text style={{ fontSize: 24, textAlignVertical:'center',paddingRight:30}}>IN</Text>
              {markemplogs && markemplogs.ButtonPair == '1' ?
                <Pressable onPress={() => openModals('HOME-IN')}>
                  <Image
                    style={styles.image}
                    source={require('../assets/in.png')} />
                </Pressable>
                : markemplogs && markemplogs.ButtonPair == '2' ?
                  <>
                  <Pressable onPress={() => openModals('HOME-IN')}>
                    <Image
                      style={styles.image}
                      source={require('../assets/home.png')} />
                  </Pressable>
                  <Pressable onPress={() => openModals('CUST-IN')}>
                    <Image
                      style={styles.image}
                      source={require('../assets/cust.png')} /> 
                  </Pressable>
                  </> 
                : markemplogs && markemplogs.ButtonPair == '3' ?
                  <>
                    <Pressable onPress={() => openModals('HOME-IN')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/home.png')} />
                    </Pressable>
                    <Pressable onPress={() => openModals('CUST-IN')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/cust.png')} /> 
                    </Pressable>
                    <Pressable onPress={() => openModals('OFFICE-IN')}>
                    <Image
                      style={styles.image}
                      source={require('../assets/office.png')} /> 
                    </Pressable>
                  </> 
                : null
                }
            </View>
            <Text></Text>
            <View style={styles.action}>
              <Text style={{ fontSize: 24, textAlignVertical:'center',paddingRight:16}}>Out</Text>
              {markemplogs && markemplogs.ButtonPair == '1' ?
                <Pressable onPress={() => openModals('HOME-OUT')}>
                  <Image
                    style={styles.image}
                    source={require('../assets/out.png')} />
                </Pressable>
                : markemplogs && markemplogs.ButtonPair == '2' ?
                  <>
                    <Pressable onPress={() => openModals('HOME-OUT')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/home.png')} />
                    </Pressable>
                    <Pressable onPress={() => openModals('CUST-OUT')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/cust.png')} /> 
                    </Pressable>
                </>
                : markemplogs && markemplogs.ButtonPair == '3' ?
                  <>
                    <Pressable onPress={() => openModals('HOME-OUT')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/home.png')} />
                    </Pressable>
                    <Pressable onPress={() => openModals('CUST-OUT')}>
                      <Image
                        style={styles.image}
                        source={require('../assets/cust.png')} /> 
                    </Pressable>
                    <Pressable onPress={() => openModals('OFFICE-OUT')}>
                    <Image
                      style={styles.image}
                      source={require('../assets/office.png')} /> 
                    </Pressable>
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
  heading:{
      // color:'#000',
      textAlign:'center',
      fontSize:14,
      paddingHorizontal:14,
      // marginVertical:30
      marginTop:20
  },
  image:{
    width:64,
    height:64,        
  },
  action : {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  }
})

export default MarkAttendance
