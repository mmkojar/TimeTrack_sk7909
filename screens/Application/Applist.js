import React,{useEffect} from 'react'
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterList } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import LoopItems from '../Reusable/LoopItems';
import uuid from 'react-uuid';

const Applist = ({navigation}) => {

  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.reglist)
  const [theme] = useThemeStyle(); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegisterList());
  },[empcode])

  return (
    <View style={theme.dtcontainer}>
      <View style={{marginTop:5}}>
        <FlatList
            data={result && result.RegisterSortingList}
            keyExtractor={() => uuid()}
            renderItem={({item,index}) => (
              <LoopItems
                type="card" 
                navigation={navigation} 
                naviTo={item[index+1].replace(' ','')}
                naviObj={{
                  ecode:empcode,
                }}
                ctitle={item[index+1].replace('Register','Application')}
              />
          )}
        />
      </View>
    </View>
  )
}

export default Applist
