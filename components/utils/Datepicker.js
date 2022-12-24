import React,{ useState } from 'react'
import { TextInput,withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const Datepicker = ({theme,datecount,date1,date2,setState1,setState2,placeholder1,placeholder2,style,mode}) => {

    //For Datepicker
    const [show,setShow] = useState(false);
    const [pickno,setPickno] = useState('');
    const [unix, setUnix] = useState(moment(new Date()).valueOf());

    const onPickerChange = (event, selectedDate) => {        
        setShow(false);
        setUnix(event.nativeEvent.timestamp);
        if(event.type == 'set') {
            if(mode == 'time') {
                var currentDate = moment(selectedDate).format('HH:mm');
            }
            else {
                var currentDate = moment(selectedDate).format('DD/MM/YYYY');
            }
            pickno == '1' ? setState1(currentDate) : setState2(currentDate);
        }               
    };

    const showPicker = (no) => {
        setPickno(no);
        setShow(true)
    }    
    /* if(!mode) {
        var unix1 =  moment(date1).valueOf();
        var unix2 =  moment(date2).valueOf();
        
        var unix =  pickno == '1' ? unix1 : unix2;
    }
    else {
        var unix1 =  date1;
        var unix2 =  date2;
    } */

    return (
        <>
        { show && <DateTimePicker onChange={onPickerChange} value={new Date(unix)} mode={mode && mode}/> }
        {
            datecount == '2' ?
            <>
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('1')}                    
                    placeholder={placeholder1 && placeholder1}
                    value={date1}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                />
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('2')}
                    placeholder={placeholder2 && placeholder2}                    
                    value={date2}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                /> 
            </> 
            :
            <TextInput
                style={[{fontSize:14,height:45},style && style]}
                onPressIn={() => showPicker('1')}
                placeholder={placeholder1 && placeholder1}                
                value={date1}
                caretHidden={true}
                showSoftInputOnFocus={false}
            />
        }
        
        </>
    )
}

export default withTheme(Datepicker)
