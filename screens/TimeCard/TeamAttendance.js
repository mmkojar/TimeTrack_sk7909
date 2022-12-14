import React,{useEffect} from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Card, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getHodReportee } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';

const TeamAttendance = ({navigation}) => {

  const [theme,GlobalStyle] = useThemeStyle();  
  const empcode = useSelector((state) => state.auth.empcode)
  const result = useSelector((state) => state.employee.hodreportee)

  const repoarry = [];
  const dispatch = useDispatch();

  for(var i in result && result.GetHODReporteeList) {
    repoarry.push(Object.assign({},...result.GetHODReporteeList[i].Reportee));
  }
  useEffect(() => {
    dispatch(getHodReportee(empcode));
  },[])

  const pressHandler = (code) => {
    navigation.navigate('SelfCard',{
      ecode:code
    })
  }

  return (
    <View style={GlobalStyle.container}>       
          <FlatList
            data={repoarry && repoarry}
            keyExtractor={(item,index) => index}
            renderItem={({item,index}) => (
              
              <Pressable onPress={() => pressHandler(item['Reportee Code'])}>
                  <Card.Title 
                      key={index}
                      style={GlobalStyle.cardTitle}
                      title={item['Reportee Name']}
                      // subtitle={item['Reportee Code']}
                      titleStyle={{fontSize:18}}
                      right={(props) => <IconButton {...props} size={26} icon="arrow-right" color={GlobalStyle.primarycolor.color} onPress={() => pressHandler(item)} />}
                  />
              </Pressable>
          )}
        />                
  </View>
  )
}

export default TeamAttendance
