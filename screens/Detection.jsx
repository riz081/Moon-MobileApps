import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Button, 
  SafeAreaView, 
  FlatList, 
  ActivityIndicator,
  Modal,
  Pressable
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS, SIZES } from '../constants';
import { db, auth, firebaseConfig } from '../config';
import Lottie from 'lottie-react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ref as dbRef, set, push } from 'firebase/database';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
// import UploadMediaFile from './UploadMediaFile';


const { useNotifications, NotificationsProvider } = createNotifications()

const imgDir = FileSystem.documentDirectory + 'images/'
// console.log('imgdir : '+imgDir)

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  if(!dirInfo.exists){
    await FileSystem.makeDirectoryAsync(imgDir, {intermediates : true})
  }
}

const Detection = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [result, setResult] = useState(null);
  const [plantsId, setPlantsId] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  console.log('dataKu : '+images)

  const [user, setUser] = useState(null);
  const { notify } = useNotifications()
  // Initialize Firebase app
  const firebaseApp = initializeApp(firebaseConfig);

  // Original function
  const uploadAndSaveImage = async (uri, email) => {
    setLoading(true);
    console.log('email : '+ email)
    try {
      // Save image to local storage
      await ensureDirExists();
  
      // Format the date as 'd-m-y'
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date());
      setTimestamp(formattedDate);
  
      const fileName = 'MLN-' + new Date().getTime() + '.jpg';
      const dest = imgDir + fileName;
      await FileSystem.copyAsync({ from: uri, to: dest });
      setImages([...images, dest]);
  
      // Upload image to server
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg', // Adjust the type as needed
        name: 'image.jpg',
      });
  
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timeout'));
        }, 15000); // 15 seconds timeout
      });
  
      const response = await Promise.race([
        fetch('https://qm1m7lvx-8000.asse.devtunnels.ms/desease', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }),
        timeoutPromise,
      ]);
  
      const result = await response.json();
      setLoading(false);
  
      // Extract class and confidence from the result
      const { class: predictedClass, confidence } = result;
      console.log('Prediction : ' + predictedClass);
      console.log('Confidence : ' + confidence);
      console.log('Gambar : ' + dest);
  
      // Save result to Firestore
      const plantsId = Math.floor(Math.random() * 1000000);
      setPlantsId(plantsId); // Set plantsId in state
  
      // Update realtimedatabase data with the latest image URL
      set(dbRef(db, 'data/' + plantsId), {
        id: plantsId,
        class: predictedClass,
        confidence: confidence,
        images_url: dest, // Assuming dest is the latest image URL
        timestamp: formattedDate,
        userEmail: email, // Add user's email to the data
      });

      notify('success', {
        params: {
          description: 'Detection process is successful.',
          title: 'Success',
        },
      })
  
      setResult(result);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);

      notify('error', {
        params: {
          description: error.message || 'Request timed out. Please try again.',
          title: 'Error',
        },
      })
      // You might want to clear the result or set an error message in the result
      setResult({ error: 'Failed to upload and classify the image. Please try again.' });
    }
  };

  const sendNotification = async (email) => {
    try {      
      // Parse the date string into a Date object
      const date = new Date();
  
      // Format the date in the desired format
      const formattedDate = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}, ${('0' + (date.getMonth()+1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}/${date.getFullYear()}`;
  
      const response = await axios.post('https://app.nativenotify.com/api/notification', {
        appId: 20518,
        appToken: "Y0GCrXNxeqFauppwEJh2wT",
        title: `Moon - Detection`,
        body: `${email} telah melakukan post!`,
        dateSent: formattedDate
      });
      console.log('Notification sent:', response.data);

      // Save notification details in Firebase Realtime Database
      const notificationsRef = dbRef(db, 'notifications');
      await push(notificationsRef, {
        title: `Moon - Detection`,
        body: `${email} telah melakukan post!`,
        dateSent: formattedDate
      });

      console.log('Notification saved to Firebase');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const uploadImageAndDetectDisease = async (uri, email) => {
    setLoading(true);
  
    try {
      // Save image to local storage
      await ensureDirExists();
  
      // Format the date as 'd-m-y'
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date());
      setTimestamp(formattedDate);
  
      const fileName = 'MLN-' + new Date().getTime() + '.jpg';
      const dest = imgDir + fileName;
      await FileSystem.copyAsync({ from: uri, to: dest });
      setImages([...images, dest]);

      
      // Upload image to Firebase Storage
      const { uri: fileUri } = await FileSystem.getInfoAsync(dest);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', fileUri, true);
        xhr.send(null);
      });
  
      // Upload image to server and detect disease
      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
  
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timeout'));
        }, 20000); // 20 seconds timeout
      });      
  
      const response = await Promise.race([
        fetch('https://qm1m7lvx-8000.asse.devtunnels.ms/desease', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }),
        timeoutPromise,
      ]);
  
      const result = await response.json();
  
      // Extract class and confidence from the result
      const { class: predictedClass, confidence } = result;
      console.log('Prediction : ' + predictedClass);
      console.log('Confidence : ' + confidence);
      console.log('Gambar : ' + dest);

      const uniqueId = Math.floor(Date.now() / 1000);
      const plantsId = `ID-${uniqueId}`;
      
      setPlantsId(plantsId); // Set plantsId in state
  
      // Save result to Realtime Database
      set(dbRef(db, 'data/' + plantsId), {
        id: plantsId,
        class: predictedClass,
        confidence: confidence,
        images_url: dest, // Assuming dest is the latest image URL
        timestamp: formattedDate,
        userEmail: email, // Add user's email to the data
      });

      // Save image to Firebase Storage
      const storageRef = ref(getStorage(firebaseApp), `images/${plantsId}`);
      await uploadBytes(storageRef, blob);
      console.log('Image Success Upload to Firebase Storage!!!');
      
      notify('success', {
        params: {
          description: 'Detection process is successful.',
          title: 'Success',
        },
      });

      setResult(result);
      sendNotification(email)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
  
      notify('error', {
        params: {
          description: error.message || 'Request timed out. Please try again.',
          title: 'Error',
        },
      });
      // You might want to clear the result or set an error message in the result
      setResult({ error: 'Failed to upload and classify the image. Please try again.' });
    }
  };

  const selectImage = async (user) => {
    let result;
    console.log('selectUser : '+user)
    await ImagePicker.requestCameraPermissionsAsync();

    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (user && user.email) {
      uploadImageAndDetectDisease(result.assets[0].uri, user.email);
    } 
  };

  const renderItem = ({ item }) => {
    const filename = item.split('/').pop();
    return (
      <GestureHandlerRootView>
        <View>
          <NotificationsProvider/>
          <Image
            style={{
              width: SIZES.width,
              height: SIZES.height / 2.6,
              justifyContent: 'center',
              alignItems: 'center',
              resizeMode : 'cover'
            }}
            source={{ uri: item }}
          />

          {result && (
            <View style={{justifyContent : 'center', alignItems : 'flex-start', marginVertical : 5, paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 0 }}>            
              <Text style={{ fontFamily : 'bold', fontSize : 18, color : COLORS.greenBamboo }}>Prediction Result:</Text>
              {/* ID Box */}
              <View style={{ flexDirection : 'row' }}>
                <View style={{ width: '28%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Plants ID </Text>
                </View>
                <View style={{ width: '7%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                </View>
                <View style={{ width: '65%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{plantsId}</Text>
                </View>
              </View>
              {/* Timestamp Box */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '28%' }}>
                  <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>Timestamp </Text>
                </View>
                <View style={{ width: '7%' }}>
                  <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>: </Text>
                </View>
                <View style={{ width: '65%' }}>
                  <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>{timestamp}</Text>
                </View>
              </View>
              {/* Coffidence Box */}
              <View style={{ flexDirection : 'row' }}>
                <View style={{ width: '28%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Coffidence </Text>
                </View>
                <View style={{ width: '7%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                </View>
                <View style={{ width: '65%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{result.confidence}</Text>
                </View>
              </View>
              {/* Class Box */}
              <View style={{ flexDirection : 'row' }}>
                <View style={{ width: '28%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Class </Text>
                </View>
                <View style={{ width: '7%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                </View>
                <View style={{ width: '34%' }}>
                  <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{result.class}</Text>
                </View>
              </View>            

              {/* Custom Text for "Melon Sehat" */}
              {result.class === "Melon Sehat" && (
                
              <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray}}>
                Panen melon terbaru! 🌱✨ Prediksi: "<Text style={{fontFamily: 'bold'}}>{result.class}</Text>" dengan nilai <Text style={{fontFamily: 'bold'}}>{result.confidence}%</Text>. Rawat dengan kasih, dapatkan panen berkualitas! 🍈🌿
              </Text>
              )}
              {/* Custom Text for "Melon Sakit" */}
              {result.class === "Melon Sakit" && (
                <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray}}>
                  Tanaman melon sakit. 🥀 Prediksi: "<Text style={{fontFamily: 'bold'}}>{result.class}</Text>" dengan keyakinan <Text style={{fontFamily: 'bold'}}>{result.confidence}%</Text>. Segera konsultasi ahli pertanian untuk solusi terbaik. 🍈🌱 #MelonSakit #PerawatanCerdas
                </Text>
              )}
            </View>
          )}

          <View style={{justifyContent : 'space-evenly', alignItems : 'center', marginVertical : SIZES.xSmall, marginBottom : SIZES.width/6, flexDirection : 'row', gap : 10}}>
            {/* Button */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 8, 
                flexDirection : 'row',
                gap : 5
              }}
              onPress={() => navigation.navigate('Detection List')}
            >
              <Ionicons
                name='list'
                size={22}
                color={COLORS.lightWhite}
              />
              <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                History List
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.greenOcean,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 8, 
                flexDirection : 'row',
                gap : 5
              }}
              onPress={() => selectImage(user)}
            >
              <Ionicons
                name='camera'
                size={22}
                color={COLORS.lightWhite}
              />
              <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                Take Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log('User logged in:', user.email);
        setUser(user);
        selectImage(user)
      } else {
        // User is logged out
        console.log('User logged out');
      }

    });

    return () => unsubscribe();
  }, [auth]);


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={images.length > 0 ? [images[images.length - 1]] : []}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center', top : -72 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'bold', top : 120 }}>400</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'bold', top : 120 }}>Nothing Image</Text>
            <Image
              style={{ width: SIZES.width / 1.3, height: SIZES.height / 1.3, resizeMode: 'contain' }}
              source={require('../assets/images/notFound.png')}
            />
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                flexDirection: 'row',
                gap: 5,
                marginTop: -122
              }}
              onPress={() => selectImage(user)}
            >
              <Ionicons
                name='camera'
                size={22}
                color={COLORS.lightWhite}
              />
              <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                Get Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.greenOcean,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
                flexDirection: 'row',
                gap: 5,
                marginVertical : 10
                // marginTop: -122
              }}
              onPress={() => navigation.navigate('Detection List')}
            >
              <Ionicons
                name='list'
                size={22}
                color={COLORS.lightWhite}
              />
              <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                History List
              </Text>
            </TouchableOpacity>
            
            {/* <UploadMediaFile /> */}
          </View>
        )}
      />

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
    </SafeAreaView>
  )
}

export default Detection

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
});