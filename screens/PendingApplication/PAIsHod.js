import React from 'react'
import { View } from 'react-native'
import {  useSelector } from 'react-redux'
import useThemeStyle from '../../components/utils/useThemeStyle';
import LoopItems from '../Reusable/LoopItems';

const PAIsHod = ({navigation,route}) => {

  const [theme] = useThemeStyle();

  return (
    <View style={theme.container}>
          <LoopItems 
                type="card" 
                navigation={navigation}
                naviTo="PAtypes"
                naviObj={{
                  ecode:route.params.ecode,
                  api1:'GetEmployeePendingCount',
                  api2:'GetEmployeeCancellationPendingCount',
                  type:'self'
                }} 
                ctitle="For Self"
          />
          <LoopItems 
                type="card" 
                navigation={navigation} 
                naviTo="PAtypes"
                naviObj={{
                  ecode:route.params.ecode,
                  api1:'GetHODHomePagePendingCount',
                  api2:'GetHODHomePageCancellationPendingCount',
                  type:'team'
                }}
                ctitle="For Team"
          />
    </View>
  )
}

export default PAIsHod