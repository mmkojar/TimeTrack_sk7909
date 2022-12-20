import React from 'react'
import { View,ScrollView} from 'react-native'
import { DataTable } from 'react-native-paper';
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from './Dtheader';

const DetailScreen = ({title, entries, type}) => {

    const [theme] = useThemeStyle();

    return (
        <ScrollView>
            <View style={theme.dtcontainer}>
                <DataTable>
                    { type !== 'pa' && <Dtheader headtitle={[title]}/>  }
                    {
                        entries && entries.map(([key, value]) => {
                            return (
                                <DataTable.Row key={key}> 
                                    <DataTable.Cell>{key.replace('_',' ')}</DataTable.Cell>
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
