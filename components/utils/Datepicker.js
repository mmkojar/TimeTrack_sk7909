import React,{ useState } from 'react'
import { TextInput,withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const Datepicker = ({theme,datecount,date1,date2,setState1,setState2,placeholder1,placeholder2,style,maxdate,mode}) => {

    //For Datepicker
    const [show,setShow] = useState(false);
    const [pickno,setPickno] = useState('');

    const onPickerChange = (event, selectedDate) => {
        setShow(false);
        if(event.type == 'set') {
            if(mode == 'time') {
                var currentDate = moment(selectedDate).format('HH:mm');
            }
            else {
                var currentDate = moment(selectedDate).format('YYYY-MM-DD');
            }
            pickno == '1' ? setState1(currentDate) : setState2(currentDate);
        }               
    };

    const showPicker = (no) => {
        setPickno(no);
        setShow(true)
    }

    if(!mode) {
        var unix1 =  moment(date1).valueOf();
        var unix2 =  moment(date2).valueOf();
        
        var unix =  pickno == '1' ? unix1 : unix2;
    }
    else {
        var unix1 =  date1;
        var unix2 =  date2;
    }   

    return (
        <>
        {
            show &&     
            (
                mode ? 
                <DateTimePicker onChange={onPickerChange} value={new Date()} mode={mode && mode}/> 
                : 
                <DateTimePicker onChange={onPickerChange} value={new Date(unix)} maximumDate={maxdate && maxdate} />
            )
        }
        {
            datecount == '2' ?
            <>
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('1')}                    
                    placeholder={placeholder1 && placeholder1}
                    value={mode ? unix1 : moment(unix1).format('DD/MM/YYYY')}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                />
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('2')}
                    placeholder={placeholder2 && placeholder2}
                    value={mode ? unix2 : moment(unix2).format('DD/MM/YYYY')}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                /> 
            </> 
            :
            <TextInput
                style={[{fontSize:14,height:45},style && style]}
                onPressIn={() => showPicker('1')}
                placeholder={placeholder1 && placeholder1}
                value={mode ? unix1 : moment(unix1).format('DD/MM/YYYY')}
                caretHidden={true}
                showSoftInputOnFocus={false}
            />
        }
        
        </>
    )
}

export default withTheme(Datepicker)
