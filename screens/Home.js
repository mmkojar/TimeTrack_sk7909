import React, {useEffect,useState} from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions, Platform, BackHandler, Alert } from 'react-native';
import { Card,Avatar,Text } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { GetHPEmployeeDevice, getHPEmployeeInfo, getHomePageInfo } from '../components/redux/actions/authActions';
import { appPermissions } from '../services/AppPermissions';
import { PERMISSIONS } from 'react-native-permissions';
import { useIsFocused } from '@react-navigation/native';
import useHelper from '../components/hooks/useHelper';
import deviceInfo from 'react-native-device-info';

const Home = ({navigation}) => {
     
    const [theme] = useThemeStyle();
    const { token,deviceId } = useHelper();

    const authData = useSelector((state) => state.auth.logininfo)
    const authuser = useSelector((state) => state.auth.empinfo);
    const result = useSelector((state) => state.auth.hpsettings);
    
    let checkey = authuser && Object.keys(authuser[0])[0]
    let checkStatus = result && result.validreguser.find(item => item.Status).Status;
    let footerlogo = result&&result.validreguser.find(item => item.CLogo);    
    let CopyRight = result && result.validreguser.find(item => item.CopyRight);

    let userid = authData&&authData.userid
    let password = authData&&authData.password
    let key = authData&&authData.key
    let isHod = authData&&authData.isHod
    let clientUrl = authData&&authData.clientUrl
    
    var hps = {};
    for (var i in result&&result.homepagesetts) {
        Object.assign(hps,result.homepagesetts[i]);
    }
         
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    
    const backAction = () => {
        if (navigation.isFocused()) {
            Alert.alert('Exit App!', 'Are you sure you want to exit app?', [
               { text: 'Cancel', onPress: () => null },
               { text: 'Yes', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        }
    };

    useEffect(() => {
        // console.log('debug');
        dispatch(GetHPEmployeeDevice(clientUrl,userid,deviceId&&deviceId,token&&token));
        dispatch(getHomePageInfo(userid,password,key));
        dispatch(getHPEmployeeInfo(clientUrl,userid));
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        }
    },[isFocused,userid,password,key,deviceId,token])

    const handleTimeCard = () => {
        if(isHod === 'true') {
            navigation.navigate('IsHod',{ecode:userid})
        }
        else {
            navigation.navigate('SelfCard',{ecode:userid})
        }
    }

    const handlePA = () => {
        if(isHod == 'true') {
            navigation.navigate('PAIsHod',{
                ecode:userid
            })
        }
        else {
            navigation.navigate('PAtypes',{
                ecode:userid,
                type:'self',
                api1:'GetEmployeePendingCount',
                api2:'GetEmployeeCancellationPendingCount'
            })
        }
    }
    const checkPermi = (navi,param) => {
        if(Platform.OS ==  'android') {
            appPermissions.requestMultiple([PERMISSIONS.ANDROID.CAMERA,PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],navi,param);
        }
        if(Platform.OS ==  'ios') {
            appPermissions.requestMultiple([PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],navi,param);
        }
    }
            
    return (        
        <View style={styles.container}>
            <ScrollView>
                {/* Display User Info */}
                {
                    checkey!=='Status' &&
                    <View>
                        <Card.Title
                            style={[theme.cardTitle,{height:100,marginHorizontal:0,borderRadius:0,backgroundColor:theme.colors.primary}]}
                            title={authuser && authuser[0].EmpName}
                            titleStyle={{fontSize:20,marginTop:0,color:'#fff',textAlign:'center'}}
                            subtitle={'Todays In Time: '+ (authuser && authuser[2].TodaysInTime)}
                            subtitleStyle={{fontSize:16,textAlign:'center',color:'#fff'}}
                            left={(props) => <Avatar.Image size={80} source={authuser ? {uri: authuser[1].ProfilePic} : require('../assets/user.png')} />}
                        />
                    </View>
                }
               
                
                <View style={styles.cardstyles}>
                {
                    hps['Attendance-Chart'] === '1' &&  <Pressable onPress={() => navigation.navigate('AtttendanceChart')}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/8.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Attendance {"\n"}Chart</Text>
                        </Card>
                    </Pressable>
                }
                
                {
                    hps['Time-Card'] === '1' && <Pressable onPress={handleTimeCard}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/4.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Time Card</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['MarkMyAttendance'] === '1' && <Pressable onPress={() => checkPermi('MarkAtt',{ecode:userid,isHod:isHod})}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/5.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Mark My {"\n"}Attendance</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Application'] === '1' && <Pressable onPress={() => navigation.navigate('App')}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/1.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Application</Text>
                        </Card>
                    </Pressable>
                } 
                {
                    hps['Pending-Application'] === '1' && <Pressable onPress={handlePA}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/2.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Pending {"\n"}Application</Text>
                        </Card>
                    </Pressable>
                } 
                {
                    hps['Application-Register'] === '1' && <Pressable onPress={() => navigation.navigate('RgList')}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/icons/3.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Application {"\n"}Register</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Holiday-List'] === '1' && <Pressable onPress={() => navigation.navigate('Holiday')}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/6.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Holiday List</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Notice-Board'] === '1' && <Pressable onPress={() => navigation.navigate('Notice')}> 
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}
                                source={require('../assets/icons/7.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Notice Board</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Notification'] === '1' && <Pressable onPress={() => navigation.navigate('Notifi')}>
                        <Card style={styles.innerItem} elevation={3}>
                            {
                                checkey!=='Status' && 
                                <Avatar.Text label={authuser && authuser[3].NotificationCount} size={22} style={{position:'absolute',top:-14,right:10}}/>
                            }
                            <Image
                                style={styles.image}                                
                                source={require('../assets/icons/9.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Notification</Text>
                        </Card>
                    </Pressable>
                }
                <Pressable onPress={() =>checkPermi('livetracking',{})}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={require('../assets/location.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Location{"\n"}Tracking</Text>
                        </Card>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={{alignItems:'center',padding:5}}>
                {
                    checkStatus!=='Invalid' &&
                    <>
                    {
                        footerlogo !== undefined &&
                        <Image
                            style={{ width: 250, height: 42 }}
                            source={{uri:result&&result.validreguser.find(item => item.CLogo).CLogo}}
                        />
                    }               
                
                    {
                        CopyRight !== undefined &&
                        <Text style={{fontSize:16}}>
                        {
                            result&&result.validreguser.find(item => item.CopyRight).CopyRight.replace('?','\u00A9 ')
                        }
                        </Text>
                    }
                    
                    </>
                }            
                <Text>Version {deviceInfo.getVersion()}</Text>
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    cardstyles:{        
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'center',
    },
    innerItem:{
        width:width/3.3,
        height:126,
        justifyContent:'center',
        margin:3,
        marginHorizontal:4,
        borderRadius:5,
    },
    image:{
        width:54,
        height:54,
        alignSelf:'center'
    },
})

export default Home
