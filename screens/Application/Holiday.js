import React,{ useEffect, useState } from 'react'
import { View } from 'react-native'
import { Card, Title, Text, TextInput,withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpAppsData, getEmpHoliday, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';
import { GET_EMP_HOLIDAY } from '../../components/redux/actions/type';

const Holiday = ({theme,navigation,route}) => {
  
  const {ecode} =  route.params;
  
  const result = useSelector((state) => state.employee.empholiday)
  
  const filterYes = [];
  for(var i in result && result.OptionalHolidays) {
    filterYes.push(result.OptionalHolidays[i].HolidayName);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getEmpHoliday(ecode))
    dispatch(getEmpAppsData(`GetHolidayForEmployee?EmpCode=${ecode}`,GET_EMP_HOLIDAY))
  },[])

  const [holname, setHolname] = useState(''); 
  const [remark, setRemark] = useState(''); 
  
  const submitEntry = () => {
    if(holname == '' || remark == "") {
      Toast.show({
        type: 'error',
        text1:'Enter Date and Remark',
      });
    }
    else {
      dispatch(insertAppForm(`ApplyHolidayEmployee?EmpCode=${ecode}&HolidayName=${holname}&HolidayDate=${moment(holname).format('DD-MM-YYYY')}&Remark=${remark}`));
      setHolname('')
      setRemark('')
    }
  }

  const hdate = holname.split("~")[1];

  return (
    <View style={theme.container}>
        <Authorities recom={result && result.Recommender} sanc={result && result.Sanctioner} />
        <Card style={theme.card} elevation={5}>          
          <Title style={{color:theme.colors.primary,fontSize:22}}>Holiday Details</Title>
          <View>
            <Text style={theme.applabel}>Holiday Name</Text>
            <Dropdown data={filterYes} text="--Select--" setValue={setHolname} />
            <View style={{marginVertical:10}}>
              <Text style={theme.applabel}>Holiday Date</Text>            
              <TextInput
                  value={hdate && moment(hdate).format('DD-MM-YYYY')}
                  style={{height:40,backgroundColor:theme.colors.accent}}
                  disabled={true}
              />
            </View>
            <Text style={theme.applabel}>Remark 100 (char)</Text>
            <TextInput
              keyboardType='default'
              multiline={true}
              numberOfLines={1}
              maxLength={100}
              textAlignVertical="top"
              value={remark}
              onChangeText={(val) => setRemark(val)}
            />
          </View>
        </Card>
        <CustomButtons title="Submit" pressHandler={submitEntry} style={{width:'50%',marginTop:10,alignSelf:'center'}}/>
    </View>
  )
}

export default withTheme(Holiday)
