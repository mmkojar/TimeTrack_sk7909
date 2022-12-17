import React from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions  } from 'react-native';
import { Button,Card,Avatar,Text } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useSelector } from 'react-redux';


function Home({navigation}) {
     
    const [theme] = useThemeStyle();
    const authuser = useSelector((state) => state.auth.user);
    const empcode = useSelector((state) => state.auth.empcode)
    const { HomepageSettings: settings, ValidRegisterUser: vru } = useSelector((state) => state.auth.homepage);

    var hps = {};
    for (var i in settings) {
        Object.assign(hps,settings[i]);
    }
    const isHod = useSelector((state) => state.auth.isHod)
    const LogoTitle = () => {
        return (
          <Image
            style={{ width: 250, height: 50 }}
            source={{uri:vru.find(item => item.CLogo).CLogo}}
          />
        );
      }
    React.useLayoutEffect(() => {
        navigation.setOptions({
           // headerTitle: (props) => <LogoTitle {...props} /> 
        });
    }, [navigation]);

    const handleTimeCard = () => {
        if(isHod === 'true') {
            navigation.navigate('IsHod',{ecode:empcode})
        }
        else {
            navigation.navigate('SelfCard',{ecode:empcode})
        }
    }

    const handlePA = () => {
        if(isHod == 'true') {
            navigation.navigate('PAIsHod',{
                ecode:empcode
            })
        }
        else {
            navigation.navigate('PAtypes',{
                ecode:empcode,
                  type:'self',
                  api1:'GetEmployeePendingCount',
                  api2:'GetEmployeeCancellationPendingCount',
                  type:'self'
            })
        }
    }
    
        
    return (
        <ScrollView>
             {/* Display User Info */}
            <View>
                <Card.Title
                    style={[theme.cardTitle,{height:100,marginHorizontal:0,borderRadius:0,backgroundColor:theme.colors.primary}]}
                    title={authuser && authuser[0].EmpName}
                    titleStyle={{fontSize:20,marginTop:0,color:'#fff',textAlign:'center'}}
                    subtitle={'Todays In Time: '+ authuser[2].TodaysInTime}
                    subtitleStyle={{fontSize:16,textAlign:'center',color:'#fff'}}
                    left={(props) => <Avatar.Image size={80} source={authuser[1].ProfilePic ? {uri: authuser[1].ProfilePic} : require('../assets/user.png')} style={{marginLeft:20}} />}
                />
            </View>
            <View style={styles.container}>
                {
                    Object.entries(hps).forEach(function(key) {
                        // console.log(key, hps[key]);
                    })
                }
                {
                    hps['Attendance-Chart'] == 1 &&  <Pressable onPress={() => navigation.navigate('AtttendanceChart')}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/8.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Attendance Chart</Text>
                        </Card>
                    </Pressable>
                }
                
                {
                    hps['Time-Card'] == 1 && <Pressable onPress={handleTimeCard}>
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
                    hps['Pending-Application'] == 1 && <Pressable onPress={handlePA}>
                        <Card style={styles.innerItem} elevation={3}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/2.png')}
                                >
                                </Image>
                                <Text style={theme.homeIconText}>Pending Application</Text>
                        </Card>
                    </Pressable>
                } 
                {
                    hps['Application-Register'] == 1 && <Pressable onPress={() => navigation.navigate('RgList')}>
                        <Card style={styles.innerItem} elevation={5}>
                            <Image
                                style={styles.image}                                
                                source={require('../assets/icons/3.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Application Register</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Holiday-List'] == 1 && <Pressable onPress={() => navigation.navigate('Holiday')}>
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
                    hps['Notice-Board'] == 1 && <Pressable onPress={() => navigation.navigate('Notice')}> 
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
                    hps['Notification'] == 1 && <Pressable onPress={() => navigation.navigate('Notification')}>
                        <Card style={styles.innerItem} elevation={3}>
                            <Image
                                style={styles.image}                                
                                source={require('../assets/icons/9.png')}
                            >
                            </Image>
                            <Text style={theme.homeIconText}>Notification</Text>
                        </Card>
                    </Pressable>
                }
                
            </View>
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',        
        flexWrap: 'wrap',        
        justifyContent:'center',
        backgroundColor:"#fff",
    },
    innerItem:{
        width:width/3.3,
        height:126,
        justifyContent:'center',
        // padding:10,
        margin:3,
        borderRadius:5,       
    },
    image:{
        width:54,
        height:54,
        alignSelf:'center'
    },
})

export default Home
