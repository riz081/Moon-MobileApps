import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firebaseConfig } from '../config'
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const UploadMediaFile = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(null)

    // Initialize Firebase app
    const firebaseApp = initializeApp(firebaseConfig);

    const pickImage = async () => {
        //no permissions request
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4,3],
            quality : 1
        });

        if (!result.canceled){
            setImage(result.assets[0].uri)
        }
    }

    // upload media
    const uploadMedia = async () => {
        setUploading(true);
      
        try {
          const { uri } = await FileSystem.getInfoAsync(image);
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
              resolve(xhr.response);
            };
            xhr.onerror = (e) => {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          });
      
          const filename = image.substring(image.lastIndexOf('/') + 1);
          const storageRef = ref(getStorage(firebaseApp), `images/${filename}`);
      
          await uploadBytes(storageRef, blob);
          setUploading(false);
          Alert.alert('Photo Uploaded !');
          setImage(null);
        } catch (error) {
          console.error(error);
          setUploading(false);
        }
      };

  return (
    <View>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.textButton}>UploadMediaFile</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image
            source={{ uri : image }}
            style= {{ width : 100, height : 100 }}
        />}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia}>
            <Text style={styles.textButton}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UploadMediaFile

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center'
    },
    selectButton : {
        borderRadius : 5,
        width : 150,
        height : 150,
        backgroundColor : 'blue',
        alignItems : 'center',
        justifyContent : 'center'
    },
    textButton : {
        color : '#fff',
        fontSize : 18,
        fontWeight : 'bold'
    },
    uploadButton : {
        borderRadius : 5,
        width : 150,
        height : 150,
        backgroundColor : 'blue',
        alignItems : 'center',
        justifyContent : 'center'
    },
    imageContainer : {
        marginTop : 20,
        marginBottom : 30,
        alignItems : 'center'
    }
})