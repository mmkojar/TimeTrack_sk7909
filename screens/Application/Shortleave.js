import React,{ useEffect, useRef, useState } from 'react'
import { View, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Card, Title, Text, TextInput, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpSL, insertAppForm } from '../../components/redux/actions/employeeActions';
import { START_LOADER, STOP_LOADER } from '../../components/redux/actions/type';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Config from '../../components/utils/Config';
import SelectDropdown from 'react-native-select-dropdown';

const Shortleave = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empsl)
    const checkKey = result && Object.keys(result)[0];
  
    const fiternames = [];
    for(var i in (checkKey !== 'msg')&&result&&result.Duration) {
        fiternames.push(result.Duration[i].selection)
    }
    const fitertypes = [];
    for(var i in (checkKey !== 'msg')&&result&&result.Type) {
      fitertypes.push(result.Type[i].selection)
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
      if(checkKey == 'msg') {
        navigation.goBack();
        Toast.show({ type: 'error', text1:'NO Record found For ShortLeave' });
      }
      dispatch(getEmpSL(ecode))
    },[])
    const [fdate, setFdate] = useState();
    const durationRef = useRef();
    const [duration, setDuration] = useState('');
    const [intime, setIntime] = useState('');
    const [outtime, setOuttime] = useState('');
    // const sltypeRef = useRef();
    const [sltype, setSltype] = useState('OFFICIAL');
    const [reason, setReason] = useState('');

    const [shift, setShift] = useState('');
    const [login, setLogin] = useState(''); 
    const [logout, setLogout] = useState('');
    const [shiftStartTime, setShiftStartTime] = useState('');
    const [shiftEndTime, setShiftEndTime] = useState('');
    const [checkey, setCheckey] = useState('');

    const [show,setShow] = useState(false);
    const [unix, setUnix] = useState(moment(new Date()).valueOf());
  
    const onPickerChange = (event, selectedDate) => {
      setShow(false);
      setUnix(event.nativeEvent.timestamp);
      if(event.type == 'set') {
          var currentDate = moment(selectedDate).format('DD/MM/YYYY');
          setFdate(currentDate);
          dispatch({ type: START_LOADER });
          fetch(Config.clientUrl+`GetShortLeaveForEmployeeWithDate?EmpCode=${ecode}&SLDate=${currentDate}`,{
            method:'GET'
          })
          .then(res => res.json())
          .then((result) => {
              dispatch({ type: STOP_LOADER });
              setCheckey(Object.keys(result)[0]);
              if(Object.keys(result)[0] !== 'msg') {
                setShift(result.Shift[0].selection)
                setLogin(result.Login[0].selection)
                setLogout(result.Logout[0].selection)
                setShiftStartTime(result.ShiftStartTime[0].selection)
                setShiftEndTime(result.ShiftEndTime[0].selection)
              }
              else {
                Toast.show({ type:'error', text1:result.msg })
                setShift('')
                setLogin('')
                setLogout('')
              }
          })
      }
  };

    const submitEntry = () => {
        if(
          result&&result.ShortleavetimeAllowed === '0' ? 
          fdate == '' || duration == '' ||  intime == "" || outtime == "" ||  reason == ""
          : 
          fdate == '' || duration == '' || reason == ""
          )
        {
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        /* else if(intime > outtime) {
            Toast.show({
                type: 'error',
                text1:'Incorrect Time',
            });
        } */
        else {
            dispatch(insertAppForm(`ShortLeaveApplyForEmployee?EmpCode=${ecode}&Duration=${duration}&SLType=${sltype}&Fromdate=${fdate}&Todate=${fdate}&Reason=${reason}&Intime=${intime}&Outtime=${outtime}`))
            setFdate('')
            durationRef.current.reset()
            // sltypeRef.current.reset()
            setIntime('')
            setOuttime('')
            setLogin('')
            setLogout('')
            setReason('')
        }
    }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} style={{flex:1}} 
         keyboardVerticalOffset={Platform.OS === 'ios' && 50}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={theme.container}>
                <Authorities recom={result&&result.Recommender} sanc={result&&result.Sanctioner} />
                <Card style={theme.card} elevation={5}>
                  <Title style={theme.appheading}>Short Leave Entry Details</Title>
                  <View style={{display:'flex',flexDirection:'row'}}>
                      <View style={{width:'48%'}}>
                        {/* <Text style={theme.applabel}>Date</Text>              
                        <Datepicker
                            date1={fdate}
                            setState1={setFdate}            
                            maxDate={new Date()}  
                        /> */}
                          <Text style={theme.applabel}>Date</Text>
                            <TextInput
                              style={[{fontSize:14,height:45}]}
                              onPressIn={() => setShow(true)}
                              value={fdate}
                              caretHidden={true}
                              showSoftInputOnFocus={false}
                              editable={Platform.OS == 'ios' ? false : true}
                          />
                        { show && <DateTimePicker onChange={onPickerChange} value={new Date(unix)} themeVariant='light' /> }
                      </View>
                      <View style={{marginLeft:10,width:'48%'}}>
                          <Text style={theme.applabel}>Shift</Text>
                          <TextInput
                            style={{height:45}}
                            value={shift}
                            editable={false}
                          /> 
                      </View>
                  </View>
                  <View style={{marginVertical:10,display:'flex',flexDirection:'row'}}>
                      <View style={{width:'48%'}}>
                        <Text style={theme.applabel}>Login Time</Text>              
                        {/* <Datepicker
                            date1={login}
                            mode="time"
                            setState1={setLogin}
                        /> */}
                        <TextInput
                            style={{height:45}}
                            value={login}
                            editable={false}
                          /> 
                      </View>
                      <View style={{marginLeft:10,width:'48%'}}>
                        <Text style={theme.applabel}>Logout Time</Text>
                        {/* <Datepicker
                            date1={logout}
                            setState1={setLogout}
                            mode="time"
                        /> */}
                        <TextInput
                            style={{height:45}}
                            value={logout}
                            editable={false}
                          /> 
                      </View>
                  </View>
                  <View style={{width:'48%'}}>
                      <Text style={theme.applabel}>Duration</Text>
                      <SelectDropdown              
                          ref={durationRef}
                          data={fiternames}
                          defaultButtonText="--Select--"
                          buttonStyle={{backgroundColor:theme.colors.accent,borderTopRightRadius:6,borderTopLeftRadius:6,height:45,width:'100%'}}
                          buttonTextStyle={{fontSize:16,fontFamily:'VarelaRound-Regular'}}
                          dropdownStyle={{borderRadius:10,marginTop:-30}}
                          rowTextStyle={{fontSize:14,fontFamily:'VarelaRound-Regular'}}
                          onSelect={(selectedItem, index) => {
                            if(result&&result.ShortleavetimeAllowed === '1') {
                              setDuration(selectedItem)
                              if(selectedItem === 'firstHalf') {
                                setIntime(login);
                                setOuttime(shiftStartTime);
                              }
                              else {
                                setIntime(logout);
                                setOuttime(shiftEndTime);
                              }
                            }
                            else {
                              setDuration(selectedItem)
                            }
                          }}
                        />
                      {/* <Dropdown refval={durationRef} data={fiternames}  setValue={result&&result.ShortleavetimeAllowed === '0' ? setDuration : changeDuration} /> */}
                  </View>
                  <View style={{marginVertical:10,display:'flex',flexDirection:'row'}}>
                  {
                    result&&result.ShortleavetimeAllowed === '0' && 
                        <>
                        <View style={{width:'48%'}}>
                          <Text style={theme.applabel}>Start Time</Text>              
                          <Datepicker
                              date1={intime}
                              mode="time"
                              setState1={setIntime}
                          />
                        </View>
                        <View style={{marginLeft:10,width:'48%'}}>
                          <Text style={theme.applabel}>End Time</Text>
                          <Datepicker
                              date1={outtime}
                              setState1={setOuttime}
                              mode="time"                    
                          />
                        </View>
                        </>
                  }
                  </View>
                  {/* <Text style={theme.applabel}>SL Type</Text> */}
                  {/* <Dropdown refval={sltypeRef} data={fitertypes}  setValue={setSltype} style={{width:'48%'}}/> */}
                </Card>
                <Card style={theme.card} elevation={5}>
                    <Text style={theme.applabel}>Leave Reason</Text>
                    <TextInput
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={1}
                        maxLength={100}
                        textAlignVertical="top"
                        value={reason}
                        onChangeText={(val) => setReason(val)}
                    /> 
                    {
                      result&&result.ShowHoursBalance > 0 && <Title style={{color:'red',marginTop:10}}>Remaining Balance : {result.ShowHoursBalance}</Title>
                    }            
                </Card>
                {
                  checkey !== 'msg' &&
                  <CustomButtons title="Submit" pressHandler={submitEntry} />
                }
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default withTheme(Shortleave)
