import React,{ useEffect, useRef, useState } from 'react'
import { Platform, ScrollView,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { Card, Title, Text, TextInput, Checkbox, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpOD, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import MultipleDay from '../Reusable/MultipleDay';
import useMultiple from '../../components/hooks/useMultiple';

const OutDoor = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empod)
    const { fiternames, MulDaySH, MulDayFH, checkKey } = useMultiple(result&&result);

    const dispatch = useDispatch();
    useEffect(() => {
        if(checkKey == 'msg') {
            navigation.goBack();
            Toast.show({ type: 'error', text1:'NO Record found For OutDoor' });
        }  
        dispatch(getEmpOD(ecode))
    },[])    
    
    const [duid, setDuid] = useState('');
    const [duration, setDuration] = useState(''); 
    const durationRef = useRef();
    const [durmultiple, setDurmultiple] = useState(''); 
    const [odstart, setOdstart] = useState(''); 
    const [odend, setOdend] = useState(''); 
    const [nextday, setNextDay] = useState(false); 
    const [fdate, setFdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [tdate, setTdate] = useState('');
    const [reason, setReason] = useState(''); 
    
    const submitEntry = () => {
        
        var vfdate = fdate.split("/").reverse().join("-");
        var vtdate = tdate && tdate.split("/").reverse().join("-");
    
        let isBefore = moment(vfdate).isBefore(vtdate);

        if(duid == 'MultipleDay' ? 
            reason == "" || duid == "" ||  duration == "" || durmultiple == "" : 
            duid == '' ||  odstart == "" || odend == '' || reason == ""
        ){
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        else if(duid == 'MultipleDay' ? (isBefore === false) : !fdate) {
            Toast.show({
                type: 'error',
                text1:'Incorrect Dates',
            });
        }
        else {
            dispatch(insertAppForm(
              `ApplyODEntryEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}&ODStart=${odstart}&ODEnd=${odend}&NextDay=${nextday == true ? '1' : '0'}&Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Reason=${reason}`
            ));
            durationRef.current.reset()
            setDuid('')
            setOdstart('')
            setOdend('')
            setNextDay(false)
            setReason('')
            // setFdate('')
            // setTdate('')
        }
    }
    //  const hdate = date.split("~")[1];
    
  return (
    <ScrollView>
         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : ""} style={{flex:1}} 
         keyboardVerticalOffset={Platform.OS === 'ios' && 50}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={theme.container}>
                <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
                <Card style={theme.card} elevation={5}>          
                    <Title style={theme.appheading}>OD Details</Title>
                    <View>
                    <Text style={theme.applabel}>Duration</Text>
                    <Dropdown refval={durationRef} data={fiternames}  setValue={setDuid} />
                    {
                        duid == 'MultipleDay' ?
                        <MultipleDay duid={duid} fdate={fdate} tdate={tdate} setFdate={setFdate} setTdate={setTdate} 
                        MulDaySH={MulDaySH} MulDayFH={MulDayFH} setDuration={setDuration} setDurmultiple={setDurmultiple}/>               
                        :
                        <>
                        <View style={{marginVertical:10,width:'75%'}}>
                            <Text style={theme.applabel}>Date</Text>
                            <Datepicker
                                datecount='1'
                                date1={fdate}
                                setState1={setFdate}
                                style={{width:'45%'}}
                            />
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <View style={{width:'48%'}}>
                                <Text style={theme.applabel}>Start Time</Text>              
                                <Datepicker
                                    date1={odstart}
                                    mode="time"
                                    setState1={setOdstart}                    
                                />
                            </View>
                            <View style={{marginLeft:10,width:'48%'}}>
                                <Text style={theme.applabel}>End Time</Text>
                                <Datepicker
                                    date1={odend}
                                    setState1={setOdend}
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
                        </>
                    }                        
                    </View>
                </Card>
                <Card style={theme.card} elevation={5}>
                    <Text style={theme.applabel}>OD Reason</Text>
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default withTheme(OutDoor)
