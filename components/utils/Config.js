import AsyncStorage from "@react-native-async-storage/async-storage";


const getUrl = async () => {
    const url = await AsyncStorage.getItem('clientUrl');
    if(url) {        
        Config.clientUrl = url;
    }
}
getUrl();
const Config = {
    serverUrl:'https://timetrackweb.com/TimetrackMobileAppService/',
}

export default Config