import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, Alert, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { createNotifications } from 'react-native-notificated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';

const { useNotifications, NotificationsProvider } = createNotifications()

const ForecastingScreens = ({navigation}) => {
  const [predictData, setPredictData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erorKu, setErorKu] = useState(false);

  const [ph, setPh] = useState(0);
  const [lembap, setSm] = useState(0);
  const [temp, setSt] = useState(0);
  const [konduk, setSc] = useState(0);
  const [nitro, setNg] = useState(0);
  const [fosfor, setFf] = useState(0);
  const [potas, setPt] = useState(0);

  const [user, setUser] = useState(null);

  const [fadeAnim] = useState(new Animated.Value(0));
  const dataPie = [
    { name: 'Nitrogen', population: nitro, color: COLORS.red, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'PH', population: ph, color: COLORS.purple, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Potasium', population: potas, color: COLORS.blue, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Phospor', population: fosfor, color: COLORS.orange, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moist', population: lembap, color: COLORS.greenOcean, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Temp', population: temp, color: COLORS.greenBamboo, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Conduct', population: konduk, color: COLORS.yellow, legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const { notify } = useNotifications()

  const chartConfig = {
    backgroundColor: COLORS.greenOcean,
    backgroundGradientFrom: COLORS.greenBamboo,
    backgroundGradientTo: COLORS.greenJungle,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: COLORS.greenBamboo,
    },
  };

  const ChartCard = ({ title, chartData }) => {
    return (
      <Card style={styles.card}>
        <Card.Title title={title} />
        <Card.Content>
          <PieChart
            data={chartData}
            width={SIZES.width * 0.8} // Adjust width as needed
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card.Content>
      </Card>
    );
  };

  // dummy function
  const determineCategory = (ph, lembap, temp, konduk, nitro, fosfor, potas) => {
    // Your conditions to determine the category
    let output;
    if (ph < 100 || lembap < 100 || temp < 100 || konduk < 100 || nitro < 100 || fosfor < 100 || potas < 100) {
      output = 'Buruk';
      setPredictData(output);
    } else if (ph >= 100 && ph <= 110 && lembap >= 100 && lembap <= 110 && temp >= 100 && temp <= 110 && konduk >= 100 && konduk <= 110 && nitro >= 100 && nitro <= 110 && fosfor >= 100 && fosfor <= 110 && potas >= 100 && potas <= 110) {
      output = 'Cukup';
      setPredictData(output);
    } else {
      output = 'Subur';
      setPredictData(output);
    }
  };

  // Versi POST METHOD
  const fetchData = async () => {
    setLoading(true)
    const body = {
      data_con: [nitro, ph, potas, fosfor, lembap, temp, konduk],
    };
  
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
    }
  
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timeout'));
        }, 20000); // 20 seconds timeout
      });

      const response = await Promise.race([
        axios.post('https://qm1m7lvx-8000.asse.devtunnels.ms/classification', body, { headers }),
        timeoutPromise,
      ]);

      const dataForecasting = response.data;
      const forecastData = dataForecasting.forecasting;

      // Extracting values from data_con
      const [nitroValue, phValue, potasValue, fosforValue, lembapValue, tempValue, kondukValue] = dataForecasting.data_con;

      // Setting state values
      setLoading(false);
      setPh(phValue);
      setNg(nitroValue);
      setFf(fosforValue);
      setPt(potasValue);
      setSc(kondukValue);
      setSt(tempValue);
      setSm(lembapValue);

      setPredictData(forecastData);
    } catch (error) {
      setLoading(false);

      if (error.message === 'Request timeout') {
        // Handle timeout error
        console.error('Request timed out:', error);
        notify('error', {
          params: {
            description: error.message || 'An unknown error occurred.',
            title: 'Error',
          },
        })
        // Alert.alert('Request Timeout', 'The request took too long. Please try again.');
      } else {
        console.error('Error fetching data forecasting:', error);
        notify('error', {
          params: {
            description: error.message || 'An unknown error occurred.',
            title: 'Error',
          },
        })
        // Alert.alert('Error', 'Failed to fetch data. Please try again.');
      }
    }
  }

  const onRefresh = () => {
    // setLoading(true);
    fetchData();
    // setLoading(false);
  };

  // console.log('ph : ',ph)


  useEffect(() => {
    fetchData();
    const category = determineCategory(ph, lembap, temp, konduk, nitro, fosfor, potas);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in
          console.log('User is:', user.email);
        } else {
          // User is logged out
          console.log('User is');
        }

        setUser(user);
    });      

    return () => unsubscribe();
  }, [ph, nitro, fosfor, potas, konduk, temp, lembap, fadeAnim, auth]);

  let containerStyle, textColor;

  if (predictData === 'Buruk') {
    containerStyle = { backgroundColor: '#f8d7da', borderColor: '#d9534f' };
    textColor = { color: '#721c24' };
  } else if (predictData === 'Cukup') {
    containerStyle = { backgroundColor: '#fff3cd', borderColor: '#ffeeba' };
    textColor = { color: '#856404' };
  } else {
    containerStyle = { backgroundColor: '#d4edda', borderColor: '#c3e6cb' };
    textColor = { color: '#155724' };
  }

  return (
    <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            // You can customize the colors of the refresh indicator
            tintColor="#3F51B5"
            title="Refreshing..."
            titleColor="#3F51B5"
          />
        }>
        {erorKu && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>410</Text>
            <Text style={styles.overlayText}>Data is Gone</Text>
            <Image
              style={styles.overlayImage}
              source={require('../assets/images/networkError.png')}
            />
          </View>
        )}

        {loading ? (
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
          <>
            <GestureHandlerRootView>
              <NotificationsProvider/>
              <ChartCard title="Pie Chart" chartData={dataPie} />
              <Animated.View
                  style={[
                      styles.containerAnim,
                      { opacity: fadeAnim },
                      predictData === 'Cukup' ? { backgroundColor: COLORS.yellow } : null,
                      predictData === 'Subur' ? { backgroundColor: COLORS.greenOcean } : null
                  ]}
              >
                  <Text style={styles.predictText}>{predictData}</Text>
                  <Text style={styles.descriptionText}>
                      {predictData === 'Buruk'
                          ? 'Tanah ini memiliki kondisi kurang subur. Dapat diperlukan perbaikan dan pemupukan untuk meningkatkan kualitas tanah.'
                          : predictData === 'Cukup'
                          ? 'Tanah ini memiliki kondisi cukup subur. Perhatikan kebutuhan tanaman dan lakukan pemeliharaan agar tanaman dapat tumbuh dengan baik.'
                          : predictData === 'Subur' 
                          ? 'Tanah ini sangat subur! Cocok untuk pertanian atau kegiatan bercocok tanam lainnya.'
                          : ''}
                  </Text>
              </Animated.View>

            </GestureHandlerRootView>
          </>
        )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    backgroundColor: COLORS.lightWhite,
    top: -42,
  },
  overlayText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'bold',
    top: 220,
    color : COLORS.greenBamboo
  },
  overlayImage: {
    width: SIZES.width,
    height: SIZES.height,
    resizeMode: 'contain',
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
  card: {
    width: SIZES.width * 0.9, // Adjust the width percentage as needed
    margin: 5,
  },
  containerAnim: {
    padding: 20,
    backgroundColor: '#f8d7da', // Red background for 'Buruk'
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9534f', // Border color for 'Buruk'
  },
  predictText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#721c24', // Dark red text color for 'Buruk'
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#721c24', // Dark red text color for 'Buruk'
    fontStyle: 'italic', // Italic font style
  },
});

export default ForecastingScreens;
