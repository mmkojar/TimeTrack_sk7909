import  { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1NumberOfLines={10}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
          fontFamily:'VarelaRound-Regular'                  
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red', borderColor:'#e6e7e8',borderWidth:1 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1NumberOfLines={10}
        text1Style={{
            fontSize: 14,
            fontWeight: '400',
            fontFamily:'VarelaRound-Regular'                    
        }}
      />
    ),
};

export default toastConfig