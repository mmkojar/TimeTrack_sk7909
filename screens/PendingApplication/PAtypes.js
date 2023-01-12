import React, { useEffect, memo } from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-paper';
import {  useDispatch, useSelector } from 'react-redux'
import { getPendingCount, getCancelCount, getHODPendingCount, getHODCancelCount } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import LoopItems from '../Reusable/LoopItems';
import { useIsFocused } from '@react-navigation/native';

const PAtypes = ({navigation,route}) => {

  const [theme] = useThemeStyle();
  const { ecode, api1, api2, type } = route.params;
  
  const pdobject = {'Total Pending Application':'0'};
  const canobject = {'Total Pending Application':'0'};
  
  if(type == 'self') {
    const pdresult = useSelector((state) => state.employee.pdcount)
    const canresult = useSelector((state) => state.employee.cancount)
    for(var i in pdresult && pdresult.GetEmployeePendingCount) {
      Object.assign(pdobject,...pdresult.GetEmployeePendingCount[i]['Pending Application']);
    }
    for(var i in canresult && canresult.GetEmployeeCancellationPendingCount) {
      Object.assign(canobject,...canresult.GetEmployeeCancellationPendingCount[i]['Cancellation Pending Application']);
    }
  }
  else {
    const hodpdresult = useSelector((state) => state.employee.hodpdcount)
    const hodcanresult = useSelector((state) => state.employee.hodcancount)
    for(var i in hodpdresult && hodpdresult.GetHODHomePageCount) {
      Object.assign(pdobject,...hodpdresult.GetHODHomePageCount[i]['Pending Application']);
    }
    for(var i in hodcanresult && hodcanresult.GetHODHomePageCancellationPendingCount) {
      Object.assign(canobject,...hodcanresult.GetHODHomePageCancellationPendingCount[i]['Cancellation Pending Application']);
    }
  }
  
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if(type == 'self') {
      dispatch(getPendingCount(api1,ecode));
      dispatch(getCancelCount(api2,ecode));
    }
    else {
      dispatch(getHODPendingCount(api1,ecode));
      dispatch(getHODCancelCount(api2,ecode));
    }
  },[isFocused,ecode,api1,api2])

  return (
    <View style={theme.container}>
          <LoopItems 
                type="card"
                navigation={navigation}
                naviTo="PAList"
                naviObj={{
                  ecode:ecode,
                  hodtype:type,
                  pdtype:"Pending Approval"
                }}
                // ctitle={<Avatar.Text size={30} label={`${pdobject['Total Pending Application']}`} />}
                ctitle={`Pending Approvals ${pdobject['Total Pending Application']}`}
          />
          <LoopItems
                type="card" 
                navigation={navigation} 
                naviTo="PAList"
                naviObj={{
                  ecode:ecode,
                  hodtype:type,
                  pdtype:"Pending Cancellation"
                }}                
                ctitle={`Pending Cancellation ${canobject['Total Pending Application']}`}
          />
    </View>
  )
}

export default memo(PAtypes)