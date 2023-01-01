import React,{useEffect} from 'react'
import { View } from 'react-native'
import { Card, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getNoticeBoard } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';

const Notice = () => {

  const [theme] = useThemeStyle();
  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const notice = useSelector((state) => state.employee.notice)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getNoticeBoard(empcode));    
  },[empcode])

  return (
    <View style={theme.container}>
      <Card style={theme.card} elevation={3}>
          <Paragraph>{notice && notice.NoticeBoard}</Paragraph>
      </Card>
    </View>
  )
}

export default Notice