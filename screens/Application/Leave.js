import React,{ useEffect, useRef, useState } from 'react'
import { ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, View, Pressable, Platform } from 'react-native'
import { Card, Title, Text, TextInput,  withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpLeave, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import SelectDropdown from 'react-native-select-dropdown';
import MultipleDay from '../Reusable/MultipleDay';

const Leave = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empleave)
    const checkKey = result && Object.keys(result)[0];

    const dispatch = useDispatch();
    useEffect(() => {
      if(checkKey == 'msg') {
          navigation.goBack();
          Toast.show({ type: 'error', text1:'NO Record found For Leave' });
      }
      dispatch(getEmpLeave(ecode))
    },[])

    const [fdate, setFdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [tdate, setTdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [ltype, setLtype] = useState('');
    const [task, setTask] = useState('');
    const [ecdays, setEcDays] = useState('');
    const [duid, setDuid] = useState('');
    const [duration, setDuration] = useState('');
    const [durmultiple, setDurmultiple] = useState('');
    const [reason, setReason] = useState('');
    const ltypeRef = useRef();
    const taskDropdownRef = useRef();
    const duraDropdownRef = useRef();
    
    const filtertypes = [];
    const filtertask = [];
    const filterduid = [];
    const MulDaySH = [];
    const MulDayFH = [];
    for(var i in (checkKey !== 'msg')&&result&&result.Leave) {
      filtertypes.push(result.Leave[i].Name)
    }
    (checkKey !== 'msg')&&result&&result.Leave.filter((item,index) => {
      if(item.Name == ltype) {
          if(item.ApplyLeave == '1') {
            filtertask.push('Apply Leave')
          }
          if(item.EncashMentAllowed == '1') {
            filtertask.push('Encash Leaves')
          }
          if(item.Lta_Allowed == '1') {
            filtertask.push('LTA Leave')
          }
          item.Duration.filter(ditem => {
            if(ditem.selection == '1') {
              filterduid.push(ditem.Id)
              ditem.MultipleDayDuration.filter(mditem => {
                  if((mditem.selection == '1' && mditem.Id == 'MultipleDaySecondHalf') || mditem.Id == 'MultipleFullDay') {
                      MulDaySH.push(mditem.Id)
                  }
                  if((mditem.selection == '1' && mditem.Id == 'MultipleDayFirstHalf') || mditem.Id == 'MultipleFullDay') {
                      MulDayFH.push(mditem.Id)
                  }
              })
            }
          })
      }
    })
    
    
    const submitEntry = () => {        
        if(
          task == 'Encash Leaves' && ltype == 'E-Earned Leave' ? 
          ltype == '' || task == '' || ecdays == '' || reason == ''
          : 
          duid == 'MultipleDay' ? 
          ltype == '' || task == '' || fdate == '' || tdate == '' ||  reason == "" || duid == "" ||  duration == "" || durmultiple == "" 
          : 
          ltype == '' || task == '' || duid == '' ||  fdate == "" || reason == ""
        ){
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        else if(duid == 'MultipleDay' ? (fdate > tdate) : !fdate) {
            Toast.show({
                type: 'error',
                text1:`Incorrect Dates`,
            });
        }
        else {
            dispatch(insertAppForm(
              `LeaveApplyForEmployee?EmpCode=${ecode}&LeaveCode=${ltype.split('-')[0]}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}&Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Applcationtype=${task == 'Encash Leaves' ? 'EncashLeave' : 'Leave'}&Encahdays=${ecdays}&Reason=${reason}`
            ));
            ltypeRef.current.reset();
            taskDropdownRef.current.reset();
            duraDropdownRef.current.reset()
            setEcDays('')
            setDuid('')
            setReason('')
        }
    }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} style={{flex:1}} 
         keyboardVerticalOffset={Platform.OS === 'ios' && 50}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={theme.container}>
                <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
                <Card style={theme.card} elevation={5}>                      
                  <Title style={theme.appheading}>Leave Details</Title>            
                  <Pressable onPress={() => navigation.navigate('LeaveBal',{ecode:ecode})}>
                      <Text style={{color:'red',fontSize:16,textAlign:'right',marginTop:-30}}>Balance</Text>
                  </Pressable>
                    <View style={{display:'flex',flexDirection:'row'}}>
                      <View style={{width:'48%'}}>
                          <Text style={theme.applabel}>Leave Type</Text>
                          <SelectDropdown              
                            ref={ltypeRef}
                            data={filtertypes}
                            defaultButtonText="--Select--"
                            buttonStyle={{backgroundColor:theme.colors.accent,borderTopRightRadius:6,borderTopLeftRadius:6,height:45,width:'100%'}}
                            buttonTextStyle={{fontSize:16,fontFamily:'VarelaRound-Regular'}}
                            dropdownStyle={{borderRadius:10,marginTop:-30}}
                            rowTextStyle={{fontSize:14,fontFamily:'VarelaRound-Regular'}}
                            onSelect={(selectedItem, index) => {                        
                              setLtype(selectedItem);
                              taskDropdownRef.current.reset();
                              task !== 'Encash Leaves' ? duraDropdownRef.current.reset() : setEcDays('');
                              setTask('');
                              setDuid('');
                              setDuration('');
                            }}
                          />
                      </View>
                      <View style={{marginLeft:10,width:'48%'}}>
                          <Text style={theme.applabel}>Task</Text>
                          <Dropdown refval={taskDropdownRef} data={filtertask}  setValue={setTask} disable={filtertask.length == 0 && true}/>
                      </View>
                    </View>              
                      {
                        task == 'Encash Leaves' && ltype == 'E-Earned Leave' ? 
                        <View style={{marginVertical:10}}>
                          <Text style={theme.applabel}>No. of Leave to Encash</Text>
                          <TextInput
                              style={{height:40}}
                              keyboardType="number-pad"                    
                              value={ecdays}
                              onChangeText={(val) => setEcDays(val)}
                          />
                        </View> : 
                        <>
                        <View style={{marginVertical:10}}>
                          <Text style={theme.applabel}>Duration</Text>
                          <Dropdown refval={duraDropdownRef} data={filterduid}  setValue={setDuid} disable={filterduid.length == 0 && true}/>
                        </View>
                        {
                          duid == 'MultipleDay' ?
                          <MultipleDay duid={duid} fdate={fdate} tdate={tdate} setFdate={setFdate} setTdate={setTdate} 
                          MulDaySH={MulDaySH} MulDayFH={MulDayFH} setDuration={setDuration} setDurmultiple={setDurmultiple}/>               
                          :
                          <View style={{marginVertical:10,width:'75%'}}>
                              <Text style={theme.applabel}>Date</Text>
                              <Datepicker
                                  datecount='1'
                                  date1={fdate}
                                  setState1={setFdate}
                                  style={{width:'45%'}}
                              />
                          </View>
                        }
                        </>
                      }                              
                    
                </Card>
                <Card style={theme.card} elevation={5}>
                    <Text style={theme.applabel}>Reason</Text>
                    <TextInput
                        keyboardType='default'
                        multiline={true}
                        numberOfLines={1}
                        textAlignVertical="top"
                        maxLength={100}
                        value={reason}
                        onChangeText={(val) => setReason(val)}                        
                    /> 
                </Card>
                <CustomButtons title="Submit" pressHandler={submitEntry} />
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default withTheme(Leave)
