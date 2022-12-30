import React,{useEffect, useState} from 'react';
import {  Image  } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import AtttendanceChartScreen from '../screens/AtttendanceChart';
//App screens
import AppScreen from '../screens/Application/Applist';
import LeaveAppsScreen from '../screens/Application/Leave';
import LeaveBalScreen from '../screens/Application/LeaveBal';
import ODAppsScreen from '../screens/Application/OutDoor';
import ManualAppsScreen from '../screens/Application/Manual';
import CoffAppsScreen from '../screens/Application/Coff';
import lwpAppsScreen from '../screens/Application/LWP';
import slAppsScreen from '../screens/Application/Shortleave';
import wfhAppsScreen from '../screens/Application/WFH';
import HolAppsScreen from '../screens/Application/Holiday';
// TimeCard
import IsHodScreen from '../screens/TimeCard/IsHod';
import TeamAttendanceScreen from '../screens/TimeCard/TeamAttendance';
import SelfCardScreen from '../screens/TimeCard/SelfCard';
import DetailSelfCardScreen from '../screens/TimeCard/DetailSelfCard';
import MarkAttendanceScreen from '../screens/MarkAttendance';
// Application Rgister
import RegisterListScreen from '../screens/ApplicationRegister/RegisterList';
import RegisterItemsScreen from '../screens/ApplicationRegister/RegisterItems';
import RegisterDetailsScreen from '../screens/ApplicationRegister/RegisterDetails';
// Pending Application
import PAIsHodScreen from '../screens/PendingApplication/PAIsHod';
import PAtypesScreen from '../screens/PendingApplication/PAtypes';
import PAListScreen from '../screens/PendingApplication/PAList';
import PAListItemsScreen from '../screens/PendingApplication/PAListItems';
import PAItemDetailScreen from '../screens/PendingApplication/PAItemDetail';

import HolidayScreen from '../screens/Holiday';
import NoticeScreen from '../screens/Notice';
import NotificationScreen from '../screens/Notification';
import Headericon from './utils/Headericon';


const Stack = createStackNavigator();

const Nav = ({color, refer}) => {
     
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
                    headerTitleAlign:'center',
                    // headerBackTitle:"Back",
                    headerBackTitleVisible:false,
                    headerTitleStyle: {
                        fontFamily:'VarelaRound-Regular'
                    },
                    cardStyle:{
                        backgroundColor:'#FFFFFF'
                    },
                    headerRight: () => (
                        <Headericon name={route.name} />                    
                    )
                })}
            >
            <Stack.Screen name="Home" component={HomeScreen}
                options={{ 
                    headerStyle:{
                        backgroundColor: color,
                        // height:80,                        
                    },
                    title:'Time Track Mobile App',
                }}
            /> 
            <Stack.Screen name="AtttendanceChart" component={AtttendanceChartScreen} 
                options={{
                title:'Atttendance Chart',                   
                }} />    
            <Stack.Screen name="App" component={AppScreen} 
                options={{
                title:'Application',                   
                }} /> 
            <Stack.Screen name="LeaveRegister" component={LeaveAppsScreen} 
                options={{
                title:'Leave Application',                   
                }} />
            <Stack.Screen name="LeaveBal" component={LeaveBalScreen} 
                options={{
                title:'Leave Balance',                   
                }} />    
            <Stack.Screen name="OdRegister" component={ODAppsScreen} 
                options={{
                title:'OutDoor Application',                   
                }} />
            <Stack.Screen name="ManualRegister" component={ManualAppsScreen} 
                options={{
                title:'Manual Application',                   
                }} />  
            <Stack.Screen name="CoffRegister" component={CoffAppsScreen} 
                options={{
                title:'Coff Application',                   
                }} />
            <Stack.Screen name="LWPRegister" component={lwpAppsScreen} 
                options={{
                title:'LWP Application',
                }} />
            <Stack.Screen name="ShortLeaveRegister" component={slAppsScreen} 
                options={{
                title:'ShortLeave Application',
                }} />
            <Stack.Screen name="WFHRegister" component={wfhAppsScreen} 
                options={{
                title:'WFH Application',
                }} />
            <Stack.Screen name="HolidayRegister" component={HolAppsScreen} 
                options={{
                title:'Holiday Application',                   
                }} />
            <Stack.Screen name="IsHod" component={IsHodScreen} 
                options={{
                title:'Time Card',                   
                }} />
            <Stack.Screen name="TeamAttendance" component={TeamAttendanceScreen} 
                options={{
                title:'Team Attendance',                   
                }} />
            <Stack.Screen name="SelfCard" component={SelfCardScreen} 
                options={{
                title:'Time Card',                   
                }} />
            <Stack.Screen name="DSelfCard" component={DetailSelfCardScreen} 
                options={{
                title:'Time Card',                   
                }} />
            <Stack.Screen name="MarkAtt" component={MarkAttendanceScreen} 
                options={{
                title:'Attendance',                   
                }} />
            <Stack.Screen name="RgList" component={RegisterListScreen} 
                options={{
                    title:'Application Register',                   
                }} />
            <Stack.Screen name="RgItem" component={RegisterItemsScreen} />
            <Stack.Screen name="RgDetails" component={RegisterDetailsScreen} />
            <Stack.Screen name="PAIsHod" component={PAIsHodScreen} 
                options={{
                    title:'Pending Application',                   
                }} />    
            <Stack.Screen name="PAtypes" component={PAtypesScreen} 
                options={{
                    title:'Pending Application',                   
                }} />
            <Stack.Screen name="PAList" component={PAListScreen} 
                options={{
                    title:'Pending/Approve',                   
                }} />
            <Stack.Screen name="PAListItem" component={PAListItemsScreen}  />
            <Stack.Screen name="PAItemDetail" component={PAItemDetailScreen} />                               
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
