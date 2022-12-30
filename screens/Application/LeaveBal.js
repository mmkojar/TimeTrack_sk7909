import React,{ useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getLeaveBal } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';

const LeaveBal = ({navigation,route}) => {

    const [theme] = useThemeStyle(); 
    const result = useSelector((state) => state.employee.leavebal)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeaveBal(route.params.ecode));
    },[])
        
    return (
        <View style={theme.dtcontainer}>
            <List.Section>
                <FlatList 
                    data={result&&result.GetLeaveBalance}
                    keyExtractor={(item,index) => index}
                    renderItem={({item}) => (
                        <List.Accordion
                            style={{padding:0}}
                            title={item.LeaveDesc}
                            left={props => <List.Icon {...props} icon="folder" />}>
                            <List.Item title={`Leave Code : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.LeaveCode}</Text>}/>
                            <List.Item title={`Opening : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.OpeningBalance}</Text>}/>
                            <List.Item title={`Accured : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.Accrued}</Text>}/>
                            <List.Item title={`Used : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.LeaveUsed}</Text>}/>
                            <List.Item title={`Count : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.CurrentBalance}</Text>}/>
                            <List.Item title={`Application Count : `} titleStyle={styles.titlestlye} right={() => <Text style={styles.textstyle}>{item.NoOfApp}</Text>}/>
                        </List.Accordion>
                    )}
                />
            </List.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    titlestlye:{
        marginLeft:50,
        fontSize:18,
    },
    textstyle:{        
        marginRight:100,
        textAlignVertical:'center',
        fontSize:18
    }   
})

export default LeaveBal
