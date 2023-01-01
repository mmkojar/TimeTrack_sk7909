import React,{useEffect} from 'react'
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterList } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import LoopItems from '../Reusable/LoopItems';

const RegisterList = ({navigation}) => {

  const { userid:empcode } = useSelector((state) => state.auth.logininfo)
  const result = useSelector((state) => state.employee.reglist)
  const [theme] = useThemeStyle(); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRegisterList());
  },[empcode])

  return (
    <View style={theme.dtcontainer}>
      <Dtheader headtitle={['All Register']}/>
      <View style={{marginTop:5}}>
        <FlatList
            data={result && result.RegisterSortingList}
            keyExtractor={(it,index) => index}
            renderItem={({item,index}) => (
              <LoopItems
                type="card" 
                navigation={navigation} 
                naviTo="RgItem"
                naviObj={{
                  ecode:empcode,
                  api:`Get${item[index+1].replace(' ','')}Self`,
                  title:item[index+1]
                }}
                ctitle={item[index+1]}
              />
          )}
        />
      </View>
    </View>
  )
}

export default RegisterList
