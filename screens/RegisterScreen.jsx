import React, { useState } from 'react';
import { 
  View, 
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform // Import Platform
} from 'react-native'
import { signUp, signIn } from '../AuthService';
import { COLORS, SIZES } from '../constants'
import { Button } from '../components';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const { useNotifications, NotificationsProvider } = createNotifications()

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [eye, setEye] = useState({secure:true,icon:'eye-outline'});
  const [isLoading, loadingBar] = useState(false);

  const { notify } = useNotifications()

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      // Handle successful sign-up, navigate to another screen, etc.
      navigation.navigate('Login')
      notify('success', {
        params: {
          description: 'Registration Successfully.',
          title: 'Success',
        },
      })
    } catch (error) {
      // Handle sign-up error
      notify('error', {
        params: {
          description: error.message || 'An unknown error occurred.',
          title: 'Error',
        },
      })
      console.error('Sign-up error:', error.message);
    }
  };

  const handleSignIn = async () => {
    navigation.navigate('Login')
  };

  const showhide = () => {
    if(eye.icon == 'eye-outline'){
      setEye({secure:false,icon:'eye-off-outline'});
    }else{
      setEye({secure:true,icon:'eye-outline'});
    }
}


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : SIZES.height * 0.3} // Adjust offset to 30% of screen height for Android
    >
      <ScrollView>
        <GestureHandlerRootView>
          <SafeAreaView style={{marginHorizontal : 20}}>
            <NotificationsProvider />
            <View>
              <Image
                source={require('../assets/images/register.png')}
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
                  title={"R E G I S T E R"}
                  onPress={handleSignUp}
                />
                <TouchableOpacity style={{justifyContent : 'center', alignItems : 'center'}} onPress={handleSignIn}>
                  <Text>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  cover : {
      height : SIZES.height/2.4,
      width : SIZES.width -30,
      resizeMode : 'contain',
      marginVertical : SIZES.large
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
