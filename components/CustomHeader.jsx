import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { db } from '../config'; // Import Firebase database from your config
import { ref, onValue } from 'firebase/database'; // Import Firebase database functions

const CustomHeader = ({ focused, title, showBackButton = true, showNotifications = true, showSettings = true }) => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const notificationsRef = ref(db, 'notifications');

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const count = Object.keys(data).length;
        setNotificationCount(count);
      } else {
        // Handle when there are no notifications
        setNotificationCount(0);
      }
    }, {
      // Handle potential error
      errorCallback: (error) => {
        console.error("Error fetching notifications:", error);
      }
    });

    // Clean up function
    return () => {
      // Unsubscribe from Firebase updates
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', backgroundColor: COLORS.offwhite }}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='arrow-back'
            size={24}
            color={COLORS.greenBamboo}
          />
        </TouchableOpacity>
      ) :
        <Image
          style={{
            width: 28,
            height: 28,
            resizeMode: 'contain'
          }}
          source={require('../assets/images/moonLogo.png')}
        />}
      <Text style={{ fontFamily: 'bold', fontSize: 18 }}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {showNotifications && (
          <TouchableOpacity onPress={() => navigation.navigate('Notification Screen')}>
            <View style={{ position: 'relative' }}>
              <Ionicons
                name='notifications-outline'
                size={24}
                color={COLORS.greenBamboo}
              />
              {notificationCount > 0 && (
                <View style={{ position: 'absolute', top: -8, right: -8, backgroundColor: 'red', borderRadius: 999, paddingHorizontal: 4, paddingVertical: 2 }}>
                  <Text style={{ color: 'white', fontSize : SIZES.xSmall + 2 }}>{notificationCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={COLORS.greenBamboo}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
