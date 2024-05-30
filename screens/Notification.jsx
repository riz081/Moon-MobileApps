import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getNotificationInbox } from 'native-notify'
import { COLORS, SIZES } from '../constants';
import Lottie from 'lottie-react-native';
import { db } from '../config';
import { ref, onValue, remove, set } from 'firebase/database';

const Notification = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    const notificationsRef = ref(db, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const notifications = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        notifications.push({
          notification_id: childSnapshot.key,
          ...childData,
        });
      });
      setData(notifications);
      setIsLoading(false);
      setIsRefreshing(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setIsLoading(false);
      setIsRefreshing(false);
    });
  };

  const deleteNotification = (notificationId) => {
    const notificationRef = ref(db, `notifications/${notificationId}`);
    remove(notificationRef)
      .then(() => {
        Alert.alert('Notification deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
        Alert.alert('Error deleting notification');
      });
  };

  const handleLongPress = (notificationId) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteNotification(notificationId),
        },
      ],
      { cancelable: true }
    );
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredData = () => {
    if (filterType === 'Watering') {
      return data.filter(item => item.title === 'Moon - Watering');
    } else if (filterType === 'Detection') {
      return data.filter(item => item.title === 'Moon - Detection');
    } else {
      return data;
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchNotifications();
  };

  const renderItem = ({ item }) => {
    const [time, date] = item.dateSent.split(', ');
    const handlePress = () => {
      if (item.title === 'Moon - Watering') {
        navigation.navigate('Classification');
      } else if (item.title === 'Moon - Detection') {
        navigation.navigate('Detection List');
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={() => handleLongPress(item.notification_id)}
        style={styles.containerNotif}
      >
        <View style={styles.notificationItem}>
          <View style={styles.wrapText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.body}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.time}>{time}</Text>
              <Text style={styles.time}>-</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBackground} />
          <Lottie
            style={styles.loadingAnimation}
            source={require('../assets/animations/loading cube.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'all' && styles.activeFilterButton]}
              onPress={() => handleFilter('all')}
            >
              <Text style={[styles.filterButtonText, filterType === 'all' && styles.activeFilterButtonText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'Watering' && styles.activeFilterButton]}
              onPress={() => handleFilter('Watering')}
            >
              <Text style={[styles.filterButtonText, filterType === 'Watering' && styles.activeFilterButtonText]}>Watering</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'Detection' && styles.activeFilterButton]}
              onPress={() => handleFilter('Detection')}
            >
              <Text style={[styles.filterButtonText, filterType === 'Detection' && styles.activeFilterButtonText]}>Detection</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style = {{marginBottom : SIZES.xLarge * 2}}
            data={filteredData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.notification_id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
                progressBackgroundColor={COLORS.white}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: COLORS.primary,
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
  },
  activeFilterButtonText: {
    color: COLORS.white,
  },
  containerNotif: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  wrapText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
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
    width: SIZES.width / 2,
    height: SIZES.height / 2,
    zIndex: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginRight: 5,
  },
  date: {
    color: '#666',
  },
});
