import React,{ useEffect, useState } from 'react'
import { ScrollView,KeyboardAvoidingView,Platform, TouchableWithoutFeedback, View, Keyboard } from 'react-native'
import { Card, Title, Text, TextInput, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpWFH, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import MultipleDay from '../Reusable/MultipleDay';

const WFH = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empwfh)
    const checkKey = result && Object.keys(result)[0];

    const filterDur = (checkKey !== 'msg')&&result &&result.Duration.filter(item => {
        return item.selection == '1'
    })
    
    const fiternames = [];
    const MulDaySH = [];
    const MulDayFH = [];
    for(var i in filterDur) {
        fiternames.push(filterDur[i].Id)
        filterDur[i].MultipleDayDuration.filter(item => {
            if((item.selection == '1' && item.Id == 'MultipleDaySecondHalf') || item.Id == 'MultipleFullDay') {
                MulDaySH.push(item.Id)
            }
            if((item.selection == '1' && item.Id == 'MultipleDayFirstHalf') || item.Id == 'MultipleFullDay') {
                MulDayFH.push(item.Id)
            }
        })
    }

    const dispatch = useDispatch();
    useEffect(() => {        
        if(checkKey == 'msg') {
            navigation.goBack();
            Toast.show({ type: 'error', text1:'NO Record found For WFH' });
        }              
        dispatch(getEmpWFH(ecode))
    },[])    
    
    const [duid, setDuid] = useState('');
    const [fdate, setFdate] = useState(moment(new Date()).format('DD/MM/YYYY')); 
    const [tdate, setTdate] = useState(moment(new Date()).format('DD/MM/YYYY')); 
    const [duration, setDuration] = useState(''); 
    const [durmultiple, setDurmultiple] = useState(''); 
    const [reason, setReason] = useState('');
       
    const submitEntry = () => {
        
        if(duid == 'MultipleDay' ? 
            reason == "" || duid == "" ||  duration == "" || durmultiple == "" : 
            reason == "" || duid == "" 
        ){
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        else if(duid == 'MultipleDay' ? (fdate > tdate) : !fdate) {
            Toast.show({
                type: 'error',
                text1:'Incorrect Dates',
            });
        }
        else {
            dispatch(insertAppForm(
                `WFHApplyForEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}
                &Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Reason=${reason}`
            ));
            setDuid('')
            setDuration('')
            setDurmultiple('')
            setFdate('')
            setTdate('')
            setReason('')
        }
    }
    //  const hdate = date.split("~")[1];

  return (
    <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"} style={{flex:1}} 
         keyboardVerticalOffset={Platform.OS === 'ios' && 50}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={theme.container}>
                    <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
                    <Card style={theme.card} elevation={5}>          
                    <Title style={theme.appheading}>WFH Details</Title>
                    <View>
                        <Text style={theme.applabel}>Duration</Text>
                        <Dropdown data={fiternames}  setValue={setDuid} />
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
                    </View>
                    </Card>
                    <Card style={theme.card} elevation={5}>
                        <Text style={theme.applabel}>WFH Reason</Text>
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

export default withTheme(WFH)
