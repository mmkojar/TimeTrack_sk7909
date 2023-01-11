import React,{ useEffect, useState } from 'react'
import { Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { Card, Title, Text, TextInput, Checkbox, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpManual, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { START_LOADER, STOP_LOADER } from '../../components/redux/actions/type';
import Config from '../../components/utils/Config';

const Manual = ({theme,navigation,route}) => {

  const {ecode} =  route.params;
  const result = useSelector((state) => state.employee.empmanual)
  const checkKey = result && Object.keys(result)[0];
             
  const [fdate, setFdate] = useState('');
  const [shift, setShift] = useState('');
  const [shiftime, setShiftime] = useState('');
  const [login, setLogin] = useState(''); 
  const [logout, setLogout] = useState('');
  const [nextday, setNextDay] = useState(false);
  const [reason, setReason] = useState('');
  const [remark, setRemark] = useState('');
  const [checkey, setCheckey] = useState('');
  
  const shiftcode = [];
  for(var i in (checkKey !== 'msg')&&result&&result.ShiftDetails) {
      if(result.ShiftDetails[i].Id == 'ShiftCode') {
        shiftcode.push(result.ShiftDetails[i].selection)
      }
  }
  const reasonmaster = [];
  for(var i in (checkKey !== 'msg')&&result&&result.ManualReasonMaster) {
      reasonmaster.push(result.ManualReasonMaster[i].selection)
  }

  const [show,setShow] = useState(false);
  const [unix, setUnix] = useState(moment(new Date()).valueOf());

  const dispatch = useDispatch();
  useEffect(() => {
    if(checkKey == 'msg') {
      navigation.goBack();
      Toast.show({ type: 'error', text1:'NO Record found For Manual' });
    }
    else {
      result&&result.ShiftDetails.filter((item,index) => {
        if(item.selection == shift) {                                
          setShiftime(result.ShiftDetails[index+1].selection)
        }
      })
    }
    dispatch(getEmpManual(ecode))
  },[shift])


  const onPickerChange = (event, selectedDate) => {
      setShow(false);
      setUnix(event.nativeEvent.timestamp);
      if(event.type == 'set') {
          var currentDate = moment(selectedDate).format('DD/MM/YYYY');
          setFdate(currentDate);
          dispatch({ type: START_LOADER });
          fetch(Config.clientUrl+`ManualEntryForEmployeeWithdate?EmpCode=${ecode}&ManualDate=${currentDate}`,{
            method:'GET'
          })
          .then(res => res.json())
          .then((result) => {
            console.log(result);
              dispatch({ type: STOP_LOADER });
              setCheckey(Object.keys(result)[0]);
              if(Object.keys(result)[0] !== 'msg') {
                setShift(result.Shift[0].selection)
                setLogin(result.Login[0].selection)
                setLogout(result.Logout[0].selection)
                // console.log(`"${moment(selectedDate).format('YYYY-MM-DD')} ${result.Login[0].selection}"`);
                // var a = moment(selectedDate).format('YYYY-MM-DD');
                // console.log(new Date(`"${a} ${result.Login[0].selection}"`));
                // console.log(moment(new Date((moment(selectedDate).format('YYYY-MM-DD')+", "+result.Login[0].selection)).valueOf())
              }
              else {
                Toast.show({ type:'error', text1:result.msg })
                setShift('')
                setLogin('')
                setLogout('')
                setShiftime('');
              }
          })
      }
  };
  const submitEntry = () => {
      if(fdate == '' || reason == ""){
          Toast.show({
              type: 'error',
              text1:'Fill All fields',
          });
      }
      else if(login > logout) {
          Toast.show({
              type: 'error',
              text1:'Incorrect Time',
          });
      }
      else {
          dispatch(insertAppForm(
            `ApplyManualEntryEmployee?EmpCode=${ecode}&Fromdate=${fdate}&Todate=${fdate}&ShiftCode=${shift}&Reason=${reason}&Login=${login}&LogOut=${logout}&NextDay=${nextday}
              &Login1=${login}&LogOut1=${logout}&NextDay1=${nextday}&LoginOG=${login}&LogoutOG=${logout}&Remark=${remark}`
          ));
          setFdate('')
          setShift('')
          setShiftime('');
          setLogin('')
          setLogout('')
          setNextDay(false)
          setReason('')
          setRemark('')
      }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} style={{flex:1}} 
         keyboardVerticalOffset={Platform.OS === 'ios' && 50}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={theme.container}>
                <Authorities recom={result && result.SanctionerList[0].Recommender} sanc={result && result.SanctionerList[0].Sanctioner} />
                <Card style={theme.card} elevation={5}>
                  <Title style={theme.appheading}>Manual Entry Details</Title>
                  {/* <View> */}
                    <View style={{display:'flex',flexDirection:'row'}}>
                      <View style={{width:'48%'}}>
                          <Text style={theme.applabel}>Select Date</Text>
                              <TextInput
                                  style={[{fontSize:14,height:45}]}
                                  onPressIn={() => setShow(true)}
                                  value={fdate}
                                  caretHidden={true}
                                  showSoftInputOnFocus={false}
                                  editable={Platform.OS == 'ios' ? false : true}
                              />
                            { show && <DateTimePicker onChange={onPickerChange} value={new Date(unix)} /> }
                      </View>
                      <View style={{marginLeft:10,width:'48%'}}>
                          <Text style={theme.applabel}>Select Shift</Text>
                          <Dropdown data={shiftcode} text={`${shift ? shift : '--Select--'}`} setValue={setShift}/>
                          
                          {
                            shiftime&&
                            <Text style={{color:'red'}}>
                              {shiftime}
                            </Text>
                          }
                          
                      </View>
                    </View>
                    <View style={{marginVertical:10,display:'flex',flexDirection:'row'}}>
                        <View style={{width:'48%'}}>
                          <Text style={theme.applabel}>Login Time</Text>              
                          <Datepicker
                              date1={login}
                              mode="time"
                              setState1={setLogin}                    
                          />
                        </View>
                        <View style={{marginLeft:10,width:'48%'}}>
                          <Text style={theme.applabel}>Logout Time</Text>
                          <Datepicker
                              date1={logout}
                              setState1={setLogout}
                              mode="time"
                          />
                        </View>
                    </View>
                    <Checkbox.Item
                        status={nextday ? 'checked' : Platform.OS=='ios' ? 'indeterminate' : 'unchecked'}
                        onPress={() =>  setNextDay(!nextday) }
                        color={theme.colors.primary}
                        position="leading"
                        label="Select if out punch is on next day"
                        style={{marginLeft:-24}}
                        labelStyle={{marginRight:50}}
                    />
                    <Text style={theme.applabel}>Reason</Text>
                    <Dropdown data={reasonmaster} text="--Select--" setValue={setReason} />
                  {/* </View> */}
                </Card>
                <Card style={theme.card} elevation={5}>
                    <Text style={theme.applabel}>Remark (max 100 char)</Text>
                    <TextInput
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={1}
                        maxLength={100}
                        textAlignVertical="top"
                        value={remark}
                        onChangeText={(val) => setRemark(val)}
                    /> 
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

export default withTheme(Manual)
