import React from 'react'
import { Pressable } from 'react-native'
import { DataTable, Card, IconButton } from 'react-native-paper';
import useThemeStyle from '../../components/utils/useThemeStyle';

const LoopItems = (props) => {

  const { type,navigation,naviTo,naviObj,ctitle,dttable,indexkey } = props;
  
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
            right={(props) => <IconButton {...props} size={22} icon="arrow-right" onPress={pressHandler} />}
        />
    </Pressable> :
    <DataTable.Row onPress={pressHandler} style={{backgroundColor:`${indexkey % 2 ? theme.colors.accent : ''}`}}>
      {
          dttable.map((item,index) => {
            if(dttable.length == '4') {
                if(index == '1' || index == '2') {
                  var styles = {justifyContent:'flex-start'};
                }
                else if(index == '0') {
                  var styles = {justifyContent:'center',marginLeft:-30};                  
                }
                else {
                  var styles = {justifyContent:'center'};
                }
            }
            else if(dttable.length == '3') {
              if(index == '0') {
                var styles = {justifyContent:'flex-start'};
              }
              else if(index == '1') {
                var styles = {justifyContent:'center'};                  
              }
              else {
                var styles = {justifyContent:'flex-end'};
              }
            }
            else {
              var styles = {justifyContent:'center'};
            }
            return <DataTable.Cell key={index} textStyle={{fontSize:12}} style={styles}>{item}</DataTable.Cell>
          })
      }
    </DataTable.Row>
          
      
  )
}

export default LoopItems
