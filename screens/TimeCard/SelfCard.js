import React,{useEffect,useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeCardOnLoad, getTimeCardSelfFilter } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import CustomButtons from '../../components/utils/CustomButtons';
import LoopItems from '../Reusable/LoopItems';
import Nodatafound from '../Reusable/Nodatafound';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import Datepicker from '../../components/utils/Datepicker';
import uuid from 'react-uuid';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SelfCard = ({navigation,route}) => {

    const [theme] = useThemeStyle();
    
    const empcode = route.params.ecode
    const tconload = useSelector((state) => state.employee.tcardonload)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTimeCardOnLoad(empcode));        
    },[empcode])
    
    const [date1,setDate1] = useState(moment().startOf('month').format('DD/MM/YYYY'));
    const [date2,setDate2] = useState(moment().format('DD/MM/YYYY'));

    const pressHandler = (date) => {
        navigation.navigate('DSelfCard',{
            empcode:empcode,
            tr_date:date
        })
    }    
    const handleSubmit = () => {
        // if(date1 > date2) {
        //     Toast.show({
        //         type:'error',
        //         text1:'Incorrect Dates'
        //     });
        // }
        // else {
            dispatch(getTimeCardSelfFilter(empcode,date1,date2))
        // }
    }

    return (
        <View style={theme.container}>
            <View style={styles.filter}>
                <Datepicker
                    datecount="2" 
                    date1={date1}
                    date2={date2}
                    setState1={setDate1}
                    setState2={setDate2}
                    style={{width:'35%',height:40}}
                />
              <CustomButtons title="Go" pressHandler={handleSubmit} style={{marginTop:0}}></CustomButtons>              
            </View>
            {
                tconload && tconload.GetTimeCardForPageLoad && tconload.GetTimeCardForPageLoad.length > 0 ? 
                    <View style={{marginTop:5,flex:1}}>                        
                        <FlatList
                            data={tconload && tconload.GetTimeCardForPageLoad}
                            keyExtractor={() => uuid()}
                            renderItem={({item,index}) => (
                                <LoopItems
                                    type='dt'
                                    navigation={navigation}
                                    naviTo="DSelfCard" 
                                    naviObj={{
                                        empcode:empcode,
                                        tr_date:item.Tr_Date
                                    }}
                                    indexkey={index}
                                    statuscolor={item.AttendanceStatus.includes('A') && 'red'}
                                    dttable={
                                    [
                                        item.Tr_Date,
                                        item.In ? item.In : '-',
                                        item.out ? item.out : '-',
                                        item.AttendanceStatus,
                                        <FontAwesome5
                                            name="arrow-right"
                                            size={16}
                                            color={theme.colors.primary}
                                            onPress={() => pressHandler(item.Tr_Date)}
                                        />   
                                    ]
                                    }
                                />
                            )}
                        />
                </View>
                : <Nodatafound />
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    filter:{    
      display:'flex',
      flexDirection:'row',
      marginHorizontal:-10,
      justifyContent:'space-evenly',
    }
  })

export default SelfCard
