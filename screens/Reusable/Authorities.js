import React from 'react'
import { View } from 'react-native'
import { Card, Title, withTheme, Text } from 'react-native-paper'

const Authorities = ({theme, recom,sanc}) => {
  return (
    <Card style={theme.card} elevation={5}>          
        <Title style={{color:theme.colors.primary,fontSize:22}}>Authorities</Title>
        <View>
        <Title style={{fontSize:16,marginBottom:-5}}>Recommender : <Text style={{fontSize:14,textAlignVertical:'center'}}>{recom}</Text></Title>
        <Title style={{fontSize:16}}>Sanctioner : <Text style={{fontSize:14,textAlignVertical:'center'}}>{sanc}</Text></Title>
        </View>
    </Card>
  )
}

export default withTheme(Authorities)
