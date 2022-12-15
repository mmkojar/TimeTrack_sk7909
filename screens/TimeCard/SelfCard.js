import React,{useEffect,useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { TextInput, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getTimeCardOnLoad, getTimeCardForSelf } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import CustomButtons from '../../components/utils/CustomButtons';
import LoopItems from '../Reusable/LoopItems';
// import DateTimePicker from '@react-native-community/datetimepicker';

const SelfCard = ({navigation,route}) => {

    const [theme,GlobalStyle] = useThemeStyle();
    
    const empcode = route.params.ecode
    const tconload = useSelector((state) => state.employee.tcardonload)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTimeCardOnLoad(empcode));
        
    },[])
    
    const [date1,setDate1] = useState(new Date());
    const [date2,setDate2] = useState('');

    const pressHandler = (date) => {
        navigation.navigate('DSelfCard',{
            empcode:empcode,
            tr_date:date
        })
    }

    const handleSubmit = () => {
        if(date1 == '' || date2 == '') {
            alert('Please Enter Dates');
        }
        else {
            dispatch(getTimeCardForSelf(empcode,date1,date2))
        }
    }

    return (
        <View style={GlobalStyle.container}>
            <View style={styles.filter}>
                <TextInput                  
                    style={[GlobalStyle.textinput,{width:'35%',height:40}]}
                    onChangeText={(val) => setDate1(val)}
                    placeholder="Date1"
                    placeholderTextColor={GlobalStyle.primarycolor.color}                      
                    value={date1}
                />
                {/* <DatePicker 
                style={[GlobalStyle.textinput,{width:'35%',height:40}]}
                date={date1}
                onDateChange={setDate1} /> */}
                <TextInput
                    style={[GlobalStyle.textinput,{width:'35%',height:40}]}
                    onChangeText={(val) => setDate2(val)}
                    placeholder="Date2"
                    placeholderTextColor={GlobalStyle.primarycolor.color}
                    keyboardType='default'
                    value={date2}
                />
              <CustomButtons title="Go" pressHandler={handleSubmit}></CustomButtons>              
            </View>
            {
                tconload && tconload.GetTimeCardForPageLoad.length > 0 ? 
                    <View style={{marginTop:5}}>                        
                        <FlatList
                            data={tconload && tconload.GetTimeCardForPageLoad}
                            keyExtractor={(item,index) => index}
                            renderItem={({item}) => (
                                <LoopItems
                                    type='dt'
                                    navigation={navigation}
                                    naviTo="DSelfCard" 
                                    naviObj={{
                                        empcode:empcode,
                                        tr_date:item.Tr_Date
                                    }}
                                    dttable={
                                    [
                                        item.Tr_Date,
                                        item.AttendanceStatus,
                                        <IconButton size={24} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item.Tr_Date)} />
                                    ]
                                    }
                                />
                            )}
                        />
                </View>
                : <View style={GlobalStyle.nodatafound}><Text>No Record Found</Text></View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    filter:{    
      display:'flex',
      flexDirection:'row',
      marginHorizontal:-5,
      justifyContent:'space-evenly',
    }
  })

export default SelfCard
