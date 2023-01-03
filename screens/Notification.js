import React,{useEffect} from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Card, Paragraph, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, updateNotification } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Nodatafound from './Reusable/Nodatafound';
import moment from 'moment'

const Notification = () => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const notifi = useSelector((state) => state.employee.notify)
 
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getNotification(empcode,'1'));
    
  },[])

  const handlePress = (item) => {
    dispatch(updateNotification(empcode,item.id,'1','0'))
  }

  const handleDelete = (item) => {
    dispatch(updateNotification(empcode,item.id,'0','1'))    
  }

  return (
    <View style={theme.container}>
      {
        notifi && notifi.Notification && notifi.Notification.length > 0 ? 
          <FlatList
              data={notifi && notifi.Notification}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                  <Pressable onPress={() => handlePress(item)}>
                    <Card style={[theme.card,{padding:10,backgroundColor:`${item.IsRead == '0' ? theme.colors.accent : '#fff'}`}]} elevation={5} >
                        <Card.Title 
                          style={{marginTop:-20,marginLeft:-15}}
                          title={item.Application_Type}
                          titleStyle={{color:theme.colors.primary}}
                          subtitle={moment(item.NotificationDate).format('DD-MMM-YYYY h:mm')}
                          subtitleStyle={{color:'#000'}}
                          right={(props) => 
                            <IconButton                            
                              icon="delete"
                              iconColor='#000'
                              size={20}
                              onPress={() => handleDelete(item)}
                            />
                        }
                        />                    
                        <Paragraph>{item.Notification_message}</Paragraph>                    
                    </Card>
                  </Pressable>
              )}
          />
        : <Nodatafound />
      }
    </View>
  )
}

export default Notification