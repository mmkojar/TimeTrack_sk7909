import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRegisterDetails } from '../../components/redux/actions/employeeActions'
import DetailScreen from '../Reusable/DetailScreen';

const RegisterDetails = ({navigation,route}) => {

    const {empcode, id, api, title } = route.params;
    const result = useSelector((state) => state.employee.regdetail)
    const entries = result && result.GetApplicationStatusReport && Object.entries(result.GetApplicationStatusReport[0]);
    const dispatch = useDispatch();
    
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title:title,
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
