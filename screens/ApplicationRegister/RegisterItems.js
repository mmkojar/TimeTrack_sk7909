import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native';
import { getRegisterItems } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import LoopItems from '../Reusable/LoopItems';
import moment from 'moment';
import Nodatafound from '../Reusable/Nodatafound';

const RegisterItems = ({navigation,route}) => {

  const [theme,GlobalStyle] = useThemeStyle();
  const { api,ecode,title } = route.params;
  const result = useSelector((state) => state.employee.regitem)
  
  const dispatch = useDispatch();

    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:title,
      });
  }, [navigation]);

  useEffect(() => {
    dispatch(getRegisterItems(api,ecode));
  },[])

  const headtitles = result.GetTimeCardForPageLoad && Object.keys(result.GetTimeCardForPageLoad[0]);
  
  // delete header.Id  
  const checkKey = Object.keys(result)[0];
  
  return (
    <View style={GlobalStyle.dtcontainer}>
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
