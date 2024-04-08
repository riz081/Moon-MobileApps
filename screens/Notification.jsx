import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getNotificationInbox } from 'native-notify'
import { COLORS, SIZES } from '../constants';
import Lottie from 'lottie-react-native';

const Notification = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const fetchedNotifications = await getNotificationInbox(20518, 'Y0GCrXNxeqFauppwEJh2wT');
      setData(fetchedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false); // Set refreshing state to false when data fetching is completed
    }
  };
  
  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredData = () => {
    if (filterType === 'daily') {
      return data.filter(item => item.title === 'Moon - Daily Check');
    } else if (filterType === 'post') {
      return data.filter(item => item.title === 'Moon - New Post');
    } else {
      return data;
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true when pull-to-refresh is triggered
    fetchNotifications(); // Fetch notifications again
  };
  
  const renderItem = ({ item }) => {
    // Split the date string into time and date components
    const [time, date] = item.date.split(', ');
    return(
      <TouchableOpacity onPress={() => {}} style={styles.containerNotif}>
        <View style={styles.notificationItem}>
          <View style={styles.wrapText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.time}>{time}</Text>
              <Text style={styles.time}>-</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

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
              style={[styles.filterButton, filterType === 'daily' && styles.activeFilterButton]}
              onPress={() => handleFilter('daily')}
            >
              <Text style={[styles.filterButtonText, filterType === 'daily' && styles.activeFilterButtonText]}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filterType === 'post' && styles.activeFilterButton]}
              onPress={() => handleFilter('post')}
            >
              <Text style={[styles.filterButtonText, filterType === 'post' && styles.activeFilterButtonText]}>Post</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.notification_id.toString()}
            refreshControl={ // Add RefreshControl for pull-to-refresh
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
  )
}

export default Notification

const styles = StyleSheet.create({
  container : {
    flex : 1
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
    flexDirection: 'row', // Make the container a row
    alignItems: 'center', // Align items vertically
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: 'space-between', // Space evenly between children
  },
  wrapText: {
    flex: 1, // Take remaining space
  },
  wrapButton: {
    marginLeft: 10, // Add some margin between text and button
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
  deleteContainer: {
    backgroundColor: COLORS.red,
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
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
    width: SIZES.width /2,
    height: SIZES.height /2,
    zIndex: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginRight: 5, // Adjust spacing between time and date
  },
  date: {
    color: '#666',
  },
});
