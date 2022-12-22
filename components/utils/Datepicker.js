import React,{ useState } from 'react'
import { TextInput,withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const Datepicker = ({theme,datecount,date1,date2,setState1,setState2,placeholder1,placeholder2,style,maxdate}) => {

    //For Datepicker
    const [show,setShow] = useState(false);
    const [pickno,setPickno] = useState('');

    const onPickerChange = (event, selectedDate) => {
        const currentDate = moment(selectedDate).format('DD/M/YYYY');
        setShow(false);
        pickno == '1' ? setState1(currentDate) : setState2(currentDate);
    };

    const showPicker = (no) => {
        setPickno(no);
        setShow(true)
     }

    return (
        <>
        {show && <DateTimePicker onChange={onPickerChange} value={new Date()} maximumDate={maxdate && maxdate}/>}
        {
            datecount == '2' ?
            <>
                <TextInput
                    style={style && style}
                    onPressIn={() => showPicker('1')}                    
                    placeholder={placeholder1 && placeholder1}
                    value={date1 && date1}
                />
                <TextInput
                    style={style && style}
                    onPressIn={() => showPicker('2')}
                    placeholder={placeholder2 && placeholder2}
                    value={date2 && date2}
                /> 
            </> 
            :
            <TextInput
                style={style && style}
                onPressIn={() => showPicker('1')}
                placeholder={placeholder1 && placeholder1}
                value={date1 && date1}
            />
        }
        
        </>
    )
}

export default withTheme(Datepicker)
