import { StyleSheet } from 'react-native';
import { configureFonts, MD2LightTheme } from 'react-native-paper';
import { Platform } from 'react-native';

const useThemeStyle = () => {        
    
    const fontConfig = {
        ios: {
          regular: {
            fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
            fontWeight: 'normal',
          }
        },
        android: {
          regular: {
            fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
            fontWeight: 'normal',
          },
        }
       /*  customVariant: {
            fontFamily: Platform.select({
              web: 'VarelaRound-Regular',
              android: 'VarelaRound-Regular',
              ios: 'FontAwesome',
              default: 'VarelaRound-Regular',
            }),
            fontWeight: '400',
            letterSpacing: 0.5,
            lineHeight: 22,
            fontSize: 20,
          } */
    };

    const primary = '#3174AE'
    const accent = '#e6e7e8'

    const theme = {
  
        ...MD2LightTheme,
        roundness: 4,
        colors: {
            ...MD2LightTheme.colors,
            primary: primary,
            accent: accent,
        },
        fonts: configureFonts({config: fontConfig, isV3: false}),      
        homeIconText :{
            color:primary,
            marginTop:12,
            // fontSize:14,
            textAlign:'center',
        },
        container: {
            flex:1,
            marginVertical:3,
        },
        dtcontainer:{
            flex:1,
        },
        card:{
            marginHorizontal:8,
            marginBottom:6,
            borderWidth:0.6,
            padding:8,
            borderColor:'#fff',
            borderRadius:5,
        },
        cardTitle:{        
            backgroundColor:accent,            
            marginHorizontal:8,
            borderRadius:5,
            marginBottom:6,
            minHeight:30
        },
        avatar:{
            height: 100,
            width:100,
            alignSelf:'center',
            borderRadius:50,
            marginTop:10,
        },
        textinput:{
            height: 45,  
            backgroundColor:'#fff',      
            borderColor:primary,            
            color:primary,
            fontSize:17,
            borderWidth: 1,
            borderRadius:5,
        },
        appheading:{
            color:primary,
            fontSize:22,
            marginBottom:5
        },
        applabel:{
            fontSize:15,
            marginBottom:3
        }
    };

    return [
        theme
    ];
};
  
export default useThemeStyle;