import React, { useEffect, useState } from 'react';
import {  View,StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Card,TextInput,Text } from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch, useSelector } from 'react-redux';
import { validRegisterUser } from '../components/redux/actions/authActions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useThemeStyle from '../components/utils/useThemeStyle';
import Toast from 'react-native-toast-message';
import useHelper from '../components/hooks/useHelper';
import { LOCK_INPUT, SET_TIME } from '../components/redux/actions/type';

function Login({route}) {

    /* if(route.params !== 'undefined') {
        const {code} = route.params;
        if(code == '1'){
            resetHandler();
        }
    } */
    
    const [ theme ] = useThemeStyle();
    const { token,deviceId } = useHelper();
    
    const [userid,SetUserid] = useState('');
    const [password,SetPassword] = useState('');
    const [key,SetKey] = useState('');
    const [disableinput,SetDisableInput] = useState(false);
        
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isKeySecure, setIsKeySecure] = useState(true);
         
    const lockinfo = useSelector((state) => state.auth.lock);
    const settimediff = useSelector((state) => state.auth.settime);

    const dispatch = useDispatch();

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
        dispatch({ type: SET_TIME, payload: timepayload });

        return hh.slice(-2) + ":" + mm.slice(-2) + ":" + ss.slice(-2);
    }
   
    useEffect(() => {
        // console.log("login renderer")
        // if((settimediff&&settimediff.min == 0) && (settimediff&&settimediff.sec == 0) ) {
        //     SetDisableInput(false);
        // }
        if(lockinfo&&lockinfo.lock == '1') {
            SetDisableInput(true);
            let myInterval = setInterval(() => {
                    const d3 = new Date();
                    calculateTimeDifference(d3,lockinfo.stime);
                    if((settimediff&&settimediff.min == 0) && (settimediff&&settimediff.sec == 0) ||
                    (settimediff&&settimediff.min == "aN") && (settimediff&&settimediff.sec == "aN")) {
                        SetDisableInput(false);
                        const enableinfo = {
                            stime:d3.getTime(),
                            // sec:0,
                            lock:'0'
                        }
                        dispatch({
                            type: LOCK_INPUT,
                            payload: enableinfo,
                        });
                    }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }
        else{
            SetDisableInput(false);
        }
    });

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
            resetHandler();
        }
    }

    const resetHandler = () => {
        SetUserid('')
        SetPassword('')
        SetKey('')
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
                                    disabled={disableinput}
                                    style={[theme.textinput,{backgroundColor:`${disableinput == true ? '#ccc' : '#fff'}`}]}
                                    onChangeText={(val) => SetUserid(val)}
                                    placeholder="User Id"
                                    placeholderTextColor={theme.colors.primary}
                                    keyboardType='default'
                                    value={userid}
                                />
                                <TextInput
                                    disabled={disableinput}
                                    style={[theme.textinput,{marginVertical:20,backgroundColor:`${disableinput == true ? '#ccc' : '#fff'}`}]}
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
                                    disabled={disableinput}
                                    style={[theme.textinput,{backgroundColor:`${disableinput == true ? '#ccc' : '#fff'}`}]}
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
                            </Card.Content>
                            <View style={styles.action}>
                                <View style={{width:'36%'}}>
                                    <CustomButtons title="Reset" pressHandler={resetHandler} style={{width:'100%'}} disable={disableinput}></CustomButtons>                                
                                </View>
                                <View style={{width:'36%',marginLeft:10}}>
                                    <CustomButtons title="Login" pressHandler={loginHandler} style={{width:'100%'}} disable={disableinput}></CustomButtons>
                                </View>
                            </View>
                            {
                                (settimediff&&settimediff) && (lockinfo&&lockinfo.lock == '1') ?
                                <View>
                                    <Text style={[styles.heading,{marginVertical:0,color:'#000000'}]}>Too many incorrect attempts. Login locked for next {settimediff.min ? settimediff.min : '0'}:{settimediff.sec ? settimediff.sec : '0'} minutes</Text>
                                </View>
                                :
                                null
                            }
                           
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
        marginVertical:30,
        alignSelf:'center',
    },
})

export default Login
