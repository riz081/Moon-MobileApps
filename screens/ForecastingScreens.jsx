import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { createNotifications } from 'react-native-notificated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Ionicons } from '@expo/vector-icons'

const { useNotifications, NotificationsProvider } = createNotifications();

const ForecastingScreens = ({ navigation }) => {
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

  const [fadeAnim] = useState(new Animated.Value(0));
  const [pdfGenerated, setPdfGenerated] = useState(false); // New state for PDF generation status

  const dataPie = [
    { name: 'Nitrogen', population: nitro, color: COLORS.red, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'PH', population: ph, color: COLORS.purple, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Potasium', population: potas, color: COLORS.blue, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Phospor', population: fosfor, color: COLORS.orange, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moist', population: lembap, color: COLORS.greenOcean, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Temp', population: temp, color: COLORS.greenBamboo, legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Conduct', population: konduk, color: COLORS.yellow, legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const { notify } = useNotifications();

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
        <Card.Content>
          <View style={styles.headerContainer}>
            <Card.Title title={title} />
            <TouchableOpacity 
              style={[
                styles.button, 
                !pdfGenerated || pdfGenerated === false ? { backgroundColor: COLORS.greenBamboo } : null
              ]} 
              onPress={generatePDF}
            >
              <View style={styles.buttonContent}>
                {pdfGenerated ? (
                  <Ionicons name="cloud-done-outline" size={22} color={COLORS.lightWhite} style={styles.icon} />
                ) : (
                  <Ionicons name="cloud-upload-outline" size={22} color={COLORS.lightWhite} style={styles.icon} />
                )}
                <Text style={styles.buttonText}>
                  {pdfGenerated ? ' Complete' : 'Report'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity onPress={() => navigation.navigate('Chart')}>
            <Text>Tes</Text>
          </TouchableOpacity>
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
    setLoading(true);
    const body = {
      data_con: [nitro, ph, potas, fosfor, lembap, temp, konduk],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb',
    };

    try {
      const response = await Promise.race([
        axios.post('https://qm1m7lvx-8000.asse.devtunnels.ms/classification', body, { headers }),
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
      notify('error', {
        params: {
          description: error.message || 'An unknown error occurred.',
          title: 'Error',
        },
      });
    }
  };

  const onRefresh = () => {
    fetchData();
    setPdfGenerated(false); // Reset the PDF generation status on refresh
  };

  useEffect(() => {
    fetchData();
    determineCategory(ph, lembap, temp, konduk, nitro, fosfor, potas);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

  }, [ph, nitro, fosfor, potas, konduk, temp, lembap, fadeAnim, auth]);

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

  const generatePDF = async () => {
    const htmlContent = `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Classification Report</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
          <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                color: #333;
            }
            .table-container {
                margin-top: 20px;
            }
            .data-point {
                font-size: 14px;
                color: #555;
            }
        </style>
        <script>
            // Function to format the current date
            function formatDate() {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date().toLocaleDateString(undefined, options);
            }
            
            // Insert the current date and location into the HTML
            document.addEventListener("DOMContentLoaded", function() {
                document.getElementById('currentDate').innerText = formatDate();
                document.getElementById('location').innerText = "Rooftop";
            });
        </script>
        </head>
        <body>
          <h1>Classification Report</h1>
          <p class="mt-4">Classification: <strong>Buruk</strong></p>
          <p>Date: <strong id="currentDate"></strong></p>
          <p>Location: <strong id="location"></strong></p>
          <div class="table-container">
              <table class="table table-bordered table-hover">
                  <thead class="table-dark">
                      <tr>
                          <th scope="col">Data Point</th>
                          <th scope="col">Value</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>PH</td>
                          <td>${ph}</td>
                      </tr>
                      <tr>
                          <td>Moisture</td>
                          <td>${lembap}</td>
                      </tr>
                      <tr>
                          <td>Temperature</td>
                          <td>${temp}</td>
                      </tr>
                      <tr>
                          <td>Conductivity</td>
                          <td>${konduk}</td>
                      </tr>
                      <tr>
                          <td>Nitrogen</td>
                          <td>${nitro}</td>
                      </tr>
                      <tr>
                          <td>Phosphorus</td>
                          <td>${fosfor}</td>
                      </tr>
                      <tr>
                          <td>Potassium</td>
                          <td>${potas}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
    setPdfGenerated(true); // Update the PDF generation status on success

    notify('success', {
      params: {
        title: 'Success',
        description: 'Report exported successfully!',
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          tintColor="#3F51B5"
          title="Refreshing..."
          titleColor="#3F51B5"
        />
      }
    >
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
            <NotificationsProvider />
            <ChartCard title="Pie Chart" chartData={dataPie} />
            <Animated.View
              style={[
                styles.containerAnim,
                { opacity: fadeAnim },
                predictData === 'Cukup' ? { backgroundColor: COLORS.yellow } : null,
                predictData === 'Subur' ? { backgroundColor: COLORS.greenOcean } : null,
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
    color: COLORS.greenBamboo,
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
  contentContainer: {
    position: 'relative',
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
  card: {
    width: SIZES.width * 0.9, // Adjust the width percentage as needed
    margin: 5,
    position: 'relative', // Ensure the card is positioned relatively
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(169, 169, 169, 0.5)', // Gray with 50% opacity
    borderRadius: 12,
    width: '30%', // Set width to 50%
    position: 'absolute',
    right: 0, // Align to the right side of the card
    bottom: 5, // Adjust as needed for vertical positioning
    zIndex: 1, // Ensure the button is above the chart
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5, // Adjust the padding between the icon and text
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 12,
  },
  
});

export default ForecastingScreens;
