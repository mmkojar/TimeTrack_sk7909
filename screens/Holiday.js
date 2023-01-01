import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getHolidaylist } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import LoopItems from './Reusable/LoopItems';
import moment from 'moment';
import Nodatafound from './Reusable/Nodatafound';

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
        holidaylist && holidaylist.length > 0 ?
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
        :
        <Nodatafound />
      }
     
    </View>
  )
}

export default Holiday
