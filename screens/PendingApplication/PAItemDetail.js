import React,{ useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, TextInput, withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getDetailHODList, addLeaveaction } from '../../components/redux/actions/employeeActions'
import CustomButtons from '../../components/utils/CustomButtons';
import DetailScreen from '../Reusable/DetailScreen';
import Toast from 'react-native-toast-message';

const PAItemsDetail = ({theme,navigation,route}) => {

    const { ecode, id, apptype, pdtype } = route.params;

    const result = useSelector((state) => state.employee.detailhodlist)
    const entries = result && result.GetDetailedRegisterForHOD && Object.entries(result.GetDetailedRegisterForHOD[0]);
    const dispatch = useDispatch();
    
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:apptype,
      });
    }, [navigation]);

    useEffect(() => {
        dispatch(getDetailHODList(ecode,id,apptype));
    },[id])
    
    const submitres = result && result.GetDetailedRegisterForHOD && result.GetDetailedRegisterForHOD[0];
    const [rejreason, setRejreason] = useState('');
    const [boxvisible, setBoxVisible] = useState(false);

    const redirect = (type,text) => {
      navigation.goBack();
      Toast.show({
        type:type,
        text1:text
      })
    }
    
    const pressHandler = (type) => {
      if(type == '1') {
        if(pdtype == 'Pending Approval') {
             dispatch(addLeaveaction(
              `GETHODPendingApplicationApproved?EmpCode=${ecode}&ID=${submitres.Id}&AppType=${apptype}&RecommendedStatus=${submitres.Recommended_Status}&Approve=1&RejectReason=`
            ));
            redirect('success',`${apptype} Leave Approved`);
        }
        else {
           dispatch(addLeaveaction(
            `GETHODCancellationPendingApplicationApproved?EmpCode=${ecode}&ID=${submitres.Id}&AppType=${apptype}&Approve=1&RejectReason=`
          ));
          redirect('success',`${apptype} Leave Approved`);
        }
       
      }
      else {
        setBoxVisible(true);
      }
    }

    const submitReject = () => {
      if(rejreason == "") {
        Toast.show({ type:'error', text1:'Rejection Reason is Required' })
      }
      else {
        if(pdtype == 'Pending Approval') {
          dispatch(addLeaveaction(
            `GETHODPendingApplicationApproved?EmpCode=${ecode}&ID=${submitres.Id}&AppType=${apptype}&RecommendedStatus=${submitres.Recommended_Status}&Approve=0&RejectReason=${rejreason}`
          ));
          redirect('error',`${apptype} Leave Rejected`);
        }
        else {
          dispatch(addLeaveaction(
            `GETHODCancellationPendingApplicationApproved?EmpCode=${ecode}&ID=${submitres.Id}&AppType=${apptype}&Approve=0&RejectReason=${rejreason}`
          ));
          redirect('error',`${apptype} Leave Rejected`);
        }
      }      
    }

    return (
      <View style={theme.container}>
        <DetailScreen entries={entries} title={apptype} type="pa" />
        <Portal>
          <Modal visible={boxvisible} onDismiss={() => setBoxVisible(false)} contentContainerStyle={{backgroundColor:'#ffffff',borderRadius:5,padding:14,marginHorizontal:40}}>
              <Text style={{color:theme.colors.primary,fontSize:20,marginBottom:10}}>Enter Reject Reason</Text>
              <TextInput
                style={[theme.textinput,{height:0}]}
                keyboardType='default'
                value={rejreason}
                multiline={true}
                numberOfLines={4}
                maxLength={100}
                textAlignVertical="top"
                onChangeText={val => setRejreason(val)}
              />
            <CustomButtons title="Submit" pressHandler={submitReject}></CustomButtons>
          </Modal>
        </Portal>
          {
            result && result.GetDetailedRegisterForHOD && result.GetDetailedRegisterForHOD.length > 0 &&
              <View style={styles.action}>
                <View style={{flex: 1}}>
                  <CustomButtons title="Reject" pressHandler={() => pressHandler('0')}  style={{width:'100%',backgroundColor:'red'}}></CustomButtons>             
                </View>
                <View style={{marginHorizontal:40}} />
                <View style={{flex: 1}}>
                  <CustomButtons title="Approve" pressHandler={() => pressHandler('1')}  style={{width:'100%',backgroundColor:'green'}}></CustomButtons>
                </View>
              </View>
          }
                                          
      </View>
    )
}

const styles = StyleSheet.create({
  action : {
      display:'flex',
      flexDirection:'row',
      alignSelf:'center',
      marginHorizontal:10,
      marginBottom:10
  }
})

export default withTheme(PAItemsDetail)