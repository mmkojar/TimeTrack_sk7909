import React,{ useEffect, useState } from 'react'
import { View } from 'react-native'
import { Card, Title, Text, TextInput, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpWFH,getEmpAppsData, insertAppForm, fetchAxios } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import { GET_EMP_WFH } from '../../components/redux/actions/type';

const WFH = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empwfh)
      console.log("result:",result)
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
        // dispatch(getEmpWFH(ecode))
        // dispatch(getEmpAppsData(`GetHolidayForEmployee?EmpCode=${ecode}`,GET_EMP_WFH))
        fetchAxios(dispatch,`GetHolidayForEmployee?EmpCode=${ecode}`,GET_EMP_WFH)
    },[])    
    
    const [duid, setDuid] = useState('');
    const [fdate, setFdate] = useState(''); 
    const [tdate, setTdate] = useState(''); 
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
            dispatch(insertAppForm(`WFHApplyForEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}&Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Reason=${reason}`));            
        }
    }
    //  const hdate = date.split("~")[1];

  return (
    <View style={theme.container}>
        <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
        <Card style={theme.card} elevation={5}>          
          <Title style={{color:theme.colors.primary,fontSize:22}}>WFH Details</Title>
          <View>
            <Text style={theme.applabel}>Duration</Text>
            <Dropdown data={fiternames} text="--Select--" setValue={setDuid} />
            <View style={{marginVertical:10,width:'75%',display:'flex',flexWrap:"wrap",flexShrink:2}}>
                <Text style={theme.applabel}>Dates</Text>
                <Datepicker
                    datecount={duid == 'MultipleDay' ? '2' : '1'}
                    date1={fdate}
                    date2={tdate}
                    setState1={setFdate}
                    setState2={setTdate}
                    placeholder1="From Date"
                    placeholder2="To Date"
                    style={{width:'45%',height:45,fontSize:14,marginBottom:10}}
                    maxdate={new Date()}
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
        <CustomButtons title="Submit" pressHandler={submitEntry} style={{width:'50%',marginTop:10,alignSelf:'center'}}/>
    </View>
  )
}

export default withTheme(WFH)
