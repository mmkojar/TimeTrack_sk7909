import React from 'react'
import { View } from 'react-native'
import useThemeStyle from '../../components/utils/useThemeStyle';
import LoopItems from '../Reusable/LoopItems';

const IsHod = ({navigation,route}) => {

  const [theme] = useThemeStyle();

  return (
    <View style={theme.container}>
          <LoopItems 
                type="card" 
                navigation={navigation}
                naviTo="SelfCard"
                naviObj={{
                  ecode:route.params.ecode
                }} 
                ctitle="For Self"
          />
          <LoopItems 
                type="card" 
                navigation={navigation} 
                naviTo="TeamAttendance"
                naviObj={{
                  ecode:route.params.ecode
                }}
                ctitle="For Team"
          />
    </View>
  )
}

export default IsHod