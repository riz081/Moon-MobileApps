import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions, Modal, FlatList, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../constants/theme';

const ChartScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()));
  const [selectedData, setSelectedData] = useState('nitro');
  const [popupVisible, setPopupVisible] = useState(false);
  const [nitroData, setNitroData] = useState([]);
  const [potaData, setPotaData] = useState([]);
  const [phosData, setPhosData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [conductivityData, setConductivityData] = useState([]);
  const [phData, setPhData] = useState([]);
  const [showAllData, setShowAllData] = useState(false);

  useEffect(() => {
    fetchNitro();
    fetchPota();
    fetchPhos();
    fetchHumidity();
    fetchTemp(); // Fetch temperature data
    fetchConduct(); // Fetch conductivity data
    fetchPh(); // Fetch pH data
  }, []);

  const fetchData = async (url, setDataCallback) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
        }
      });
      const data = await res.json();
      const formattedData = data["m2m:list"].map(item => {
        const { con, ct } = item['m2m:cin'];
        const nilai = parseInt(con.slice(1), 10);
        const year = parseInt(ct.substr(0, 4), 10);
        const month = parseInt(ct.substr(4, 2), 10);
        const day = parseInt(ct.substr(6, 2), 10);
        const hours = parseInt(ct.substr(9, 2), 10);
        const date = new Date(year, month - 1, day, hours); // Include hours
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return {
          nilai,
          dayName,
          hours,
          date: date.toDateString()
        };
      });
      setDataCallback(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchNitro = () => fetchData('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/Nitrogen?fu=1&drt=2&ty=4', setNitroData);
  const fetchPota = () => fetchData('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/pota?fu=1&drt=2&ty=4', setPotaData);
  const fetchPhos = () => fetchData('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/phospor?fu=1&drt=2&ty=4', setPhosData);
  const fetchHumidity = () => fetchData('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/humidity?fu=1&drt=2&ty=4', setHumidityData);

  const fetchTemp = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/temp?fu=1&drt=2&ty=4', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
        }
      });
      const data = await res.json();
      const formattedData = data["m2m:list"].map(item => {
        const { con, ct } = item['m2m:cin'];
        const nilai = parseInt(con.slice(1), 10);
        const year = parseInt(ct.substr(0, 4), 10);
        const month = parseInt(ct.substr(4, 2), 10);
        const day = parseInt(ct.substr(6, 2), 10);
        const hours = parseInt(ct.substr(9, 2), 10);
        const date = new Date(year, month - 1, day, hours); // Include hours
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return {
          nilai,
          dayName,
          hours,
          date: date.toDateString()
        };
      });
      setTemperatureData(formattedData);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
    }
    setLoading(false);
  };

  const fetchConduct = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/EC?fu=1&drt=2&ty=4', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
        }
      });
      const data = await res.json();
      const formattedData = data["m2m:list"].map(item => {
        const { con, ct } = item['m2m:cin'];
        const nilai = parseInt(con.slice(1), 10);
        const year = parseInt(ct.substr(0, 4), 10);
        const month = parseInt(ct.substr(4, 2), 10);
        const day = parseInt(ct.substr(6, 2), 10);
        const hours = parseInt(ct.substr(9, 2), 10);
        const date = new Date(year, month - 1, day, hours); // Include hours
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return {
          nilai,
          dayName,
          hours,
          date: date.toDateString()
        };
      });
      setConductivityData(formattedData);
    } catch (error) {
      console.error('Error fetching conductivity data:', error);
    }
    setLoading(false);
  };

  const fetchPh = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/ph?fu=1&drt=2&ty=4', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
        }
      });
      const data = await res.json();
      const formattedData = data["m2m:list"].map(item => {
        const { con, ct } = item['m2m:cin'];
        const nilai = parseInt(con.slice(1), 10);
        const year = parseInt(ct.substr(0, 4), 10);
        const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
        const day = parseInt(ct.substr(6, 2), 10);
        const hours = parseInt(ct.substr(9, 2), 10);
        const date = new Date(year, month, day, hours); // Include hours
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

        return { 
          nilai, 
          dayName, 
          hours,
          date: date.toDateString()
        };
      });
      setPhData(formattedData);
    } catch (error) {
      console.error('Error fetching pH data:', error);
    }
    setLoading(false);
  };

  const organizeDataByWeek = (data) => {
    const weekData = {};
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].forEach(day => {
      weekData[day] = new Array(24).fill(0);
    });
    data.forEach(item => {
      const { dayName, hours, nilai } = item;
      weekData[dayName][hours] = nilai;
    });
    return weekData;
  };

  const allDataByDate = {
    nitro: organizeDataByWeek(nitroData),
    pota: organizeDataByWeek(potaData),
    phos: organizeDataByWeek(phosData),
    humidity: organizeDataByWeek(humidityData),
    temperature: organizeDataByWeek(temperatureData),
    conductivity: organizeDataByWeek(conductivityData),
    ph: organizeDataByWeek(phData)
  };

  const daysOfWeek = Object.keys(allDataByDate.nitro);

  const screenWidth = Dimensions.get("window").width;

  const getCurrentData = (selectedDay) => {
    const colorMap = {
      nitro: COLORS.red,
      pota: COLORS.blue,
      phos: COLORS.gray,
      humidity: COLORS.lightWhite,
      temperature: 'silver', // Set line color for temperature data
      conductivity: 'black', // Set line color for conductivity data
      ph: 'purple' // Set line color for pH data
    };
  
    const color = colorMap[selectedData] || 'rgba(0, 0, 0, 1)';
    const currentData = {
      labels: Array.from({ length: 24 }, (_, i) => i.toString()),
      datasets: [
        {
          data: allDataByDate[selectedData][selectedDay],
          color: (opacity = 1) => color,
          strokeWidth: 2,
        },
      ],
      legend: [`${selectedData} data for ${selectedDay}`],
    };
    return currentData;
  };
  
  
  const toggleShowAllData = () => {
    setShowAllData(!showAllData);
  };
  

  const currentData = getCurrentData(selectedDay);

  const renderPopupItem = ({ item }) => (
    <View style={styles.popupItem}>
      <Text>{item.date}</Text>
      <Text>{item.dayName}</Text>
      <Text>{item.hours}</Text>
      <Text>{item.nilai}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Data for {selectedDay}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <LineChart
            data={currentData}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
        )}
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
          style={styles.picker}
        >
          {daysOfWeek.map((day, index) => (
            <Picker.Item key={index} label={day} value={day} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedData}
          onValueChange={(itemValue) => setSelectedData(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Nitrogen" value="nitro" />
          <Picker.Item label="Potassium" value="pota" />
          <Picker.Item label="Phosphorus" value="phos" />
          <Picker.Item label="Humidity" value="humidity" />
          <Picker.Item label="Temperature" value="temperature" />
          <Picker.Item label="Conductivity" value="conductivity" />
          <Picker.Item label="pH" value="ph" />
        </Picker>
      </View>
      <Modal
        visible={popupVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.popupContainer}>
          <FlatList
            data={humidityData} // Change to appropriate data source
            renderItem={renderPopupItem}
            keyExtractor={(item, index) => item.date + index}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPopupVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(192, 192, 192, ${opacity})`, // Silver color
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for label axis
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5fcff',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  picker: {
    flex: 1,
    height: 50,
    width: 100,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  popupItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
});

export default ChartScreen;