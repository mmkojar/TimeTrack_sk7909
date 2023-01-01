import React,{useEffect} from 'react'
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterDetails, insertAppForm } from '../../components/redux/actions/employeeActions'
import DetailScreen from '../Reusable/DetailScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigate } from '../../services/RootNavigation';

const RegisterDetails = ({navigation,route}) => {

    const {empcode, id, api, title } = route.params;
    const result = useSelector((state) => state.employee.regdetail)
    const entries = result && result.GetApplicationStatusReport && Object.entries(result.GetApplicationStatusReport[0]);
    const dispatch = useDispatch();
    let apptype = title.split(' ')[0];
    if(apptype == 'Od') {
      apptype = 'OutDoor';
    }
    else if(apptype == 'Coff'){
      apptype = 'CompOff'
    }
    
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:title,
        headerRight: () => (
          <View style={{flexDirection: "row",justifyContent: "space-evenly",marginRight:0}}>
            <Button
                onPress={() => {
                  Alert.alert('Message','Are You Sure you want to delete?',[
                  {text: 'Yes', onPress:() => {
                    dispatch(insertAppForm(`GetApplicationsForCancellation?EmpCode=${empcode}&Apptype=${apptype}&ID=${id}`));                      
                    navigation.goBack();
                  }},
                  {text:'No'}
                  ],{cancelable:true})
                  
                  }}
                  style={{marginRight:-24}}
              >
              <MaterialCommunityIcons                  
                    name="delete"
                    size={20}
                    color="#fff"                    
                />
            </Button>
            <Button
                  onPress={() => {
                    navigate('Home');
                  }}                  
              >
              <MaterialCommunityIcons
                    onPress={() => {
                      navigate('Home');
                  }}
                  name="home"
                  size={20}
                  color="#fff"
                />
            </Button>
          </View>            
        )
      });
  }, [navigation]);

    useEffect(() => {
        dispatch(getRegisterDetails(api,empcode,id));
    },[])

    return (
        <DetailScreen entries={entries} title={`${title} Details`} />
    )
}

export default RegisterDetails
