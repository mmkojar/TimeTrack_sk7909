import React,{ useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Card, Title, Text, TextInput, Checkbox, withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpManual, getEmpManualDate, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';

const Manual = ({theme,navigation,route}) => {

    const {ecode} =  route.params;
    const result = useSelector((state) => state.employee.empmanual)
    const datefilter = useSelector((state) => state.employee.empmanualdate)
         
    const [duid, setDuid] = useState('');    
    const [fdate, setFdate] = useState('');
    const [shift, setShift] = useState('');
    const [login, setLogin] = useState(''); 
    const [logout, setLogout] = useState(''); 
    const [nextday, setNextDay] = useState(false);
    const [reason, setReason] = useState('');
    const [remark, setRemark] = useState('');
          
    const shiftcode = [];
    for(var i in result&&result.ShiftDetails) {
        if(result.ShiftDetails[i].Id == 'ShiftCode') {
          shiftcode.push(result.ShiftDetails[i].selection)
        }
    }
    const reasonmaster = [];
    for(var i in result&&result.ManualReasonMaster) {
        reasonmaster.push(result.ManualReasonMaster[i].selection)
    }

    // console.log("datefilter:--",datefilter);
    // console.log(Object.keys(datefilter)[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmpManual(ecode))
        dispatch(getEmpManualDate(ecode,fdate));
    },[])    
       
    const submitEntry = () => {
        
       /*  if(duid == 'MultipleDay' ? 
            fdate == '' || tdate == '' ||  reason == "" || duid == "" ||  duration == "" || durmultiple == "" : 
            duid == '' ||  fdate == "" || odstart == "" || odend == '' || reason == ""
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
            const FDate = moment(fdate).format('DD/MM/YYYY')
            const TDate = moment(tdate).format('DD/MM/YYYY')
            dispatch(insertAppForm(
              `ApplyODEntryEmployee?EmpCode=${ecode}&Duration=${duration ? duration : duid}&Durationmultple=${durmultiple}
              &ODStart=${odstart}&ODEnd=${odend}&NextDay=${nextday == true ? '1' : '0'}&Fromdate=${fdate}&Todate=${tdate ? tdate : fdate}&Reason=${reason}`
            ));
        } */
    }
    //  const hdate = date.split("~")[1];
    
  return (
    <ScrollView>
      <View style={theme.container}>
          <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
          <Card style={theme.card} elevation={5}>
            <Title style={theme.appheading}>Manual Entry Details</Title>
            {/* <View> */}
              <View style={{display:'flex',flexDirection:'row'}}>
                <View style={{width:'48%'}}>
                    <Text style={theme.applabel}>Select Date</Text>
                      <Datepicker
                            date1={fdate}
                            setState1={setFdate}
                      />
                </View>
                <View style={{marginLeft:10,width:'48%'}}>
                    <Text style={theme.applabel}>Select Shift</Text>
                    <Dropdown data={shiftcode} text="--Select--" setValue={setShift}/>
                    <Text style={{color:'red'}}>
                      {
                        shift == 'G' ?
                        result.ShiftDetails[1].selection : 
                        shift == 'G1' 
                        ? result.ShiftDetails[3].selection : ''
                      }

                    </Text>
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
                  status={nextday ? 'checked' : 'unchecked'}
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
          <CustomButtons title="Submit" pressHandler={submitEntry} />
      </View>
    </ScrollView>
  )
}

export default withTheme(Manual)
