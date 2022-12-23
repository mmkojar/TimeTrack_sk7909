import React,{ useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Title, Text, TextInput, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpLWP, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';

const LWP = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.emplwp)
      
    const filterDur = result && result.Duration.filter(item => {
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
        dispatch(getEmpLWP(ecode))
    },[])    
    
    const [duid, setDuid] = useState('');
    const [fdate, setFdate] = useState(); 
    const [tdate, setTdate] = useState(); 
    const [duration, setDuration] = useState(''); 
    const [durmultiple, setDurmultiple] = useState(''); 
    const [reason, setReason] = useState(''); 
       
    const submitEntry = () => {
        
        if(duid == 'MultipleDay' ? 
            fdate == '' || tdate == '' ||  reason == "" || duid == "" ||  duration == "" || durmultiple == "" : 
            fdate == '' ||  reason == "" || duid == "" 
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
            const FDate = moment(fdate).format('DD/MM/YYYY')
            const TDate = moment(tdate).format('DD/MM/YYYY')
            dispatch(insertAppForm(`LWPApplyForEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}&Fromdate=${FDate}&Todate=${TDate ? TDate : FDate}&Reason=${reason}`));            
        }
    }
    //  const hdate = date.split("~")[1];

  return (
    <ScrollView>
        <View style={theme.container}>
            <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
            <Card style={theme.card} elevation={5}>          
            <Title style={theme.appheading}>LWP Details</Title>
            <View>
                <Text style={theme.applabel}>Duration</Text>
                <Dropdown data={fiternames} text="--Select--" setValue={setDuid} />
                <View style={{marginVertical:10,width:'75%'}}>
                    <Text style={theme.applabel}>{duid == 'MultipleDay' ? 'Dates' : 'Date'}</Text>
                    <Datepicker
                        datecount={duid == 'MultipleDay' ? '2' : '1'}
                        date1={fdate}
                        date2={tdate}
                        setState1={setFdate}
                        setState2={setTdate}
                        placeholder1="From Date"
                        placeholder2="To Date"
                        style={{width:'45%',marginBottom:10}}
                    />
                </View>
                {
                    duid == 'MultipleDay' &&
                    <View style={{alignItems:'flex-end',marginTop:-120}}>
                        <Dropdown data={MulDaySH} text="--Select--" setValue={setDuration} style={{width:'65%',marginBottom:10}}/>
                        <Dropdown data={MulDayFH} text="--Select--" setValue={setDurmultiple} style={{width:'65%'}}/>
                    </View>
                }
            </View>
            </Card>
            <Card style={theme.card} elevation={5}>
                <Text style={theme.applabel}>LWP Reason</Text>
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

export default withTheme(LWP)
