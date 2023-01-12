import React,{useEffect} from 'react'
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { geAttMarkerDetails } from '../components/redux/actions/employeeActions'
import useThemeStyle from '../components/utils/useThemeStyle';
import Dtheader from './Reusable/Dtheader';
import LoopItems from './Reusable/LoopItems';
import uuid from 'react-uuid';
import Nodatafound from './Reusable/Nodatafound';

const MarkEmpAtt = ({navigation,route}) => {

  const ecode = route.params.ecode;
  const result = useSelector((state) => state.employee.markattdetail)
  const [theme] = useThemeStyle(); 
  
  var repoarry = '';
  const dispatch = useDispatch();    
  for(var i in result && result.TeamAttendance) {
    repoarry = (result.TeamAttendance[i].EmployeeList);
  }
  useEffect(() => {
    dispatch(geAttMarkerDetails(ecode));
  },[ecode])

  return (
    <View style={theme.dtcontainer}>
      <Dtheader headtitle={['Team Members']}/>
      {
        result && result.TeamAttendance[0].msg == 'Employee Found' ? 
        <View style={{marginTop:5}}>
            <FlatList
                data={repoarry && repoarry}
                keyExtractor={() => uuid()}
                renderItem={({item,index}) => (
                <LoopItems
                    type="card" 
                    navigation={navigation} 
                    naviTo="MarkAtt" 
                    naviObj={{
                    ecode:item['EmpCode']
                    }}
                    ctitle={item['EmpName']}
                />
            )}
            />
        </View> :
        <Nodatafound />
      }
      
    </View>
  )
}

export default MarkEmpAtt
