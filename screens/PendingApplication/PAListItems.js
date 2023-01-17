import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getPendingList, getCancelList, getHODPendingList, getHODCancelList } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import LoopItems from '../Reusable/LoopItems';
import Nodatafound from '../Reusable/Nodatafound';
import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-uuid';

const PAListItems = ({navigation,route}) => {

  const [theme] = useThemeStyle();
  const { ecode, hodtype, apptype, pdtype } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:apptype,
    });
  }, [navigation]);

  let palistarray = ''; 

  if(hodtype === 'self' && pdtype === "Pending Approval") {
    const pdresult = useSelector((state) => state.employee.pdlist)
    palistarray = pdresult && pdresult.GetPendingApplicationList_App;
  }
  else if(hodtype === 'self' && pdtype === "Pending Cancellation") {
    const canresult = useSelector((state) => state.employee.canlist)
    palistarray = canresult && canresult.PendingLeaveApplicationsForCancellation
  }
  else if(hodtype === 'team' && pdtype === "Pending Approval") {

    const hodpdresult = useSelector((state) => state.employee.hodpdlist)
    palistarray = hodpdresult && hodpdresult.GetPendingApplicationList_App
  }
  else if(hodtype === 'team' && pdtype === "Pending Cancellation") {
    const hodcanresult = useSelector((state) => state.employee.hodcanlist)
    palistarray = hodcanresult && hodcanresult.PendingLeaveApplicationsForCancellation
  }

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if(hodtype === 'self' && pdtype === "Pending Approval") {
      dispatch(getPendingList('GetPendingApplicationListForSelf',ecode,apptype));      
    }
    else if(hodtype === 'self' && pdtype === "Pending Cancellation") {
      dispatch(getCancelList('GetCancellationApplicationSelf',ecode,apptype));
    }
    else if(hodtype === 'team' && pdtype === "Pending Approval") {
      dispatch(getHODPendingList('GETHODPendingApplicationList',ecode,apptype));
    }
    else if(hodtype === 'team' && pdtype === "Pending Cancellation") {
      dispatch(getHODCancelList('GETHODCancellationPendingApplicationList',ecode,apptype));
    }
  },[isFocused])
 
  const filterkey = palistarray && palistarray.length>0 && Object.keys(palistarray[0]).filter(item => (item !== 'Recommended_Status' && item !== 'Sanctioned_Status'));
  
  const finalplist = palistarray && palistarray.map((obj) => {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
          if (filterkey.includes(key) && obj.hasOwnProperty(key)) {
              newObj[key] = obj[key];
          }
      });
      return newObj;
  });

  return (
    <View style={theme.dtcontainer}>
      {
        finalplist && finalplist.length > 0 ?
        <>
          <Dtheader headtitle={filterkey && filterkey.filter(item => item !== 'Id')} />
          <FlatList
              data={finalplist && finalplist}
              keyExtractor={() => uuid()}
              renderItem={({item,index}) => (
                <LoopItems
                  type='dt'
                  navigation={hodtype == 'team' && navigation}
                  naviTo={hodtype == 'team' && "PAItemDetail"}
                  naviObj={hodtype == 'team' && {
                      ecode:ecode,
                      apptype:apptype,
                      pdtype:pdtype,
                      id:item.Id
                  }}
                  indexkey={index}
                  dttable={Object.values(item).filter((it,index) => index !== 0)}
                />
              )}
          />
        </>
        : <Nodatafound/>
      }
      
      
    </View>
  )
}

export default PAListItems
