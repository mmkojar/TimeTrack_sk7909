import  { BaseToast, ErrorToast } from 'react-native-toast-message';

/*
  1. Create the config
*/
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
        text1NumberOfLines={5}
        text1Style={{
          fontSize: 15,
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
        style={{ borderLeftColor: 'red' }}
        text1NumberOfLines={5}
        text1Style={{
            fontSize: 15,
            fontWeight: '400',
            fontFamily:'VarelaRound-Regular'                    
        }}
      />
    ),
};

export default toastConfig