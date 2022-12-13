import React,{useEffect, useState} from 'react'
import { View, FlatList } from 'react-native'
import { Card, IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getHodReportee } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';

const TeamAttendance = () => {

  const [theme,GlobalStyle] = useThemeStyle();  
  const empcode = useSelector((state) => state.auth.empcode)
  const reportee = useSelector((state) => state.employee.hodreportee)
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHodReportee(empcode));
    
  },[])

  const pressHandler = () => {
    
  }

  return (
    <View style={GlobalStyle.container}>       
        {/* <FlatList
            data={reportee.GetHODReporteeList}
            keyExtractor={(item,index) => index}
            renderItem={({item}) => (
              <Card.Title 
                  style={GlobalStyle.cardTitle}
                  title={item.Reportee['Reportee Name']}
                  titleStyle={{fontSize:18}}
                  // right={(props) => <IconButton {...props} size={30} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item)} />}
              />
        )}
        />   */}              
  </View>
  )
}

export default TeamAttendance
