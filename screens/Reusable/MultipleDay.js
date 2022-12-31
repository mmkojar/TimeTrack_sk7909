import React from 'react'
import { View } from 'react-native'
import { Text,withTheme } from 'react-native-paper'
import Datepicker from '../../components/utils/Datepicker'
import Dropdown from '../../components/utils/Dropdown'

const MultipleDay = ({theme,duid,fdate,tdate,setFdate,setTdate,MulDaySH,MulDayFH,setDuration,setDurmultiple}) => {


  return (
    <View style={{marginVertical:10,display:'flex',flexDirection:'row'}}>
                    <View style={{width:'32%'}}>
        <Text style={theme.applabel}>Dates</Text>
        <Datepicker
            datecount={duid == 'MultipleDay' ? '2' : '1'}
            date1={fdate}
            date2={tdate}
            setState1={setFdate}
            setState2={setTdate}
            style={{marginBottom:10}}
        />
    </View>
        <View style={{marginLeft:10,width:'64%',marginTop:20}}>
        <Dropdown data={MulDaySH}  setValue={setDuration} style={{marginBottom:10}}/>
        <Dropdown data={MulDayFH}  setValue={setDurmultiple} style={{}}/>
    </View> 
</View>
  )
}

export default withTheme(MultipleDay)
