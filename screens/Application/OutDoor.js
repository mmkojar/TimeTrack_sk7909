import React,{ useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Title, Text, TextInput, Checkbox, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpOD, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';

const OutDoor = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empod)
      
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
        dispatch(getEmpOD(ecode))
    },[])    
    
    const [duid, setDuid] = useState('');
    const [duration, setDuration] = useState(''); 
    const [durmultiple, setDurmultiple] = useState(''); 
    const [odstart, setOdstart] = useState(''); 
    const [odend, setOdend] = useState(''); 
    const [nextday, setNextDay] = useState(false); 
    const [fdate, setFdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [tdate, setTdate] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [reason, setReason] = useState(''); 
    
    const submitEntry = () => {
        
        if(duid == 'MultipleDay' ? 
            reason == "" || duid == "" ||  duration == "" || durmultiple == "" : 
            duid == '' ||  odstart == "" || odend == '' || reason == ""
        ){
            Toast.show({
                type: 'error',
                text1:'Fill All fields',
            });
        }
        else if(duid == 'MultipleDay' ? (fdate > tdate) : (odstart > odend)) {
            Toast.show({
                type: 'error',
                text1:`Incorrect ${duid == 'MultipleDay' ? 'Dates' : 'Time'}`,
            });
        }
        else {
            dispatch(insertAppForm(
              `ApplyODEntryEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}
              &ODStart=${odstart}&ODEnd=${odend}&NextDay=${nextday == true ? '1' : '0'}&Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Reason=${reason}`
            ));
        }
    }
    //  const hdate = date.split("~")[1];
  return (
    <ScrollView>
      <View style={theme.container}>
          <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
          <Card style={theme.card} elevation={5}>          
            <Title style={theme.appheading}>OD Details</Title>
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
                      style={{width:'45%',marginBottom:duid == 'MultipleDay' ? 10 : 0}}
                  />
              </View>
              {
                  duid == 'MultipleDay' ?                
                    <View style={{alignItems:'flex-end',marginTop:-120}}>
                        <Dropdown data={MulDaySH} text="--Select--" setValue={setDuration} style={{width:'65%',marginBottom:10}}/>
                        <Dropdown data={MulDayFH} text="--Select--" setValue={setDurmultiple} style={{width:'65%'}}/>
                    </View> 
                  :
                  <>
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
                        status={nextday ? 'checked' : 'unchecked'}
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
    </ScrollView>
  )
}

export default withTheme(OutDoor)
