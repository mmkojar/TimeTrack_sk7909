import React,{ useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getHolidaylist } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import moment from 'moment'

const Holiday = () => {

  const [theme,GlobalStyle] = useThemeStyle();
  const empcode = useSelector((state) => state.auth.empcode)
  const holidaylist = useSelector((state) => state.employee.holiday)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getHolidaylist(empcode));
    
  },[])

  return (
    <View style={[GlobalStyle.container,{marginVertical:0}]}>
      <DataTable>
        <DataTable.Header style={{backgroundColor:'#91c4f0'}}>
          <DataTable.Title textStyle={GlobalStyle.dtheader}>Date</DataTable.Title>
          <DataTable.Title textStyle={GlobalStyle.dtheader} style={{justifyContent:'center'}}>Name</DataTable.Title>
          <DataTable.Title  textStyle={GlobalStyle.dtheader} style={{justifyContent:'flex-end'}}>Optional</DataTable.Title>
        </DataTable.Header>
        <FlatList
            data={holidaylist.HolidayParamList}
            // numColumns={1}
            keyExtractor={(item,index) => index}
            renderItem={({item}) => (
                <DataTable.Row> 
                    <DataTable.Cell>{moment(item.HolidayDate).format('DD-MMM-YYYY')}</DataTable.Cell>
                    <DataTable.Cell style={{justifyContent:'center'}}>{item.HolidayName}</DataTable.Cell>
                    <DataTable.Cell style={{justifyContent:'flex-end'}}>{item.OptionalHoliday}</DataTable.Cell>
                </DataTable.Row>
            )}
        />
      </DataTable>
    </View>
  )
}

export default Holiday
