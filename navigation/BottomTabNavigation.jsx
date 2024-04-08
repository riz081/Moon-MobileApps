import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Detection, ForecastingScreens } from '../screens'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants'
import { CustomHeader } from '../components'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';
import axios from 'axios';

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel : true,
    tabBarHideOnKeyBoard : true,
    tabBarStyle : {
        position : "absolute",
        bottom : 0,
        right : 0,
        left : 0,
        elevation : 0,
        height : 54
    }
}

const BottomTabNavigation = ({navigation}) => {
    const [user, setUser] = useState(null);

    const sendNotification = async () => {
        try {
            const now = new Date();
            const dateSent = `${now.getHours()}:${now.getMinutes()}`;
            const response = await axios.post('https://app.nativenotify.com/api/notification', {
                appId: 20518,
                appToken: "Y0GCrXNxeqFauppwEJh2wT",
                title: `Moon - Daily Check`,
                body: "Cek kadar kandungan tanah!!!",
                dateSent: dateSent
            });
            console.log('Notification sent:', response.data);
            // Navigate to the screen based on the output
            navigation.navigate('Classification')
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is logged in
              console.log('User logged in:', user.email);
            } else {
              // User is logged out
              console.log('User logged out');
            }
      
            setUser(user);
        });   
        
        // const interval = setInterval(() => {
        //     const now = new Date();
        //     const hours = now.getHours();
        //     const minutes = now.getMinutes();
        //     if (hours === 7 && minutes === 37) {
        //         sendNotification()
        //         console.log(`ini jam ${hours} ${minutes}!`);
        //     }
        //     if (hours === 16 && minutes === 38) {
        //         sendNotification()
        //         console.log(`ini jam ${hours} ${minutes}!`);
        //     }
        // }, 60000); // Check every minute
    
        return () => {
            // clearInterval(interval);
            unsubscribe();
        };
    }, [auth])


  return (
    <Tab.Navigator screenOptions={ screenOptions }>
        <Tab.Screen
            name='Home'
            component={Home}
            options={{
                header: () => (
                    <CustomHeader title='Home' showBackButton={false} showNotifications={true} showSettings={true} />
                ),
                headerShown: true,
                tabBarIcon: ({focused}) => {
                    return <Ionicons 
                        name={focused ? 'home' : 'home-outline'}
                        size={24}
                        color={focused ? COLORS.greenBamboo : COLORS.gray2}
                    />
                },
                tabBarLabelStyle : {
                    color : COLORS.greenBamboo,
                    fontWeight : 'bold'
                }
            }}
        />

        <Tab.Screen
            name='Detection'
            component={Detection}
            options={{
                header: () => (
                    <CustomHeader title='Detection' showBackButton={false} showNotifications={true} showSettings={true} />
                ),
                headerShown: true,
                tabBarIcon: ({focused}) => {
                    return <Ionicons 
                        name={focused ? 'camera' : 'camera-outline'}
                        size={24}
                        color={focused ? COLORS.greenBamboo : COLORS.gray2}
                    />
                },
                tabBarLabelStyle : {
                    color : COLORS.greenBamboo,
                    fontWeight : 'bold'
                }
            }}
        />

        <Tab.Screen
            name='Classification'
            component={ForecastingScreens}
            options={{
                header: () => (
                    <CustomHeader title='Classification' showBackButton={false} showNotifications={true} showSettings={true} />
                ),
                headerShown: true,
                tabBarIcon: ({focused}) => {
                    return <Ionicons 
                        name={focused ? 'analytics' : 'analytics-outline'}
                        size={24}
                        color={focused ? COLORS.greenBamboo : COLORS.gray2}
                    />
                },
                tabBarLabelStyle : {
                    color : COLORS.greenBamboo,
                    fontWeight : 'bold'
                }
            }}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation