import React from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions  } from 'react-native';
import { Button,Card,Avatar,Text } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useSelector } from 'react-redux';

function Home({navigation}) {

    const [theme,GlobalStyle] = useThemeStyle();
    const authuser = useSelector((state) => state.auth.user);
    const { HomepageSettings: settings } = useSelector((state) => state.auth.homepage);
    var hps = {};
    for (var i in settings) {
        Object.assign(hps,settings[i]);
    }    
    const isHod = useSelector((state) => state.auth.isHod)

    const handleTimeCard = () => {
        if(isHod) {
            navigation.navigate('IsHod')
        }
        else {
            navigation.navigate('SelfCard')
        }
    }
        
    return (
        <ScrollView>
             {/* Display User Info */}
            <View>
                <Card.Title              
                    style={[GlobalStyle.cardTitle,{height:120,backgroundColor:'#fff'}]}
                    title={authuser[0].EmpName}
                    titleStyle={{fontSize:20,marginTop:0,textAlign:'center'}}
                    subtitle={'Todays In Time: '+ authuser[2].TodaysInTime}
                    subtitleStyle={{fontSize:16,textAlign:'center'}}
                    left={(props) => <Avatar.Image size={100} source={{uri: authuser[1].ProfilePic}}  />}
                />
            </View>
            <View style={styles.container}>
                {
                    Object.entries(hps).forEach(function(key) {
                        console.log(key, hps[key]);
                    })
                }
                {
                    hps['Attendance-Chart'] == 1 &&  <Pressable onPress={() => navigation.navigate('AtttendanceChart')}>
                        <Card style={styles.innerItem} elevation={5}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/8.png')}
                                >
                                </Image>
                                <Text style={GlobalStyle.homeIconText}>Atttendance Chart</Text>
                        </Card>
                    </Pressable>
                }
                
                {
                    hps['Time-Card'] == 1 && <Pressable onPress={handleTimeCard}>
                        <Card style={styles.innerItem} elevation={5}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/4.png')}
                                >
                                </Image>
                                <Text style={GlobalStyle.homeIconText}>Time Card</Text>
                        </Card>
                    </Pressable>
                } 
                {
                    hps['Holiday-List'] == 1 && <Pressable onPress={() => navigation.navigate('Holiday')}>
                        <Card style={styles.innerItem} elevation={5}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/icons/6.png')}
                                >
                                </Image>
                                <Text style={GlobalStyle.homeIconText}>Holiday List</Text>
                        </Card>
                    </Pressable>
                }
                {
                    hps['Notice-Board'] == 1 && <Pressable onPress={() => navigation.navigate('Notice')}> 
                        <Card style={styles.innerItem} elevation={5}>
                            <Image
                                style={styles.image}
                                source={require('../assets/icons/7.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>Notice Board</Text>
                        </Card>
                    </Pressable>
                }      
                {
                    hps['Notification'] == 1 && <Pressable onPress={() => navigation.navigate('Notification')}>
                        <Card style={styles.innerItem} elevation={5}>
                            <Image
                                style={styles.image}                                
                                source={require('../assets/icons/9.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>Notification</Text>
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
        padding:10,
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
