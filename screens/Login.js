import React, { useState, useEffect } from 'react';
import {  View,StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Card,TextInput,Text } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { validRegisterUser, verifyOTP } from '../components/redux/actions/authActions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStyle from '../components/utils/useThemeStyle';
import Toast from 'react-native-toast-message';
import useHelper from '../components/hooks/useHelper';
import { OTP_VALIDATE, TIMER } from '../components/redux/actions/type';

function Login() {

    const [ theme ] = useThemeStyle();
    const { token,deviceId } = useHelper();

    const [userid,SetUserid] = useState('RT1505');
    const [password,SetPassword] = useState('RT1505');
    const [key,SetKey] = useState('Https@123');
    const [otp,SetOtp] = useState('');
    
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isKeySecure, setIsKeySecure] = useState(true);

    const otpvalue = useSelector((state) => state.auth.otp);
    const intitime = useSelector((state) => state.auth.timer);

    useEffect(()=> {
        if(intitime) {
            let myInterval = setInterval(() => {
                const dt = new Date();
                let newtime = dt.getTime();
                console.log("newtime:",newtime);
                var differenceValue = (newtime - intitime) / 1000;
                differenceValue /= 60;
                let mintdiff = Math.abs(Math.round(differenceValue))
                // console.log("mintdiff:",mintdiff);
                if(mintdiff > 3) {
                    Toast.show({ type: 'error', text1:'Session Exipire! Please login again' });
                    resetHandler();
                }
            },1000)
            return () => {
                clearInterval(myInterval);
            };
        }
    },[intitime])
         
    const dispatch = useDispatch();

    const loginHandler = (e) => {
        
        e.preventDefault();
        if(userid == '') {
            Toast.show({ type: 'error', text1:'Enter User Id' });
        }
        else if(password == '' ) {
            Toast.show({ 'error': type, text1:'Enter password' });
        }
        else if(key == '') {
            Toast.show({ 'error': type, text1:'Enter key' });
        }
        else {
            Keyboard.dismiss();
            dispatch(validRegisterUser(userid,password,key,deviceId&&deviceId,token&&token));
        }
    }

    const OTPHandler = () => {
        // dispatch(validRegisterUser(userid,password,key,deviceId&&deviceId,token&&token));
        dispatch(verifyOTP(userid,password,key,deviceId&&deviceId,token&&token,otp&&otp))
    }

    const resetHandler = () => {
        SetUserid('')
        SetPassword('')
        SetKey('')
        dispatch({
            type: OTP_VALIDATE,
            payload: '0',
        });
        const dt = new Date();
        let resettime = dt.getTime();
        dispatch({
            type:TIMER,
            payload:resettime,
        })
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginMain}>
                        <Card style={styles.card} elevation={0}>
                            <Image
                                style={{height:120,width:120,alignSelf:'center'}}
                                source={require('../assets/logo.png')}
                            />   
                            <Text style={styles.heading}>Please fillup all the details and complete the Login process</Text>
                            <Card.Content>
                                <TextInput
                                    style={theme.textinput}
                                    onChangeText={(val) => SetUserid(val)}
                                    placeholder="User Id"
                                    placeholderTextColor={theme.colors.primary}
                                    keyboardType='default'
                                    value={userid}
                                />
                                <TextInput
                                    style={[theme.textinput,{marginVertical:20}]}
                                    onChangeText={(val) => SetPassword(val)}
                                    placeholder="Password"
                                    placeholderTextColor={theme.colors.primary}
                                    keyboardType='default'
                                    secureTextEntry={isPasswordSecure}
                                    right={
                                        <TextInput.Icon
                                        icon={() => <FontAwesome5 name={isPasswordSecure ? "eye-slash" : "eye"} size={20} color='#000000' />} 
                                        onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                        />
                                    }
                                    value={password}
                                />
                                <TextInput
                                    style={theme.textinput}
                                    onChangeText={(val) => SetKey(val)}
                                    placeholder="Key"
                                    placeholderTextColor={theme.colors.primary}
                                    keyboardType='default'
                                    secureTextEntry={isKeySecure}
                                    right={
                                        <TextInput.Icon
                                        icon={() => <FontAwesome5 name={isKeySecure ? "eye-slash" : "eye"} size={20} color='#000000' />} 
                                        onPress={() => { isKeySecure ? setIsKeySecure(false) : setIsKeySecure(true) }}
                                        />
                                    }
                                    value={key}
                                />
                                {
                                    otpvalue == '1' ? 
                                    <TextInput
                                        style={[theme.textinput,{marginVertical:20}]}
                                        onChangeText={(val) => SetOtp(val)}
                                        placeholder="Enter OTP"
                                        placeholderTextColor={theme.colors.primary}
                                        keyboardType='default'
                                        value={otp}
                                    />
                                    : null
                                }
                            </Card.Content>
                            <View style={styles.action}>
                                <View style={{width:'36%'}}>
                                    <CustomButtons title="Reset" pressHandler={resetHandler} style={{width:'100%'}}></CustomButtons>                                
                                </View>
                                <View style={{width:'36%',marginLeft:10}}>
                                    {
                                         otpvalue == '1' ? 
                                        <CustomButtons title="Verify OTP" pressHandler={OTPHandler} style={{width:'100%'}}></CustomButtons>
                                        :
                                        <CustomButtons title="Login" pressHandler={loginHandler} style={{width:'100%'}}></CustomButtons>

                                    }
                                </View>
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
    }
})

export default Login
