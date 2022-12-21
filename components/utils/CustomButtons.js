import React from 'react'
import { View, StyleSheet} from 'react-native';
import { Button, withTheme } from 'react-native-paper';

function CustomButtons({theme,title,pressHandler,style}) {
    return (
        <View>            
             <Button mode="contained" labelStyle={{fontSize:17}} uppercase={false} style={style && style} color={theme.colors.primary} onPress={pressHandler}>
                {title}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    c_button:{
        // alignSelf:'center',
        // paddingHorizontal:8,
        // paddingVertical:3,
        // fontWeight:900,    
    }
})

export default withTheme(CustomButtons)
