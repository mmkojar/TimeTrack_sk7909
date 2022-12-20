import React,{ useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getDetailHODList } from '../../components/redux/actions/employeeActions'
import CustomButtons from '../../components/utils/CustomButtons';
import DetailScreen from '../Reusable/DetailScreen';

const PAItemsDetail = ({navigation,route}) => {

    const { ecode, id, apptype } = route.params;

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
    },[])

    const pressHandler = () => {

    }

    return (
      <View>
        <DetailScreen entries={entries} title={apptype} type="pa" />
        <View style={styles.action}>
            <CustomButtons title="Approve" pressHandler={pressHandler}></CustomButtons>
            <View style={{marginHorizontal:40}} />
            <CustomButtons title="Reject" pressHandler={pressHandler}></CustomButtons>                                
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  action : {
      display:'flex',
      flexDirection:'row',                
      marginTop:30,
      alignSelf:'center',
  }
})

export default PAItemsDetail
