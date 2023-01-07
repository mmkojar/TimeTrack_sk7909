import React from 'react';
import {  Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { navigate } from '../../services/RootNavigation';
import { logoutAction } from '../redux/actions/authActions';


const Headericon = ({name}) => {

    const dispatch = useDispatch();

    return (
        <View>
            {
                name !== 'Home' ?
                <Button  onPress={() => {
                    navigate('Home');
                }}>
                    <FontAwesome5
                        name="home"
                        size={16}
                        color="#fff"
                        style={{marginRight:20}}
                    />
                </Button>
                :
                // null
                <Button onPress={() => {
                    Alert.alert('Message','Are You Sure?',[
                    {text: 'Yes', onPress:() => {
                        dispatch(logoutAction());
                    }},
                    {text:'No'}
                    ],{cancelable:true})
                  }}>
                  <FontAwesome5
                    name="sign-out-alt"
                    size={21}
                    color="#fff"
                    style={{marginRight:20}}
                  />
                </Button>
            }
            
        </View>
    );
};

export default Headericon;