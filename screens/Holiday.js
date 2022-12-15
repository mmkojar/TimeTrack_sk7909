import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getHolidaylist } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import LoopItems from './Reusable/LoopItems';
import moment from 'moment';

const Holiday = () => {

  const [theme,GlobalStyle] = useThemeStyle();
  const empcode = useSelector((state) => state.auth.empcode)
  const holidaylist = useSelector((state) => state.employee.holiday)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getHolidaylist(empcode));
    
  },[])

  const header = ['Date','Name','Optional'];

  return (
    <View style={GlobalStyle.dtcontainer}>
      <Dtheader headtitle={header} />
      <FlatList
          data={holidaylist && holidaylist.HolidayParamList}
          // numColumns={1}
          keyExtractor={(item,index) => index}
          renderItem={({item}) => (
              <LoopItems
                type='dt'
                dttable={
                  [
                    moment(item.HolidayDate).format('DD-MMM-YYYY'),
                    item.HolidayName,
                    item.OptionalHoliday
                  ]
                }
              />
          )}
      />
    </View>
  )
}

export default Holiday
