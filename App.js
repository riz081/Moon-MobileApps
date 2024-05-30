import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { useFonts } from 'expo-font'
import { 
  NpkScreens, 
  TanahScreen, 
  PhScreen, 
  HistoryScreens, 
  Notification, 
  Settings, 
  DetectionScreen, 
  DetectionDetail,
  LoginScreen,
  RegisterScreen,
  ChangeScreen,
  ForgotScreen,
  ChartScreens
} from './screens';
import { CustomHeader } from './components';
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(20518, 'Y0GCrXNxeqFauppwEJh2wT');

  const [ fontsLoaded ] = useFonts({
    regular : require("./assets/fonts/Poppins-Regular.ttf"),
    light : require("./assets/fonts/Poppins-Light.ttf"),
    medium : require("./assets/fonts/Poppins-Medium.ttf"),
    bold : require("./assets/fonts/Poppins-Bold.ttf"),
    semibold : require("./assets/fonts/Poppins-SemiBold.ttf"),
    extrabold : require("./assets/fonts/Poppins-ExtraBold.ttf"),
  })

  const onLayoutRootView = useCallback(async() => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded] );

  if(!fontsLoaded){
    return null;
  }

  const Stack = createNativeStackNavigator()

  return (    
    <NavigationContainer>
      <StatusBar hidden = {true}/>
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={ LoginScreen }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Register'
          component={ RegisterScreen }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Bottom Navigation'
          component={ BottomTabNavigation }
          options={{headerShown : false}}
        />

        <Stack.Screen
          name='Npk Screen'
          component={ NpkScreens }
          options={{
            header: () => (
              <CustomHeader title='Explore' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Tanah Screen'
          component={ TanahScreen }
          options={{
            header: () => (
              <CustomHeader title='Explore' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Ph Screen'
          component={ PhScreen }
          options={{
            header: () => (
              <CustomHeader title='Explore' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='History Screen'
          component={ HistoryScreens }
          options={{
            header: () => (
              <CustomHeader title='History Log' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Notification Screen'
          component={ Notification }
          options={{
            header: () => (
              <CustomHeader title='Notification' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Settings'
          component={ Settings }
          options={{
            header: () => (
              <CustomHeader title='Settings' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Change'
          component={ ChangeScreen }
          options={{
            header: () => (
              <CustomHeader title='Change PIN' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Detection List'
          component={ DetectionScreen }
          options={{
            header: () => (
              <CustomHeader title='Detection List' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Detection Detail'
          component={ DetectionDetail }
          options={{
            header: () => (
              <CustomHeader title='Detection Detail' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Forgot'
          component={ ForgotScreen }
          options={{
            header: () => (
              <CustomHeader title='Forgot Password' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name='Chart'
          component={ ChartScreens }
          options={{
            header: () => (
              <CustomHeader title='Detail Graphic' showBackButton={true} showNotifications={false} showSettings={false} />
            ),
            headerShown: true,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
