import React,{useEffect,useState} from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { TextInput, DataTable, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getTimeCardOnLoad } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import CustomButtons from '../../components/utils/CustomButtons';
import moment from 'moment';

const SelfCard = ({navigation}) => {

    const [theme,GlobalStyle] = useThemeStyle();
    const empcode = useSelector((state) => state.auth.empcode)
    const tconload = useSelector((state) => state.employee.tcardonload)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTimeCardOnLoad(empcode));
        
    },[])
    
    const [date1,setDate1] = useState('');
    const [date2,setDate2] = useState('');

    const pressHandler = (date) => {
        navigation.navigate('DSelfCard',{
            empcode:empcode,
            tr_date:date
        })
    }

    return (
        <View style={GlobalStyle.container}>
            <View style={styles.filter}>
                <TextInput                  
                    style={[GlobalStyle.textinput,{width:'35%',height:40}]}
                    onChangeText={(val) => setDate1(val)}
                    placeholder="User Id"
                    placeholderTextColor={GlobalStyle.primarycolor.color}                      
                    value={date1}
                />
                <TextInput
                    style={[GlobalStyle.textinput,{width:'35%',height:40}]}
                    onChangeText={(val) => setDate2(val)}
                    placeholder="Password"
                    placeholderTextColor={GlobalStyle.primarycolor.color}
                    keyboardType='default'
                    value={date2}
                />
              <CustomButtons title="Go" pressHandler=""></CustomButtons>              
            </View>
            <View style={{marginTop:10}}>
                <DataTable>
                    <FlatList
                        data={tconload.GetTimeCardForPageLoad}
                        // numColumns={1}
                        keyExtractor={(item,index) => index}
                        renderItem={({item}) => (
                            <DataTable.Row onPress={() => pressHandler(item.Tr_Date)}> 
                                <DataTable.Cell>{item.Tr_Date}</DataTable.Cell>
                                <DataTable.Cell style={{justifyContent:'center'}}>{item.AttendanceStatus}</DataTable.Cell>
                                <DataTable.Cell style={{justifyContent:'flex-end'}}>
                                    <IconButton size={24} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item.Tr_Date)} />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )}
                    />
                </DataTable>
              </View>
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
