import React,{ useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Title, Text, TextInput, Checkbox, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpLeave, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import SelectDropdown from 'react-native-select-dropdown';

const Leave = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empleave)

    const dispatch = useDispatch();
    useEffect(() => {
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
    const taskDropdownRef = useRef();
    const duraDropdownRef = useRef();
    
    const filtertypes = [];
    const filtertask = [];
    const filterduid = [];
    const MulDaySH = [];
    const MulDayFH = [];
    for(var i in result&&result.Leave) {
      filtertypes.push(result.Leave[i].Name)
    }
    result&&result.Leave.filter((item,index) => {
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
        }
    }
  return (
    <ScrollView>
      <View style={theme.container}>
          <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
          <Card style={theme.card} elevation={5}>          
            <Title style={theme.appheading}>Leave Details</Title>            
              <View style={{display:'flex',flexDirection:'row'}}>
                <View style={{width:'48%'}}>
                    <Text style={theme.applabel}>Leave Type</Text>
                    <SelectDropdown                      
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
                  <View style={{marginVertical:duid == 'MultipleDay' ? 10 : 0,width:'75%'}}>
                      <Text style={theme.applabel}>{duid == 'MultipleDay' ? 'Dates' : 'Date'}</Text>
                      <Datepicker
                          datecount={duid == 'MultipleDay' ? '2' : '1'}
                          date1={fdate}
                          date2={tdate}
                          setState1={setFdate}
                          setState2={setTdate}
                          style={{width:'45%',marginBottom:duid == 'MultipleDay' ? 10 : 0}}
                      />
                  </View>
                  {
                      duid == 'MultipleDay' &&                
                        <View style={{alignItems:'flex-end',marginTop:-120}}>
                            <Dropdown data={MulDaySH}  setValue={setDuration} style={{width:'65%',marginBottom:10}}/>
                            <Dropdown data={MulDayFH}  setValue={setDurmultiple} style={{width:'65%'}}/>
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
                  maxLength={100}
                  textAlignVertical="top"
                  value={reason}
                  onChangeText={(val) => setReason(val)}
              /> 
          </Card>
          <CustomButtons title="Submit" pressHandler={submitEntry} />
      </View>
    </ScrollView>
  )
}

export default withTheme(Leave)
