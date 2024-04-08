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
import { COLORS } from '../constants';

const imgDir = FileSystem.documentDirectory + 'images/'

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  if(!dirInfo.exists){
    await FileSystem.makeDirectoryAsync(imgDir, {intermediates : true})
  }
}

const Camera = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = async (useLibrary) => {
    let result;

    if(useLibrary){
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        aspect : [4, 3],
        quality : 0.75
      })
    } else {
      await ImagePicker.requestCameraPermissionsAsync()

      result = await ImagePicker.launchCameraAsync({
        mediaTypes : ImagePicker.MediaTypeOptions.Images,
        aspect : [4, 3],
        quality : 0.75
      })
    }

    if(!result.canceled){
      saveImage(result.assets[0].uri)
    }
  }
  
  const saveImage = async (uri) => {
    await ensureDirExists()
    const fileName = new Date().getTime() + '.jpg'
    const dest = imgDir + fileName
    await FileSystem.copyAsync({from: uri, to : dest})
    setImages([...images, dest])
  }

  const deleteImage = async(uri)=>{
    await FileSystem.deleteAsync(uri)
    setImages(images.filter((i) => i !== uri))
  }
  
  const uploadImage = async (uri) => {
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'image/jpeg', // Adjust the type as needed
        name: 'image.jpg',
      });
  
      const response = await fetch('https://qm1m7lvx-8000.asse.devtunnels.ms/desease', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const result = await response.json();
      setLoading(false);
  
      // Extract class and confidence from the result
      const { class: predictedClass, confidence } = result;
  
      // View the extracted data
      console.log('Predicted Class:', predictedClass);
      console.log('Confidence:', confidence);
  
      setResult(result);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);

      // Show an alert for the error
      Alert.alert('Error', 'Failed to upload and classify the image, Please Try Again!.');
      
      // You might want to clear the result or set an error message in the result
      setResult({ error: 'Failed to upload and classify the image, Please Try Again!.' });
      setModalVisible(true);
    }
  };
  

  const renderItem = ({ item }) => {
    const filename = item.split('/').pop();
    return (
      <View style={{ flexDirection: 'columns', margin: 1, gap: 5, padding : 20 }}>
        <View style={{flexDirection : 'row'}}>
          <Image style={{ width: 80, height: 80, borderRadius : 10 }} source={{ uri: item }} />

          <View style={{flexDirection : 'column', marginHorizontal : 15}}>
            <Text style={{ flex: 1, fontWeight : 'bold' }}>{filename}</Text>
            <View style={{ flexDirection : 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor : COLORS.greenOcean, 
                  width : 42, 
                  height : 42,
                  borderRadius : 10,
                  alignItems : 'center',
                  justifyContent : 'center',
                  padding : 3
                }}
                onPress={() => {
                  uploadImage(item);
                  setModalVisible(true);
                }}
              >
                <Ionicons
                  name='cloud-upload'
                  size={24}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor : COLORS.red, 
                  width : 42, 
                  height : 42,
                  borderRadius : 10,
                  alignItems : 'center',
                  justifyContent : 'center',
                  padding : 3
                }}
                onPress={() => {
                  Alert.alert(
                    'Delete Image',
                    'Are you sure you want to delete this image?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => deleteImage(item),
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Ionicons
                  name='trash'
                  size={24}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex : 1, gap : 20}}>
      <Text style={{textAlign : 'center', fontSize : 20, fontWeight : 500}}>My Images</Text>
      <FlatList
        style={{marginBottom : 62}}
        data={images}
        renderItem={renderItem}
      />

      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor : 'rgba(0,0,0,0.4)',
              alignItems : 'center',
              justifyContent : 'center'
            }
          ]}
        >
          <ActivityIndicator color='#fff' animating size='large' />
        </View>
      )}

      {result && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Prediction Result:</Text>
                <Text style={styles.modalText}>Class: {result.class}</Text>
                <Text style={styles.modalText}>Confidence: {result.confidence}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}

      
      <TouchableOpacity
        onPress={() => selectImage(true)}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: COLORS.greenBamboo,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectImage(false)}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: COLORS.greenBamboo,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="camera" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Camera
const styles = StyleSheet.create({
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});