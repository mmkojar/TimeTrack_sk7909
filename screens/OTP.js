import React, { useEffect, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Card,TextInput,Text } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import OTPTextView from 'react-native-otp-textinput';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../components/redux/actions/authActions';

const OTP = ({route,navigation}) => {

    const [ theme ] = useThemeStyle();
    const otpvalue = useSelector((state) => state.auth.otp);
    const { url,userid,password,key,isHod,deviceId,token,apiotp } = route.params;
    // console.log("apiotp:",apiotp);
    const [otpInput, setOtpInput] = useState("");

    const dispatch = useDispatch();
    const otpHandler = () => {
        // dispatch(validRegisterUser(userid,password,key,deviceId&&deviceId,token&&token));
        dispatch(verifyOTP(url,userid,password,key,isHod,deviceId,token,apiotp,otpInput))
    }
    
    const cellHandler = (e,i) =>{
        if(i == '5' && e!==''){
            Keyboard.dismiss()
        }
    }

    useEffect(() => {
        if(otpvalue !== '1') {
            navigation.navigate('Login')
        }
    },[])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginMain}>
                        <Card style={styles.card} elevation={0}>
                            <Image
                                style={{height:120,width:120,alignSelf:'center'}}
                                source={require('../assets/logo.png')}
                            /> 
                            <Text style={styles.heading}>Additionally info required. Please enter the OTP sent to your registered email id or mobile no</Text>
                            <Card.Content>
                                <OTPTextView
                                    // ref={input}
                                    // containerStyle={styles.textInputContainer}
                                    textInputStyle={styles.roundedTextInput}
                                    tintColor={theme.colors.primary}
                                    handleTextChange={setOtpInput}
                                    handleCellTextChange={cellHandler}
                                    inputCount={6}
                                    keyboardType="numeric"
                                />
                            </Card.Content>
                            <View style={styles.action}>
                                <View style={{width:'30%'}}>
                                    <CustomButtons title="Resend"  style={{width:'100%'}}></CustomButtons>
                                </View>
                                <View style={{width:'30%',marginLeft:10}}>
                                    <CustomButtons title="Submit" pressHandler={otpHandler} style={{width:'100%'}}></CustomButtons>
                                </View>
                            </View>
                            <View style={{marginVertical:50}}>
                                <Text style={{alignSelf:'center',fontSize:18,color:'#ff0000'}}>Session Expire in 1:34 seconds</Text>
                            </View>
                        </Card>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginMain:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    heading:{
        textAlign:'center',
        fontSize:18,
        paddingHorizontal:14,
        marginVertical:30
    },
    card:{
        backgroundColor:'#fff',
    },
    action : {
        display:'flex',
        flexDirection:'row',                
        marginTop:30,
        alignSelf:'center',
    },
    roundedTextInput: {
        borderRadius: 10,
        borderWidth: 4,
    },
})

export default OTP