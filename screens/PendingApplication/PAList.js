import React, { useEffect, memo } from 'react'
import { View } from 'react-native'
import { DataTable, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getPendingCount, getCancelCount, getHODPendingCount, getHODCancelCount } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import Nodatafound from '../Reusable/Nodatafound';

const PAList = ({navigation,route}) => {

  const [theme] = useThemeStyle();
  const { ecode, hodtype, pdtype } = route.params;
  
  let paarray = ''; 

  if(hodtype === 'self' && pdtype === "Pending Approval") {
    const pdresult = useSelector((state) => state.employee.pdcount)
    paarray = pdresult && pdresult.GetEmployeePendingCount && pdresult.GetEmployeePendingCount[0]['Pending Application'];
  }
  else if(hodtype === 'self' && pdtype === "Pending Cancellation") {
    const canresult = useSelector((state) => state.employee.cancount)
    paarray = canresult && canresult.GetEmployeeCancellationPendingCount && canresult.GetEmployeeCancellationPendingCount[0]['Cancellation Pending Application'];
  }
  else if(hodtype === 'team' && pdtype === "Pending Approval") {

    const hodpdresult = useSelector((state) => state.employee.hodpdcount)    
    paarray = hodpdresult && hodpdresult.GetHODHomePageCount && hodpdresult.GetHODHomePageCount[0]['Pending Application']
  }
  else if(hodtype === 'team' && pdtype === "Pending Cancellation") {
    const hodcanresult = useSelector((state) => state.employee.hodcancount)    
    paarray = hodcanresult && hodcanresult.GetHODHomePageCancellationPendingCount && hodcanresult.GetHODHomePageCancellationPendingCount[0]['Cancellation Pending Application']
  }

  const dispatch = useDispatch();   

  useEffect(() => {
    if(hodtype === 'self' && pdtype === "Pending Approval") {
      dispatch(getPendingCount('GetEmployeePendingCount',ecode));      
    }
    else if(hodtype === 'self' && pdtype === "Pending Cancellation") {
      dispatch(getCancelCount('GetEmployeeCancellationPendingCount',ecode));     
    }
    else if(hodtype === 'team' && pdtype === "Pending Approval") {
      dispatch(getHODPendingCount('GetHODHomePagePendingCount',ecode));
    }
    else if(hodtype === 'team' && pdtype === "Pending Cancellation") {
      dispatch(getHODCancelCount('GetHODHomePageCancellationPendingCount',ecode));
    }
  },[])    

    let paresult = {};
    paarray && paarray.map((pa) => {
      for(let i in pa) {
        if(pa[i] !== '0' && i !== 'Total Pending Application') {
            Object.assign(paresult,pa)
        }
      }
    });
    let pafinal = Object.entries(paresult);

    const pressHandler = (AppType) => {
        navigation.navigate('PAListItem', {
            ecode:ecode,
            hodtype: hodtype,
            apptype: AppType.replace(' ',''),
            pdtype:pdtype
        })
    }

  return (
    <View style={theme.dtcontainer}>
        <Dtheader headtitle={[pdtype]}/>
        {
          pafinal.length > 0 ?
            pafinal && pafinal.map(([key, value]) => {              
                  return (
                      <DataTable.Row key={key} onPress={() =>pressHandler(key)}> 
                          <DataTable.Cell>{key}</DataTable.Cell>
                          <DataTable.Cell>{value}</DataTable.Cell>
                          <IconButton size={22} icon="arrow-right" color={theme.colors.primary} onPress={() =>pressHandler(key)} />
                      </DataTable.Row>
                  )
            })
          : <Nodatafound />
        }
    </View>
  )
}

export default memo(PAList)