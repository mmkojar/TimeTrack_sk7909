import React,{useEffect} from 'react'
import { View,ScrollView} from 'react-native'
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getDetailTimeCardForSelf } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';

const DetailSelfCard = ({route}) => {

    const { tr_date, empcode } = route.params;

    const [theme,GlobalStyle] = useThemeStyle();
    const dt_tcself = useSelector((state) => state.employee.dt_tcardself)
    const entries = Object.entries(dt_tcself.GetTimeCardForPageLoad[0]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetailTimeCardForSelf(empcode,tr_date));
    },[])

    return (
        <ScrollView>
            <View style={[GlobalStyle.container,{marginVertical:0}]}>
                <DataTable>
                    <DataTable.Header style={{backgroundColor:'#91c4f0'}}>
                        <DataTable.Title textStyle={GlobalStyle.dtheader} style={{justifyContent:'center'}}>
                            Time Card for: {tr_date}
                        </DataTable.Title>
                    </DataTable.Header>
                    {
                        entries.map(([key, value]) => {
                            return (
                                <DataTable.Row key={key}> 
                                    <DataTable.Cell>{key}</DataTable.Cell>
                                    <DataTable.Cell style={{justifyContent:'center'}}>{value}</DataTable.Cell>
                                </DataTable.Row>
                            )
                            
                        })
                    }
                </DataTable>
            </View>
        </ScrollView>
    )
}

export default DetailSelfCard
