import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import Lottie from 'lottie-react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';
import { COLORS, SIZES } from '../constants'; 
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch : true,
  notificationPosition : 'top-left'
})

const Settings = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotifications()

  const handleLogout = async () => {
    
    try {
      // Show confirmation alert
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              setLoading(true);
              await signOut(auth);
              setLoading(false);
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error signing out:', error.message);
      setLoading(false);
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

  return () => unsubscribe();
  }, [auth])
  return (
    <ScrollView style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBackground} />
          <Lottie
              style={styles.loadingAnimation}
              source={require('../assets/animations/loading cube.json')}
              autoPlay
              loop
          />
        </View>
      )}
      <GestureHandlerRootView>
        <NotificationsProvider/>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={COLORS.gray}
          />
          <View style={{width : '100%'}}>
            <Image
              source={require('../assets/images/others/space.jpg')}
              style={styles.cover}
            />
          </View>
            
          <View style={styles.profileContainer}>
            <Image
              source = {require('../assets/images/others/profile.jpeg')}
              style = {styles.profile}
            />
            {
              user && (
                <Text style={styles.role}> Logged in as </Text>
              )
            }
            
              {
                !user ? (
                  <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <View style={styles.loginBtn}>
                      <Text style={styles.menuText}>L O G I N</Text>                    
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.loginBtn}>
                      <Text style={styles.menuText}>{user ? user.email : 'No Email' }</Text>
                  </View>
                )
              }

              {
                !user ? (
                  <View></View>
                ) : (
                  <View style={styles.menuWrapper}>
                    {
                      user && (
                        <View>
                          <TouchableOpacity onPress={() => navigation.navigate('Change')}>
                            <View style={styles.menuItem(0.5)}>
                              <FontAwesome5
                                name='user-edit'
                                color={COLORS.primary}
                                size={20}
                              />
                              <Text style={styles.menuText}> Edit Akun </Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={handleLogout}>
                            <View style={styles.menuItem(0.5)}>
                              <AntDesign
                                name='logout'
                                color={COLORS.primary}
                                size={20}
                              />
                              <Text style={styles.menuText}> Logout </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) 
                    }
                  </View>
                )
              }
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  loadingAnimation: {
    width: SIZES.width /2,
    height: SIZES.height /2,
    zIndex: 2,
  },
  container : {
    flex : 1,
  },
  cover : {
    height : 250,
    width : '100%',
    resizeMode : 'cover'
},
  profileContainer : {
      flex : 1,
      alignItems : 'center'
  },
  profile : {
    height : '98%',
    width : '28%',
    borderRadius : 999,
    borderColor : COLORS.primary,
    borderWidth : 2,
    resizeMode : 'cover',
    marginTop : -57,
    backgroundColor : COLORS.offwhite
  },
  role : {
      fontFamily : 'bold',
      color : COLORS.primary,
      marginVertical : 5,
      textTransform : 'capitalize'
  },
  loginBtn : {
      backgroundColor : COLORS.secondary,
      padding : 2,
      borderWidth : 0.4,
      borderColor : COLORS.primary,
      borderRadius : SIZES.xxLarge
  },
  menuText : {
      fontFamily : 'regular',
      color : COLORS.gray,
      marginHorizontal : 20,
      fontWeight : '600',
      fontSize : 14,
      lineHeight : 26
  },
  menuWrapper : {
      marginTop : SIZES.small,
      width : SIZES.width-SIZES.large,
      backgroundColor : COLORS.lightWhite,
      borderRadius : 12
  },
  menuItem :  (borderBottomWidth) => ({
      borderBottomWidth : borderBottomWidth,
      paddingVertical : 8,
      paddingHorizontal : 30,
      borderColor : COLORS.gray,
      flexDirection : 'row'
      
  }),
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconModal: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
