import React from 'react'
import { Pressable } from 'react-native'
import { DataTable } from 'react-native-paper';
import { Card, IconButton } from 'react-native-paper';
import useThemeStyle from '../../components/utils/useThemeStyle';

const LoopItems = (props) => {

  const { type,navigation,naviTo,naviObj,ctitle,dttable } = props;
  
  const [theme] = useThemeStyle();

  const pressHandler = () => {
    navigation && navigation.navigate(naviTo && naviTo,naviObj && naviObj)
  }

  return (  
    type == 'card' ? 
    <Pressable onPress={pressHandler}>
        <Card.Title
            style={theme.cardTitle}
            title={ctitle}
            // subtitle={item['Reportee Code']}
            titleStyle={{fontSize:15}}
            right={(props) => <IconButton {...props} size={22} icon="arrow-right" color={theme.colors.primary} onPress={pressHandler} />}
        />
    </Pressable> :
    <DataTable.Row onPress={pressHandler}>
      {
          dttable.map((item,index) => {
            return <DataTable.Cell key={index} textStyle={{fontSize:12}} style={{justifyContent:'center'}}>{item}</DataTable.Cell>
          })
      }
    </DataTable.Row>
          
      
  )
}

export default LoopItems
