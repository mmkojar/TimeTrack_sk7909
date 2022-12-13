import React from 'react'
import {  View,StyleSheet,Image,ScrollView,Pressable, Dimensions  } from 'react-native';
import { Button,Card,Avatar,Text } from 'react-native-paper';
import useThemeStyle from '../components/utils/useThemeStyle';
import { useDispatch,useSelector } from 'react-redux';

function Home({navigation}) {

    const [theme,GlobalStyle] = useThemeStyle();
    const authuser = useSelector((state) => state.auth.user);
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
                <Pressable onPress={handleTimeCard}>
                    <Card style={styles.innerItem} elevation={5}>
                            <Image
                                style={styles.image}
                                source={require('../assets/icons/4.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>Time Card</Text>
                    </Card>
                </Pressable> 
                <Pressable onPress={() => navigation.navigate('Holiday')}>
                    <Card style={styles.innerItem} elevation={5}>
                            <Image
                                style={styles.image}
                                source={require('../assets/icons/6.png')}
                            >
                            </Image>
                            <Text style={GlobalStyle.homeIconText}>Holiday List</Text>
                    </Card>
                </Pressable>                      
                <Pressable onPress={() => navigation.navigate('Notice')}> 
                    <Card style={styles.innerItem} elevation={5}>
                        <Image
                            style={styles.image}
                            // source={require('../assets/Icons/2.png')}
                            source={require('../assets/icons/7.png')}
                        >
                        </Image>
                        <Text style={GlobalStyle.homeIconText}>Notice Board</Text>
                    </Card>
                </Pressable>       
                <Pressable onPress={() => navigation.navigate('Notification')}>
                    <Card style={styles.innerItem} elevation={1}>
                        <Image
                            style={styles.image}                                
                            source={require('../assets/icons/9.png')}
                        >
                        </Image>
                        <Text style={GlobalStyle.homeIconText}>Notification</Text>
                    </Card>
                </Pressable>
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
        backgroundColor:"#fcfcfc",
    },
    innerItem:{
        width:width/3.3,
        padding:10,
        margin:3,
        borderRadius:6,        
    },
    image:{
        width:54,
        height:54,
        alignSelf:'center'
    },
})

export default Home
