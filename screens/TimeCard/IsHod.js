import React from 'react'
import { View } from 'react-native'
import {  useSelector } from 'react-redux'
import useThemeStyle from '../../components/utils/useThemeStyle';
import LoopItems from '../Reusable/LoopItems';

const IsHod = ({navigation}) => {

  const [theme,GlobalStyle] = useThemeStyle();
  const empcode = useSelector((state) => state.auth.empcode)  

  return (
    <View style={GlobalStyle.container}>
          <LoopItems 
                type="card" 
                navigation={navigation} 
                naviTo="SelfCard" 
                naviObj={{
                  ecode:empcode
                }} 
                ctitle="For Self"
          />
          <LoopItems 
                type="card" 
                navigation={navigation} 
                naviTo="TeamAttendance"
                naviObj={{
                  ecode:empcode
                }}
                ctitle="For Team"
          />                
    </View>
  )
}

export default IsHod