import React,{useEffect} from 'react'
import { View, FlatList } from 'react-native'
import { Card, Paragraph, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, updateNotification } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import moment from 'moment'

const Notification = () => {

  const [theme,GlobalStyle] = useThemeStyle();
  const empcode = useSelector((state) => state.auth.empcode)
  const notifi = useSelector((state) => state.employee.notify)
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getNotification(empcode));
    
  },[])

  const handlePress = (item) => {
    dispatch(updateNotification(empcode,item.id,'1','0'))
  }

  const handleDelete = (item) => {
    dispatch(updateNotification(empcode,item.id,'0','1'))
  }

  return (
    <View style={GlobalStyle.container}>
      {
        notifi && notifi.Notification.length > 0 ? 
        <FlatList
            data={notifi && notifi.Notification}
            keyExtractor={(item,index) => index}
            renderItem={({item}) => (
                  <Card style={[GlobalStyle.card,{backgroundColor:`${item.IsRead == '0' ? theme.colors.accent : '#fff'}`}]} elevation={5} onPress={handlePress(item)}>
                      <Card.Title 
                        style={{marginTop:-20,marginLeft:-15,marginBottom:-20}}
                        title={item.Application_Type}  
                        right={(props) => <Text {...props} >{moment(item.NotificationDate).format('DD-MMM-YYYY h:mm')}</Text>}
                      />                    
                      <Paragraph style={{alignSelf:'flex-start'}}>{item.Notification_message}</Paragraph>
                      <IconButton
                        style={{alignSelf:'flex-end'}}
                        icon="delete"
                        iconColor='#000'
                        size={20}
                        onPress={handleDelete(item)}
                      />
                  </Card>
        )}
        />
        : <View style={GlobalStyle.nodatafound}><Text>No Record Found</Text></View>
      }
    </View>
  )
}

export default Notification