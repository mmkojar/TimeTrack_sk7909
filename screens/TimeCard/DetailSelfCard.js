import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailTimeCardForSelf } from '../../components/redux/actions/employeeActions'
import DetailScreen from '../Reusable/DetailScreen';

const DetailSelfCard = ({route}) => {

    const { tr_date, empcode } = route.params;
    const dt_tcself = useSelector((state) => state.employee.dt_tcardself)
    const entries = dt_tcself && dt_tcself.GetTimeCardForPageLoad && Object.entries(dt_tcself.GetTimeCardForPageLoad[0]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetailTimeCardForSelf(empcode,tr_date));
    },[])

    return (
        <DetailScreen entries={entries} title={`Time Card for: ${tr_date}`}/>
    )
}

export default DetailSelfCard
