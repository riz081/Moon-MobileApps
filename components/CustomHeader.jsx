import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants';

const CustomHeader = ({ focused, title, showBackButton = true, showNotifications = true, showSettings = true }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', backgroundColor : COLORS.offwhite }}>
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
              resizeMode : 'contain'
            }}
            source={require('../assets/images/moonLogo.png')}
          />}        
      <Text style={{ fontFamily: 'bold', fontSize: 18 }}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {showNotifications && (
          <TouchableOpacity onPress={() => navigation.navigate('Notification Screen')}>
            <Ionicons 
              name='notifications-outline'
              size={24}
              color={COLORS.greenBamboo}
            />
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons
              name= "md-settings-outline"
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
