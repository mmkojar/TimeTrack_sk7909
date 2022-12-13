import React from 'react'
import { View,StyleSheet,Dimensions } from 'react-native';
import { ActivityIndicator,withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Spinner = ({theme}) => {

    const loadingState = useSelector((state) => state.loader);
    const { isLoading } = loadingState;
    return isLoading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" animating={true}  color={theme.colors.primary} style={styles.spin}></ActivityIndicator>
        </View>
    ) : null
}

const { height,width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        zIndex: 1,
        height,
        width,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
        // backgroundColor:"#000",
        opacity:0.5
    },
    spin : {
        backgroundColor: "#fff",
        width: 80,
        height: 80,
        borderRadius:22,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    }
})

export default withTheme(Spinner)
