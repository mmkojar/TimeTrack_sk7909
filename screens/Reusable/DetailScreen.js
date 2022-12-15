import React from 'react'
import { View,ScrollView} from 'react-native'
import { DataTable } from 'react-native-paper';
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from './Dtheader';

const DetailScreen = ({title, entries}) => {

    const [theme,GlobalStyle] = useThemeStyle();

    return (
        <ScrollView>
            <View style={GlobalStyle.dtcontainer}>
                <DataTable>
                    <Dtheader headtitle={[title]}/>
                    {
                        entries && entries.map(([key, value]) => {
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

export default DetailScreen
