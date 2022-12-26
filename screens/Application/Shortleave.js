import React,{ useEffect, useState } from 'react'
import { View, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Card, Title, Text, TextInput, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpSL, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';

const Shortleave = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empsl)
              
    const fiternames = [];
    for(var i in result && result.Duration) {
        fiternames.push(result.Duration[i].selection)        
    }
    const fitertypes = [];
    for(var i in result && result.Type) {
      fitertypes.push(result.Type[i].selection)
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmpSL(ecode))
    },[])    
    
    const [fdate, setFdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [duration, setDuration] = useState('');
    const [intime, setIntime] = useState('');
    const [outtime, setOuttime] = useState('');
    const [sltype, setSltype] = useState('');
    const [reason, setReason] = useState('');

    const submitEntry = () => {
        if(duration == '' ||  intime == "" || outtime == "" ||  sltype == "" || reason == ""){
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        else if(intime > outtime) {
            Toast.show({
                type: 'error',
                text1:'Incorrect Time',
            });
        }
        else {            
            dispatch(insertAppForm(`ShortLeaveApplyForEmployee?EmpCode=${ecode}&Duration=${duration}&SLType=${sltype}&Fromdate=${fdate}&Todate=${fdate}&Reason=${reason}&Intime=${intime}&Outtime=${outtime}`));            
            setFdate('')
            setDuration('')
            setSltype('')
            setIntime('')
            setOuttime('')
            setReason('')
        }
    }
    //  const hdate = date.split("~")[1];

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={theme.container}>
                <Authorities recom={result&&result.Recommender} sanc={result&&result.Sanctioner} />
                <Card style={theme.card} elevation={5}>
                  <Title style={theme.appheading}>Short Leave Entry Details</Title>
                  <View style={{display:'flex',flexDirection:'row'}}>
                      <View style={{width:'35%'}}>
                        <Text style={theme.applabel}>Select Date</Text>              
                        <Datepicker
                            date1={fdate}
                            setState1={setFdate}              
                        />
                      </View>
                      <View style={{marginLeft:10,width:'62%'}}>
                        <Text style={theme.applabel}>Duration</Text>
                        <Dropdown data={fiternames}  setValue={setDuration} />
                      </View>
                  </View>
                  <View style={{marginVertical:10,display:'flex',flexDirection:'row'}}>
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
                  </View>
                  <Text style={theme.applabel}>SL Type</Text>
                  <Dropdown data={fitertypes}  setValue={setSltype} style={{width:'48%'}}/>
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
                <CustomButtons title="Submit" pressHandler={submitEntry} />
            </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default withTheme(Shortleave)
