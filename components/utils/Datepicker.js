import React,{ useState } from 'react'
import { StyleSheet, Platform, View } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CustomButtons from './CustomButtons';

const Datepicker = ({datecount,date1,date2,setState1,setState2,placeholder1,placeholder2,style,mode}) => {

    //For Datepicker
    const [show,setShow] = useState(false);
    const [pickno,setPickno] = useState('');
    const [unix, setUnix] = useState(moment(new Date()).valueOf());

    const onPickerChange = (event, selectedDate) => {
        
        Platform.OS == 'android' && setShow(false);
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
        Platform.OS == 'ios' && setVisible(true);
    }    
    // For Modal
    const [visible, setVisible] = React.useState(false);    

    const handleIOSCancel = () => {
        setShow(false);
        setUnix(moment(new Date()).valueOf());
        if(mode == 'time') {
            pickno == '1' ? setState1(moment().format('HH:mm')) : setState2(moment().format('HH:mm'));
        }
        else {
            pickno == '1' ? setState1(moment().format('DD/MM/YYYY')) : setState2(moment().format('DD/MM/YYYY'));
        }
    }

    return (
        <>
        {
            show 
            &&
            (
                Platform.OS == 'ios' ?
                <Portal>
                    <Modal visible={visible} dismissable={false} contentContainerStyle={styles.modal}>
                        <DateTimePicker onChange={onPickerChange} value={new Date(unix)} mode={mode && mode} display='inline' />
                        <View style={styles.action}>
                            <View style={{width:'48%'}}>
                                <CustomButtons title="Cancel" pressHandler={handleIOSCancel} style={{width:'100%',marginTop:0}}></CustomButtons>
                            </View>
                            <View style={{marginLeft:10,width:'48%'}}>
                                <CustomButtons title="OK" pressHandler={() => setShow(false)} style={{width:'100%',marginTop:0}}></CustomButtons>
                            </View>
                        </View>
                    </Modal>
                </Portal>
                :
                <DateTimePicker onChange={onPickerChange} value={new Date(unix)} mode={mode && mode} display='default'/>            
            )
        }
       
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
                    editable={Platform.OS == 'ios' ? false : true}
                />
                <TextInput
                    style={[{fontSize:14,height:45},style && style]}
                    onPressIn={() => showPicker('2')}
                    placeholder={placeholder2 && placeholder2}                    
                    value={date2}
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
                value={date1}
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
        borderRadius:10,
    },
    action : {
        display:'flex',
        flexDirection:'row',
        marginTop:30,
        alignSelf:'center',
    }
})

export default Datepicker