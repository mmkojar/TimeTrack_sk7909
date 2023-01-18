import React,{useEffect} from 'react'
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getHodReportee } from '../../components/redux/actions/employeeActions'
import useThemeStyle from '../../components/utils/useThemeStyle';
import Dtheader from '../Reusable/Dtheader';
import LoopItems from '../Reusable/LoopItems';
import uuid from 'react-uuid';
import Nodatafound from '../Reusable/Nodatafound';

const TeamAttendance = ({navigation,route}) => {

  const empcode = route.params.ecode;
  const result = useSelector((state) => state.employee.hodreportee)
  const [theme] = useThemeStyle(); 

  const repoarry = [];
  const dispatch = useDispatch();

  for(var i in result && result.GetHODReporteeList) {
    repoarry.push(Object.assign({},...result.GetHODReporteeList[i].Reportee));
  }
  
  useEffect(() => {
    dispatch(getHodReportee(empcode));    
  },[empcode])
  
  return (
    <View style={theme.dtcontainer}>
      <Dtheader headtitle={['Team Members']}/>
      {
        repoarry.length > 0 ?
        <View style={{marginTop:5}}>
          <FlatList
              data={repoarry && repoarry}
              keyExtractor={() => uuid()}
              renderItem={({item,index}) => (
                <LoopItems
                  type="card" 
                  navigation={navigation} 
                  naviTo="SelfCard" 
                  naviObj={{
                    ecode:item['Reportee Code'] 
                  }}
                  ctitle={item['Reportee Name']}
                />
            )}
          />
        </View>
        :
        <Nodatafound/>
      }
      
    </View>
  )
}

export default TeamAttendance
