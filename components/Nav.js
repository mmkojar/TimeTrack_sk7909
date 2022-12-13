import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import HolidayScreen from '../screens/Holiday';
import NoticeScreen from '../screens/Notice';
import NotificationScreen from '../screens/Notification';
import IsHodScreen from '../screens/TimeCard/IsHod';
import SelfCardScreen from '../screens/TimeCard/SelfCard';
import DetailSelfCardScreen from '../screens/TimeCard/DetailSelfCard';
import TeamAttendanceScreen from '../screens/TimeCard/TeamAttendance';
// import AttendeeProfile from '../screens/AttendeeProfile';
// import DelegatesScreen from '../screens/Delegates';
// import ChatBoxScreen from '../screens/ChatBox';
// import EventOverviewScreen from '../screens/Event_overview';
// import ChatListScreen from '../screens/ChatList';
// import NotificationScreen from '../screens/Notifications';
// import AgendaScreen from '../screens/Agenda';
// import AgendaDetailScreen from '../screens/AgendaDetail';
// import SpeakersScreen from '../screens/Speakers';
// import SponsorsScreen from '../screens/Sponsors';
// import ExhibitorsScreen from '../screens/Exhibitors';
// import GalleryScreen from '../screens/Gallery';
// import FAQScreen from '../screens/FAQ';
// import SupportScreen from '../screens/Support';
// import PollsScreen from '../screens/Polling';
// import PollViewScreen from '../screens/PollView';
// import ScanQR from '../screens/ScanQR';
// import useThemeStyle from './utils/useThemeStyle';

const Stack = createStackNavigator();

const Nav = ({color, refer}) => {
     
//   const [theme,GlobalStyle] = useThemeStyle();

  const authData = useSelector((state) => state.auth);
  const { isAuthenticated } = authData;
  
  return (
    // <SafeAreaView>    
    <NavigationContainer ref={refer}>
        { isAuthenticated ?  (
            <Stack.Navigator initialRouteName='Home' 
                screenOptions={({route}) => ({
                animationEnabled:false,
                headerStyle: {
                    backgroundColor: color,
                },
                headerTintColor:'#fff',
                headerTitleAlign:'left',
                headerTitleStyle: {
                    fontFamily:'VarelaRound-Regular'
                },
                cardStyle:{
                    backgroundColor:'#FFFFFF'
                }
            })}
            >
            <Stack.Screen name="Home" component={HomeScreen}
                options={{
                    title:'Time Track Mobile App',
                }} 
            /> 
            <Stack.Screen name="Holiday" component={HolidayScreen} 
                options={{
                title:'Holiday List',                   
                }} />
            <Stack.Screen name="Notice" component={NoticeScreen} 
                options={{
                    title:'Notice Board',                   
                }}/>
            <Stack.Screen name="Notification" component={NotificationScreen} 
                options={{
                title:'Notification',                   
                }} />
            <Stack.Screen name="TeamAttendance" component={TeamAttendanceScreen} 
                options={{
                title:'Team Attendance',                   
                }} />
            <Stack.Screen name="IsHod" component={IsHodScreen} 
                options={{
                title:'Time Card',                   
                }} />
            <Stack.Screen name="SelfCard" component={SelfCardScreen} 
                options={{
                title:'Time Card',                   
                }} />
            <Stack.Screen name="DSelfCard" component={DetailSelfCardScreen} 
                options={{
                title:'Time Card',                   
                }} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} 
                options={{
                title:'User Profile',                   
                }} />
            <Stack.Screen name="Delegates" component={DelegatesScreen} />
            <Stack.Screen name="AttendeeProfile" component={AttendeeProfile} 
                options={{
                title:'Attendee Profile',                   
                }} />
            <Stack.Screen name="ChatBox" component={ChatBoxScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} 
                options={{
                title:'Chats',                   
                }}/>
            <Stack.Screen name="EventOverview" component={EventOverviewScreen} 
              options={{
               title:'Event Overview',                   
              }}/>
            <Stack.Screen name="Agenda" component={AgendaScreen} />
            <Stack.Screen name="AgendaDetail" component={AgendaDetailScreen} 
                options={{
                    title:'Agenda Detail',                   
                }}/>
            <Stack.Screen name="Speakers" component={SpeakersScreen} />
            <Stack.Screen name="Sponsors" component={SponsorsScreen} />
            <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="Polling" component={PollsScreen} />
            <Stack.Screen name="PollView" component={PollViewScreen} />
            <Stack.Screen name="QRScan" component={ScanQR} 
                options={{
                    title:'QR Scan',                   
                }}/> */}
            </Stack.Navigator>
            )
            :
            <Stack.Navigator initialRouteName='Login'>    
            <Stack.Screen name="Login" component={LoginScreen} 
                options={{
                    headerShown:false
                }}
            />
            </Stack.Navigator>
        }
    </NavigationContainer>
    // </SafeAreaView>
  );
};


export default Nav;
