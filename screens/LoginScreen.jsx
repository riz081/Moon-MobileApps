import { 
    View, 
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity
  } from 'react-native'
import React, { useState } from 'react'
import { signUp, signIn } from '../AuthService'
import { COLORS, SIZES } from '../constants'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { Button } from '../components' 
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { registerFollowMasterID, registerIndieID, unregisterIndieDevice } from 'native-notify'
import axios from 'axios'

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch : true,
  notificationPosition : 'top-left'
})

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState(''); //Indie ID / sub-users ID
    const [password, setPassword] = useState('');
    const [isLoading, loadingBar] = useState(false);
    const [eye, setEye] = useState({secure:true,icon:'eye-outline'});

    const [choosenIndieID, setChoosenIndieID] = useState('')
    const [followers, setFollowers] = useState([])
    const [followCount, setFollowCount] = useState(0)
    const [following, setFollowing] = useState([])

    const { notify } = useNotifications()

    const handleSignUp = async () => {
      navigation.navigate('Register')
    };
    
    const handleSignIn = async () => {        
        try {
            await signIn(email, password);
            registerIndieID(`${email}`, 20518, 'Y0GCrXNxeqFauppwEJh2wT');

            setChoosenIndieID(email)

            navigation.navigate('Bottom Navigation')
        } catch (error) {
            notify('error', {
              params: {
                description: error.message || 'An unknown error occurred.',
                title: 'Error',
              },
            })
            console.log('error login' + error)
        }
    };

    const showhide = () => {
        if(eye.icon == 'eye-outline'){
          setEye({secure:false,icon:'eye-off-outline'});
        }else{
          setEye({secure:true,icon:'eye-outline'});
        }
    }

  return (
    <ScrollView>
      <GestureHandlerRootView style={{ flex : 1 }}>
        <SafeAreaView style={{marginHorizontal : 20}}>
          <NotificationsProvider />
          <View>
            <Image
              source={require('../assets/images/others/bgMelon.png')}
              style={styles.cover}
            />
            <Text style={styles.title}>melon monitoring application</Text>
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name = 'email-outline'
                    size={22}
                    style = {styles.iconStyle}
                  />

                  <TextInput
                    placeholder='Enter email'
                    value={email}
                    onChangeText={text => setEmail(text.replace(/ /g,""))}
                    secureTextEntry={false}
                    activeLineWidth={0}
                    lineWidth={0}
                    maxLength={100}
                    labelFontSize={16} 
                    placeholderTextColor={'grey'}
                    style = {{flex : 1}}
                  />
                </View>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name='lock-outline'
                    size={22}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                    secureTextEntry={eye.secure}
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text.replace(/ /g,""))}
                    activeLineWidth={0}
                    lineWidth={0}
                    labelFontSize={16} 
                    keyboardType="number-pad"
                    maxLength={8}
                    placeholderTextColor={'grey'}
                    style={{flex : 1}}
                  />

                  <TouchableOpacity underlayColor="" onPress={()=> showhide()}>
                    <Ionicons name={eye.icon} size={22} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>

              <Button
                // loader={loadingBar}
                title={"L O G I N"}
                onPress={handleSignIn}
              />
              <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center', marginVertical : SIZES.xSmall}} onPress={handleSignUp}>
                <Text>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center'}} onPress={() => navigation.navigate('Forgot')}>
                <Text style={{color : COLORS.greenBamboo, fontWeight : '500', textDecorationLine : 'underline'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    cover : {
        height : SIZES.height/2.4,
        width : SIZES.width -30,
        resizeMode : 'contain',
        marginBottom : SIZES.large
    },
    title : {
        fontFamily :'bold',
        fontSize : SIZES.large,
        color : COLORS.primary,
        alignItems : 'center',
        textTransform : 'capitalize',
        marginBottom : SIZES.large
    },
    wrapper : {
        marginBottom : 10,
    },
    label : {
        fontFamily : 'regular',
        fontSize : SIZES.xSmall,
        marginBottom : 5,
        marginEnd : 5,
        textAlign : 'right',
        textTransform : 'capitalize'
    },
    inputWrapper : {
      borderColor : COLORS.primary,
      backgroundColor: COLORS.lightWhite,
      borderWidth : 1,
      height : 45,
      borderRadius : 12,
      paddingHorizontal : 15,
      alignItems : 'center',
      flexDirection : 'row'
    },
    iconStyle : {
        marginRight : 10
    }
  
  })