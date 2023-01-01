import React,{memo} from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper';

const Nodatafound = () => {
    
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>No Record Found</Text></View>
    )
}

export default memo(Nodatafound)
