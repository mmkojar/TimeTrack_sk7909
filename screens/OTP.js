import React, { useEffect, useState, memo } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Card,TextInput,Text } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import OTPTextView from 'react-native-otp-textinput';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch, useSelector } from 'react-redux';
import {  validRegisterUser, verifyOTP } from '../components/redux/actions/authActions';
import { OTP_VALIDATE } from '../components/redux/actions/type';
import Toast from 'react-native-toast-message';

const OTP = ({route,navigation}) => {

    const [ theme ] = useThemeStyle();
    const { url,userid,password,key,isHod,deviceId,token,apiotp } = route.params;

    const otpvalue = useSelector((state) => state.auth.otp);

    // console.log("apiotp:",apiotp);
    const [otpInput, setOtpInput] = useState("");

    const dispatch = useDispatch();
    
    const otpHandler = () => {
        dispatch(verifyOTP(url,userid,password,key,isHod,deviceId,token,apiotp,otpInput))
    }
    var icount = 0;
    const [disableinput,SetDisableInput] = useState(false);
    const resendHandler = () => {
        icount++;
        if(icount == 1) {
            SetDisableInput(true);
        }
        dispatch(validRegisterUser(userid,password,key,deviceId,token));
        Toast.show({ type: 'success', text1:'New OTP Sent' });
    }
    const cellHandler = (e,i) =>{
        if(i == '5' && e!==''){
            Keyboard.dismiss()
        }
    }
    const [mintimer, setMintmer] = useState(2);
    const [sectimer, setSectimer] = useState(59);

    useEffect(() => {
        if(otpvalue == '0') {
            navigation.navigate('Login')
            Toast.show({ type: 'error', text1:'Invalid Access' });
        }
        let myInterval = setInterval(() => {
            if (sectimer > 0) {
                setSectimer(sectimer - 1);
            }
            if (sectimer === 0) {
                // console.log(mintimer);
                if (mintimer === 0) {
                    clearInterval(myInterval)
                    navigation.navigate('Login');
                    dispatch({
                        type: OTP_VALIDATE,
                        payload: '0',
                    });
                } else {
                    // console.log("mintimer:",mintimer);
                    setMintmer(mintimer - 1);
                    setSectimer(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    })

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
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
                                    <CustomButtons title="Resend" pressHandler={resendHandler}  style={{width:'100%'}} disable={disableinput}></CustomButtons>
                                </View>
                                <View style={{width:'30%',marginLeft:10}}>
                                    <CustomButtons title="Submit" pressHandler={otpHandler} style={{width:'100%'}}></CustomButtons>
                                </View>
                            </View>
                            <View style={{marginVertical:50}}>
                                <Text style={{alignSelf:'center',fontSize:18,color:'#ff0000'}}>Session Expire in {mintimer}:{sectimer < 10 ? `0${sectimer}` : sectimer} seconds</Text>
                            </View>
                        </Card>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
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

export default memo(OTP)