import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getHolidaylist } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import moment from 'moment';
import Nodatafound from './Reusable/Nodatafound';
import { DataTable } from 'react-native-paper';
import uuid from 'react-uuid';

const Holiday = () => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const holidaylist = useSelector((state) => state.employee.holiday)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getHolidaylist(empcode));
  },[empcode])

  const header = ['Date','Name','Optional'];

  return (
    <View style={theme.dtcontainer}>
      <Dtheader headtitle={header} />
      {
        holidaylist && holidaylist.HolidayParamList && holidaylist.HolidayParamList.length > 0 ?
          <FlatList
              data={holidaylist && holidaylist.HolidayParamList}              
              keyExtractor={() => uuid()}
              renderItem={({item,index}) => (
                  <DataTable.Row style={{backgroundColor:`${index % 2 ? theme.colors.accent : item.OptionalHoliday == 'Yes' ? 'green' : ''}`}}>
                      <DataTable.Cell textStyle={{fontSize:12,color:`${item.OptionalHoliday == 'Yes' && '#fff'}`}} style={{justifyContent:'flex-start'}}>{moment(item.HolidayDate).format('DD-MMM-YYYY')}</DataTable.Cell>
                      <DataTable.Cell textStyle={{fontSize:12,color:`${item.OptionalHoliday == 'Yes' && '#fff'}`}} style={{justifyContent:'center'}}>{item.HolidayName}</DataTable.Cell>
                      <DataTable.Cell textStyle={{fontSize:12,color:`${item.OptionalHoliday == 'Yes' && '#fff'}`}} style={{justifyContent:'flex-end'}}>{item.OptionalHoliday}</DataTable.Cell>
                  </DataTable.Row>
              )}
          />
        :
        <Nodatafound />
      }
     
    </View>
  )
}

export default Holiday
