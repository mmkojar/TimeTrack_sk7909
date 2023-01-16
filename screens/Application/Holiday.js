import React,{ useEffect, useState } from 'react'
import { Keyboard, Platform, View,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback } from 'react-native'
import { Card, Title, Text, TextInput,withTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';
import Authorities from '../Reusable/Authorities';
import { getEmpHoliday, insertAppForm } from '../../components/redux/actions/employeeActions';
import Toast from 'react-native-toast-message';

const Holiday = ({theme,navigation,route}) => {
  
  const {ecode} =  route.params;
  
  const result = useSelector((state) => state.employee.empholiday)
  const checkKey = result && Object.keys(result)[0];

  const filterYes = [];
  for(var i in (checkKey !== 'msg') && result && result.OptionalHolidays) {
    filterYes.push(result.OptionalHolidays[i].HolidayName);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if(checkKey == 'msg') {
        navigation.goBack();
        Toast.show({ type: 'error', text1:'NO Record found For Holiday' });
    }
    dispatch(getEmpHoliday(ecode))
  },[])

  const [holname, setHolname] = useState(''); 
  const hoilidayRef = React.useRef();
  const [remark, setRemark] = useState(''); 
  const hdate = holname.split("~")[1];
  let fdate = hdate&&hdate.split('-');
  let monthno = fdate && moment().month(fdate[1]).format('MM');
  let newdate = fdate && (fdate[0]+'-'+monthno+'-'+fdate[2])
  
  const submitEntry = () => {
    if(holname == '' || remark == "") {
      Toast.show({
        type: 'error',
        text1:'Enter Date and Remark',
      });
    }
    else {
      dispatch(insertAppForm(`ApplyHolidayEmployee?EmpCode=${ecode}&HolidayName=${holname}&HolidayDate=${newdate}&Remark=${remark}`));
      hoilidayRef.current.reset();
      setHolname('')
      setRemark('')
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
                <Title style={theme.appheading}>Holiday Details</Title>
                <View>
                  <Text style={theme.applabel}>Holiday Name</Text>
                  <Dropdown refval={hoilidayRef} data={filterYes}  setValue={setHolname} />
                  <View style={{marginVertical:10}}>
                    <Text style={theme.applabel}>Holiday Date</Text>            
                    <TextInput
                        value={newdate&&newdate}
                        style={{height:40,backgroundColor:theme.colors.accent}}
                        disabled={true}
                    />
                  </View>
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
                </View>
              </Card>
              <CustomButtons title="Submit" pressHandler={submitEntry} style={{width:'50%',marginTop:10,alignSelf:'center'}}/>
          </View>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>    
    </ScrollView>
  )
}

export default withTheme(Holiday)
