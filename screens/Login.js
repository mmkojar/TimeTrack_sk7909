import React, { useState,useEffect } from 'react';
import {  View,  StyleSheet, Alert, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import { Card,TextInput,Text, Snackbar} from 'react-native-paper';
import CustomButtons from '../components/utils/CustomButtons';
import { useDispatch } from 'react-redux';
import { validRegisterUser } from '../components/redux/actions/authActions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { fcmService } from '../services/FCMService';
import useThemeStyle from '../components/utils/useThemeStyle';
// import Config from '../components/utils/Config';
// import MsgAlerts from '../components/utils/MsgAlerts';

function Login() {

    const [theme,GlobalStyle] = useThemeStyle();
    useEffect(() => {
        // fcmService.getToken(onRegister)
    }, [])

    /* const onRegister = (token) => {
        SetToken(token);
    } */
       
    const [userid,SetUserid] = useState('');
    const [password,SetPassword] = useState('');
    const [key,SetKey] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isKeySecure, setIsKeySecure] = useState(true);

    const dispatch = useDispatch();
    
    const pressHandler = (e) => {
        
        e.preventDefault();
        if(userid == '') {
            // <MsgAlerts show={true} msg="Enter User Id"/>
            Alert.alert('Error','Enter User Id',[
                {text: 'OK'}
              ],{cancelable:true})
        }
        else if(password == '' ) {
            Alert.alert('Error','Enter password Id',[
                {text: 'OK'}
              ],{cancelable:true})
        }
        else if(key == '') {
            Alert.alert('Error','Enter key',[
                {text: 'OK'}
              ],{cancelable:true})
        }
        else {            
            Keyboard.dismiss();            
            // console.log(token);
            dispatch(validRegisterUser(userid,password,key));
        }
    }

    const resetHandler = () => {
        SetUserid('')
        SetPassword('')
        SetKey('')
    }
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginMain}>
                        <Card style={styles.card}>
                            <Image
                                style={{height:120,width:120,alignSelf:'center'}}
                                source={require('../assets/logo.png')}
                            />   
                            <Text style={styles.heading}>Please fillup all the details and complete the Login process</Text>
                            <Card.Content>
                                <TextInput
                                    style={GlobalStyle.textinput}
                                    onChangeText={(val) => SetUserid(val)}
                                    placeholder="User Id"
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
                                    keyboardType='default'
                                    value={userid}
                                />
                                <TextInput
                                    style={[GlobalStyle.textinput,{marginVertical:20}]}
                                    onChangeText={(val) => SetPassword(val)}
                                    placeholder="Password"
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
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
                                    style={GlobalStyle.textinput}
                                    onChangeText={(val) => SetKey(val)}
                                    placeholder="Key"
                                    placeholderTextColor={GlobalStyle.primarycolor.color}
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
                                <CustomButtons title="Login" pressHandler={pressHandler}></CustomButtons>
                                <Text style={{marginHorizontal:20}} />
                                <CustomButtons title="Reset" pressHandler={resetHandler}></CustomButtons>                                
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
    },
    heading:{
        // color:'#000',
        textAlign:'center',
        fontSize:18,
        paddingHorizontal:14,
        marginVertical:30
    },
    card:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
    },
    action : {
        display:'flex',
        flexDirection:'row',                
        marginTop:30,
        alignSelf:'center',
    }
})

export default Login
