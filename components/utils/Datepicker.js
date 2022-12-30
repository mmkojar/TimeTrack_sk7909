import React,{ useState } from 'react'
import { StyleSheet, Platform, View } from 'react-native';
import { Modal, Portal, TextInput, Text ,withTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButtons from './CustomButtons';


const Datepicker = ({theme,datecount,date1,date2,setState1,setState2,placeholder1,placeholder2,style,mode}) => {

    //For Datepicker
    const [show,setShow] = useState(false);
    const [pickno,setPickno] = useState('');
    const [unix, setUnix] = useState(moment(new Date()).valueOf());

    const [picker1,setPicker1] = useState(moment().format('DD/MM/YYYY'));    
    const [picker2,setPicker2] = useState(moment().format('DD/MM/YYYY'));

    const onPickerChange = (event, selectedDate) => {
        
        setUnix(event.nativeEvent.timestamp);        
        if(mode == 'time') {
            var currentDate = moment(selectedDate).format('HH:mm');
        }
        else {
            var currentDate = moment(selectedDate).format('DD/MM/YYYY');
        }
        if(Platform.OS == 'android'){
            setShow(false);
            if(event.type == 'set') {                
                pickno == '1' ? setState1(currentDate) : setState2(currentDate);
            }
        }
        if(Platform.OS == 'ios') {
            pickno == '1' ? setPicker1(currentDate) : setPicker2(currentDate);
        }
                  
    };

    const showPicker = (no) => {
        setPickno(no);
        setShow(true)
        setVisible(true);
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
    let display = Platform.OS == 'ios' ? 'inline' : 'default';

    // For Modal
    const [visible, setVisible] = React.useState(false);
    const hideModal = () => setVisible(false);

    const handleIOSOK = () => {
        setShow(false);
    }
    let value = new Date(unix);
    const handleIOSCancel = () => {
        setShow(false);
        // pickno == '1' ? setState1('') : setState2('');
    }

    return (
        <>
        {
            show 
            &&
            (
                Platform.OS == 'ios' ?
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <DateTimePicker onChange={onPickerChange} value={value} mode={mode && mode} display={display} /> 
                        <View style={styles.action}>
                            {/* <View style={{width:'48%'}}>
                                <CustomButtons title="Cancel" pressHandler={handleIOSCancel} style={{width:'100%',marginTop:0}}></CustomButtons>
                            </View> */}
                            <View style={{marginLeft:10,width:'48%'}}>
                                <CustomButtons title="OK" pressHandler={handleIOSOK} style={{width:'100%',marginTop:0}}></CustomButtons>
                            </View>
                        </View>
                    </Modal>
                </Portal>
                :
                <DateTimePicker onChange={onPickerChange} value={new Date(unix)} mode={mode && mode} display={display}/>            
            )
        }
       
        {
            datecount == '2' ?
            <>
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('1')}                    
                    placeholder={placeholder1 && placeholder1}
                    value={Platform.OS='android' ? date1 : picker1}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                    editable={Platform.OS == 'ios' ? false : true}
                />
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('2')}
                    placeholder={placeholder2 && placeholder2}                    
                    value={Platform.OS='android' ? date2 : picker2}
                    caretHidden={true}
                    showSoftInputOnFocus={false}
                    editable={Platform.OS == 'ios' ? false : true}
                />
            </>
            :
            <TextInput
                style={[{fontSize:14,height:45},style && style]}
                onPressIn={() => showPicker('1')}
                placeholder={placeholder1 && placeholder1}                
                value={Platform.OS='android' ? date1 : picker1}
                caretHidden={true}
                showSoftInputOnFocus={false}
                editable={Platform.OS == 'ios' ? false : true}
            />
        }
        
        </>
    )
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor: 'white',
        padding:10,
        marginHorizontal:20,
        borderRadius:10
    },
    action : {
        display:'flex',
        flexDirection:'row',
        marginTop:30,
        alignSelf:'center',
    }
})

export default withTheme(Datepicker)
