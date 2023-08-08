import React from 'react'
import { View, StyleSheet} from 'react-native';
import { Button, withTheme } from 'react-native-paper';

function CustomButtons({theme,title,pressHandler,style,disable}) {
    return (
        <View>            
             <Button mode="contained" labelStyle={{fontSize:17}} uppercase={false} style={[{width:'50%',marginTop:10,alignSelf:'center'},style&&style]} buttonColor={theme.colors.primary} onPress={pressHandler} disabled={disable ? disable : false}>
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
