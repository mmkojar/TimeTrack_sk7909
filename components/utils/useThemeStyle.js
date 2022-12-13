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

    const theme = {
  
        ...MD2LightTheme,
        roundness: 4,
        colors: {
            ...MD2LightTheme.colors,
            primary:'#3174AE',
            accent: '#e6e7e8',
        },
        fonts: configureFonts({config: fontConfig, isV3: false}),
    };
    
    const GlobalStyle = StyleSheet.create({
        primarycolor:{
            color:theme.colors.primary
        },
        secondarycolor:{
            color:theme.colors.accent
        },
        homeIconText :{
            color:theme.colors.primary,
            marginTop:12,
            fontSize:15,
            textAlign:'center',
        },
        container: {
            flex:1,
            marginVertical:3,
        },
        card:{
            marginHorizontal:6,
            marginBottom:6,
            borderWidth:0.6,
            padding:8,
            borderColor:'#fff',
            borderRadius:6,
        },
        cardTitle:{        
            backgroundColor:theme.colors.accent,
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
            height: 55,  
            backgroundColor:'#fff',      
            borderColor:theme.colors.primary,
            shadowOffset:0,
            color:theme.colors.primary,
            fontSize:17,
            borderWidth: 1,
            borderRadius:5,
        },
        nodatafound:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        },
        dtheader:{
            fontSize:18,
        },
    })

    return [
        theme, GlobalStyle
    ];
};
  
export default useThemeStyle;