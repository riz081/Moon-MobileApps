import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image, ActivityIndicator, TextInput, Button, Modal, FlatList } from 'react-native';
import { db } from '../config';
import { ref, onValue, remove, set } from 'firebase/database';
import { getStorage, ref as storageRef, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNotifications } from 'react-native-notificated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../constants';

const { useNotifications, NotificationsProvider } = createNotifications({
  isNotch: true,
  notificationPosition: 'top-left'
});

const DetectionScreen = ({ navigation }) => {
  const { notify } = useNotifications();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEmails, setUserEmails] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const startCountRef = ref(db, 'data/');
    const unsubscribe = onValue(startCountRef, (snapshot) => {
      const dataKu = snapshot.val() || {};
      const newData = Object.values(dataKu).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setData(newData);
      setFilteredData(newData); // Initialize filtered data with all data
      // Extract user emails
      const emails = newData.map(item => item.userEmail);
      setUserEmails([...new Set(emails)]); // Remove duplicates using Set
    });

    fetchImageUrls();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Filter data based on search query
    const filtered = data.filter(item =>
      (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.plantsId && item.plantsId.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const fetchImageUrls = async () => {
    try {
      const storage = getStorage();
      const listRef = storageRef(storage, 'images/');
      const res = await listAll(listRef);
      const urls = await Promise.all(res.items.map(itemRef => getDownloadURL(itemRef)));
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (item) => {
    try {
      await remove(ref(db, `data/${item.id}`));

      const storage = getStorage();
      const imageStorageRef = storageRef(storage, `images/${item.id}`);
      await deleteObject(imageStorageRef);

      console.log('Data and image deleted successfully');
      notify('info', {
        params: {
          description: 'Image and data deleted successfully.',
          title: 'Info',
        },
      });

      // Refresh data after deletion
      fetchImageUrls();
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

  const confirmDeleteItem = (item) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => deleteItem(item),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAllData = async () => {
    try {
      const dataRef = ref(db, 'data/');
      await set(dataRef, {});

      const storage = getStorage();
      const imagesRef = storageRef(storage, 'images/');
      const imageRefs = await listAll(imagesRef);
      await Promise.all(imageRefs.items.map(imageRef => deleteObject(imageRef)));

      console.log('All data and images deleted successfully');
      notify('info', {
        params: {
          description: 'All data and images deleted successfully.',
          title: 'Info',
        },
      });

      // Refresh data after deletion
      fetchImageUrls();
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

  // Filter data by user email
  const filterDataByUserEmail = (email) => {
    if (email === selectedUserEmail) {
      // If the same email is clicked again, show all data
      setSelectedUserEmail('');
      setFilteredData(data);
    } else {
      // Filter data by the selected email
      setSelectedUserEmail(email);
      const filtered = data.filter(item => item.userEmail === email);
      setFilteredData(filtered);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationsProvider />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by ID or Plants ID"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={24} color={COLORS.gray} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>
            <Ionicons
              name='filter-outline'
              size={18}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Detection Detail', { data: item, imageUri: imageUrls[index] })}
              onLongPress={() => confirmDeleteItem(item)}
              style={styles.itemContainer}
            >
              <Image
                style={styles.image}
                source={{ uri: imageUrls[index] || 'https://via.placeholder.com/88' }}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemId}>{item.id}</Text>
                <Text style={styles.itemEmail}>{item.userEmail}</Text>
                <Text style={styles.itemTimestamp}>{item.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>410</Text>
            <Text style={styles.noDataText}>Data is Gone</Text>
            <Image source={require('../assets/images/networkError.png')} />
          </View>
        )}
      </ScrollView>

      {filteredData.length > 0 && (
        <TouchableOpacity style={styles.floatingButton} onPress={formatConfirm}>
          <Text style={styles.floatingButtonText}>Delete All</Text>
        </TouchableOpacity>
      )}
      
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
            <Text style={styles.modalText}>Select User Email</Text>
            <FlatList
              data={userEmails}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emailButton}
                  onPress={() => {
                    filterDataByUserEmail(item);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.emailButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.emailButton}
              onPress={() => {
                // Show all data
                setSelectedUserEmail('');
                setFilteredData(data);
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.emailButtonText}>Show All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default DetectionScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 50,
  },
  itemDetails: {
    flexDirection: 'column',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemId: {
    fontWeight: 'bold',
    marginRight: 20
  },
  itemEmail: {
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 6,
    marginRight: 20
  },
  itemTimestamp: {
    fontWeight: '400',
    color: COLORS.gray,
    marginTop: 10,
    marginLeft: 10
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 35,
  },
  noDataText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.greenBamboo,
  },
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
  floatingButtonText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Adjust as needed
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    flex: 1,
    borderWidth : 1,
    borderColor : COLORS.greenBamboo,
    marginRight : SIZES.xSmall
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.black,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal styles
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emailButton: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  emailButtonText: {
    fontWeight: 'bold',
  },
});
