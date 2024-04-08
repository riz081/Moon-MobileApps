import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { auth } from '../config'; // Import the Firebase authentication instance
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import { COLORS } from '../constants';
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const { useNotifications, NotificationsProvider } = createNotifications()

const ChangeScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { notify } = useNotifications()

  const onChangePasswordPress = () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
    //   Alert.alert('Please fill in all fields');
        notify('warning', {
            params: {
            description: 'Please fill in all fields',
            title: 'Warning',
            },
        })
      return;
    }

    if (newPassword !== confirmNewPassword) {
    //   Alert.alert('New passwords do not match');
      notify('info', {
        params: {
          description: 'New passwords do not match',
          title: 'Info',
        },
      })
      return;
    }

    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            navigation.navigate('Settings')
            notify('success', {
                params: {
                    description: 'Password updated successfully',
                    title: 'Success',
                },
            })
          })
          .catch(error => {
            // Alert.alert('Error updating password', error.message);
            notify('error', {
                params: {
                  description: error.message || 'An unknown error occurred.',
                  title: 'Error',
                },
            })
          });
      })
      .catch(error => {
        // Alert.alert('Authentication failed', error.message);
        notify('error', {
            params: {
              description: error.message || 'An unknown error occurred.',
              title: 'Error',
            },
        })
      });
  };

  return (
    <ScrollView>
        <GestureHandlerRootView>
            <SafeAreaView>
                <NotificationsProvider/>
                <View style={styles.container}>
                    <Text style={styles.title}>Change Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Old Password"
                        secureTextEntry
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        keyboardType='number-pad'
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        keyboardType='number-pad'
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        secureTextEntry
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        keyboardType='number-pad'
                    />
                    <TouchableOpacity style={styles.button} onPress={onChangePasswordPress}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View> 
            </SafeAreaView>
        </GestureHandlerRootView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.greenJungle,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangeScreen;
