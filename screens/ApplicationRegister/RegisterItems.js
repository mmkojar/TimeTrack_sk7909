import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getRegisterItems } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import LoopItems from '../Reusable/LoopItems';
import Nodatafound from '../Reusable/Nodatafound';
import { useIsFocused } from '@react-navigation/native';

const RegisterItems = ({navigation,route}) => {

  const [theme] = useThemeStyle();
  const { api,ecode,title } = route.params;
  const result = useSelector((state) => state.employee.regitem)
   
  React.useLayoutEffect(() => {
      navigation.setOptions({
        title:title,
      });
  }, [navigation]);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getRegisterItems(api,ecode));
  },[isFocused])

  const checkKey = result && Object.keys(result)[0];
  const headtitles = (checkKey == 'GetTimeCardForPageLoad') && Object.keys(result.GetTimeCardForPageLoad[0]);
  
  return (
    <View style={theme.dtcontainer}>
      {
        checkKey == 'GetTimeCardForPageLoad' ? 
        <>
        <Dtheader headtitle={headtitles.filter(item => item !== 'Id')} />
        <FlatList
            data={result && result.GetTimeCardForPageLoad}
            keyExtractor={(item) => item.Id}
            renderItem={({item}) => (
                <LoopItems
                  type='dt'
                  navigation={navigation}
                  naviTo="RgDetails" 
                  naviObj={{
                      empcode:ecode,
                      id:item.Id,
                      api:`GetDetailed${title.replace(' ','')}Self`,
                      title:`${title}`
                  }}
                  dttable={Object.values(item).filter((it,index) => index !== 0)}
                />
            )}
        />
        </>
      : <Nodatafound />
      }
      
    </View>
  )
}

export default RegisterItems
