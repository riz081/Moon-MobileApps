import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { db } from '../config';
import { ref, onValue, remove, set } from 'firebase/database';
import { COLORS } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getStorage, ref as storageRef, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  notificationPosition: 'top-left'
});

const DetectionScreen = ({ navigation }) => {
  const { notify } = useNotifications();
  const [data, setData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startCountRef = ref(db, 'data/');
    const unsubscribe = onValue(startCountRef, (snapshot) => {
      const dataKu = snapshot.val() || {};
      let newData = Object.values(dataKu);
      
      // Sort the data by timestamp from the latest to the oldest
      newData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setData(newData);
    });

    const storage = getStorage();
    const listRef = storageRef(storage, 'images/');
    listAll(listRef)
      .then((res) => {
        const urls = [];
        res.items.forEach((itemRef, index) => {
          getDownloadURL(itemRef)
            .then((url) => {
              urls.push(url);
              setImageUrls(urls);
              if (index === res.items.length - 1) {
                setLoading(false);
              }
            })
            .catch((error) => {
              console.error('Error fetching image URL:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error listing images:', error);
      });

    return () => unsubscribe();
  }, []);

  const deleteImage = async (item) => {
    try {
      // Delete data from Realtime Database
      await remove(ref(db, `data/${item.id}`));
  
      // Check if the image exists in Firebase Storage
      const storage = getStorage();
      const imageStorageRef = storageRef(storage, `images/${item.id}`);
      const imageUrl = await getDownloadURL(imageStorageRef);
  
      if (imageUrl) {
        // Image exists, so delete it from Firebase Storage
        await deleteObject(imageStorageRef);
      } else {
        // Image does not exist
        console.log('Image does not exist in Firebase Storage');
      }
  
      console.log('Data and image deleted successfully');
      notify('info', {
        params: {
          description: 'Image and data deleted successfully.',
          title: 'Info',
        },
      });
    } catch (error) {
      console.error('Error deleting data and image:', error);
      notify('error', {
        params: {
          description: error.message || 'Failed to delete image and data.',
          title: 'Error',
        },
      });
    }
  };  

  const deleteAllData = async () => {
    try {
      const dataRef = ref(db, 'data/');
  
      // Delete all data from Realtime Database
      await set(dataRef, {});
  
      console.log('All data deleted successfully from Realtime Database');
  
      // Delete all images from Firebase Storage
      const storage = getStorage();
      const imagesRef = storageRef(storage, 'images/');
      const imageRefs = await listAll(imagesRef);
  
      const deleteImagePromises = imageRefs.items.map(async (imageRef) => {
        await deleteObject(imageRef);
        console.log('Image deleted:', imageRef.name);
      });
  
      await Promise.all(deleteImagePromises);
  
      console.log('All images deleted successfully from Firebase Storage');
  
      notify('info', {
        params: {
          description: 'All data and images deleted successfully.',
          title: 'Info',
        },
      });
    } catch (error) {
      console.error('Error deleting all data and images:', error);
      notify('error', {
        params: {
          description: error.message || 'Failed to delete all data and images.',
          title: 'Error',
        },
      });
    }
  };

  const formatConfirm = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: deleteAllData,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <GestureHandlerRootView>
          <NotificationsProvider/>
          <View style={{ flexDirection: 'column', margin: 1, gap: 5, padding: 25 }}>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detection Detail', { data: item })}
                  key={index}
                  style={{ flexDirection: 'row', marginVertical: 15 }}
                >
                  {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  ) : (
                    <React.Fragment>
                      {imageUrls.length > 0 && imageUrls[index] ? (
                        <Image style={{ width: 88, height: 88, borderRadius: 50 }} source={{ uri: imageUrls[index] }} />
                      ) : <Image style={{ width: 88, height: 88, borderRadius: 50 }} source={{ uri: imageUrls[index] }} />}
                    </React.Fragment>
                  )}

                  <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: 'bold' }}>{item.id}</Text>
                      <Text style={{ fontWeight: 'semibold', color: COLORS.black, marginTop: 6 }}>{item.userEmail}</Text>
                      <Text style={{ fontWeight: 'regular', color: COLORS.gray, marginTop: 10 }}>{item.timestamp}</Text>
                    </View>
                    <View style={{ right: -45 }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: COLORS.red,
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 3,
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
                        <Ionicons name='trash' size={24} color={COLORS.lightWhite} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: 35 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.greenBamboo }}>410</Text>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.greenBamboo }}>Data is Gone</Text>
                <Image source={require('../assets/images/networkError.png')} />
              </View>
            )}
          </View>
        </GestureHandlerRootView>
      </ScrollView>

      {/* Floating button */}
      {data && data.length > 0 ? (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={formatConfirm}
        >
          <Text style={{ color: COLORS.lightWhite, fontSize: 16, fontWeight: 'bold' }}>Delete All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DetectionScreen;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: COLORS.red,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
