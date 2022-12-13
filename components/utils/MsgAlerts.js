import React,{ useState } from 'react'
import { View, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';

function MsgAlerts({show,msg}) {

    /* useEffect(() => {
        getMsg();
    }, [])

    const getMsg = () => {
        if(msg) {
            if(msg !== null) {
                if(msg && status == "true") {
                    Alert.alert('Success',msg,[
                        {text: 'OK'}
                      ],{cancelable:true})
                }
                if(msg && status == "false") {
                    Alert.alert('Error',msg,[
                        {text: 'OK'}
                      ],{cancelable:true})
                }
            }  
        } 
    } */
    const [visible, setVisible] = useState(show);
    const onDismissSnackBar = () => {
        setVisible(false)
    };
    
    return (
        <View>
             <Snackbar
                visible={visible}
                // onDismiss={onDismissSnackBar}
                action={{
                label: 'Ok',
                    onPress: () => {
                        onDismissSnackBar()
                    },
                }}>
                {msg}
            </Snackbar>
        </View>
    );
}

export default MsgAlerts
