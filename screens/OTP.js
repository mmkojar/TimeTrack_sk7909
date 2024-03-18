import React, { useEffect, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Card,Text } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import OTPTextView from 'react-native-otp-textinput';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch, useSelector } from 'react-redux';
import {  validRegisterUser, verifyOTP } from '../components/redux/actions/authActions';
import { OTP_VALIDATE, OTP_SESSION_TIME2 } from '../components/redux/actions/type';
import Toast from 'react-native-toast-message';

const OTP = ({route,navigation}) => {
    
    const [ theme ] = useThemeStyle();
    const { url,userid,password,key,isHod,deviceId,token,apiotp } = route.params;

    // console.log("apiotp:",apiotp);
    const [otpInput, setOtpInput] = useState("");

    const dispatch = useDispatch();
    
    const otpHandler = () => {
        dispatch(verifyOTP(url,userid,password,key,isHod,deviceId,token,apiotp,otpInput))
    }
    var icount = 0;
    const [disableinput,SetDisableInput] = useState(true);
    
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
    // const [mintimer, setMintmer] = useState(4);
    // const [sectimer, setSectimer] = useState(59);
    const otpsesstime1 = useSelector((state) => state.auth.sessiontime1);
    const otpsesstime2 = useSelector((state) => state.auth.sessiontime2);
    const otpvalue = useSelector((state) => state.auth.otp);

    function calculateTimeDifference(date1,date2) {

        var diff = date2 - date1.getTime();
    
        var msec = diff;
        var hh = `0${Math.floor(msec / 1000 / 60 / 60)}`;
        msec -= hh * 1000 * 60 * 60;
    
        var mm = `0${Math.floor(msec / 1000 / 60)}`;
        msec -= mm * 1000 * 60;
    
        var ss = `0${Math.floor(msec / 1000)}`;
        msec -= ss * 1000;

        const timepayload = {
            min: mm.slice(-2),
            sec: ss.slice(-2),
        }
        dispatch({ type: OTP_SESSION_TIME2, payload: timepayload });

        return hh.slice(-2) + ":" + mm.slice(-2) + ":" + ss.slice(-2);
    }

    
    
    useEffect(() => {
        // console.log("OTP renderer")
        if(otpsesstime2&&otpsesstime2.min == 2 && otpsesstime2&&otpsesstime2.sec == 0) {
            SetDisableInput(false);
        }
        if(otpvalue == '0') {
            navigation.navigate('Login')
            Toast.show({ type: 'error', text1:'Invalid Access' });
        }
        let myInterval = setInterval(() => {
            const d3 = new Date();
            calculateTimeDifference(d3,otpsesstime1.stime);
            if((otpsesstime2&&otpsesstime2.min == 0) && (otpsesstime2&&otpsesstime2.sec == 0) ||
            (otpsesstime2&&otpsesstime2.min == "aN") && (otpsesstime2&&otpsesstime2.sec == "aN")) {
                SetDisableInput(false);
                clearInterval(myInterval)
                navigation.navigate('Login');
                dispatch({
                    type: OTP_VALIDATE,
                    payload: '0',
                });
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
        /* let myInterval = setInterval(() => {
            if (otpsesstime&&otpsesstime.sectimer > 0) {
                dispatch({
                    type: OTP_SESSION_TIME,
                    payload: {
                        mintimer:otpsesstime&&otpsesstime.mintimer,
                        sectimer:otpsesstime&&otpsesstime.sectimer - 1
                    },
                });
            }
            if (otpsesstime&&otpsesstime.sectimer === 0) {
                if (otpsesstime&&otpsesstime.mintimer === 0) {
                    clearInterval(myInterval)
                    navigation.navigate('Login');
                    dispatch({
                        type: OTP_VALIDATE,
                        payload: '0',
                    });
                } else {
                    dispatch({
                        type: OTP_SESSION_TIME,
                        payload: {
                            mintimer:otpsesstime&&otpsesstime.mintimer - 1,
                            sectimer:59
                        },
                    });
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        }; */
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
                            <Text style={styles.heading}>Additional info required. Please enter the OTP sent to your registered email id or mobile no</Text>
                            <Card.Content>
                                <OTPTextView
                                    // ref={input}
                                    containerStyle={{justifyContent:'center',marginRight:10}}
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
                                {
                                    (otpsesstime2&&otpsesstime2) ? 
                                    <Text style={{alignSelf:'center',fontSize:18,color:'#000000'}}>Session expires in {otpsesstime2.min ? otpsesstime2.min : '0'}:{otpsesstime2.sec ? otpsesstime2.sec : '0'} minutes</Text>
                                    :
                                    null
                                }
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

export default OTP