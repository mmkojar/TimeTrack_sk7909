import React,{ useState } from 'react'
import { View } from 'react-native'
import { Card, Title, Text, TextInput, Paragraph } from 'react-native-paper'
import { useSelector } from 'react-redux';
// import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment';
import Dropdown from '../../components/utils/Dropdown';
import CustomButtons from '../../components/utils/CustomButtons';

const Holiday = ({navigation,route}) => {

  const {ecode, theme} =  route.params;
  const holidaylist = useSelector((state) => state.employee.holiday)
  
  const filterYes = holidaylist.HolidayParamList.filter(holiday => {
    return holiday.OptionalHoliday == 'Yes'
  })  
  const getnames = [];
  filterYes.map(item => {
    getnames.push(`${item.HolidayName} -- ${moment(item.HolidayDate).format('DD-MM-YYYY')}`);
  })

  const [date, setDate] = useState(''); 

  const submitEntry = () => {

  }

  return (
    <View style={theme.container}>
        <Card style={theme.card} elevation={5}>          
          <Title style={{color:theme.colors.primary,fontSize:22}}>Authorities</Title>
          <View>
            <Title style={{fontSize:16,marginBottom:-5}}>Recommender : <Text style={{fontSize:14,textAlignVertical:'center'}}>Rajesh Tamore</Text></Title>
            <Title style={{fontSize:16}}>Sanctioner : <Text style={{fontSize:14,textAlignVertical:'center'}}>Rajesh Tamore</Text></Title>
          </View>
        </Card>
        <Card style={theme.card} elevation={5}>          
          <Title style={{color:theme.colors.primary,fontSize:22}}>Holiday Details</Title>
          <View>
            <Text></Text>
            <Text>Holiday Name</Text>
            <Dropdown data={getnames} text="Select" setValue={setDate}/>
            <Text></Text>
            <Text>Holiday Date</Text>            
            <TextInput
                value={date.split("--")[1]}
                style={[theme.textinput,{width:'80%',height:40}]}                
                disabled={true}
                placeholderTextColor={theme.colors.primary}
            />
            <Text></Text>
            <Text>Remark 100 (char)</Text> 
            <TextInput                   
              style={[theme.textinput,{width:'80%',height:0}]}               
              keyboardType='default'
              multiline={true}
              numberOfLines={1}
              maxLength={100}
              textAlignVertical="top"
            />
          </View>
        </Card>
        <CustomButtons title="Submit" pressHandler={submitEntry} style={{width:'50%',marginTop:10,alignSelf:'center'}}/>
    </View>
  )
}

export default Holiday
