import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Card, IconButton, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
// import { getNoticeBoard } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import CustomButtons from '../../components/utils/CustomButtons';

const IsHod = ({navigation}) => {

  const [theme,GlobalStyle] = useThemeStyle();
  const empcode = useSelector((state) => state.auth.empcode)

  const pressHandler = (id) => {
    if(id == 's') {
      navigation.navigate('SelfCard',{
        ecode:empcode
      });
    }
    else{
      navigation.navigate('TeamAttendance');
    }
  }

  return (
    <View style={GlobalStyle.container}>        
          <View>
            <Pressable onPress={() => pressHandler('s')}>
              <Card.Title 
                  style={GlobalStyle.cardTitle}
                  title="For Self"
                  titleStyle={{fontSize:18}}
                  right={(props) => <IconButton {...props} size={26} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler('s')} />}
              />
            </Pressable>
            <Pressable onPress={() => pressHandler('t')}>
              <Card.Title 
                  style={GlobalStyle.cardTitle}
                  title="For Team"
                  titleStyle={{fontSize:18}}
                  right={(props) => <IconButton {...props} size={26} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler('t')} />}
              />
            </Pressable>
        </View>                    
    </View>
  )
}

const styles = StyleSheet.create({
  card:{    
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
  }
})

export default IsHod