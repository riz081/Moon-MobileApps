import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'
import Lottie from 'lottie-react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config';


const HistoryScreens = () => {
    const [email, setEmail] = useState(null);
    const route = useRoute()
    const {title} = route.params
    // console.log(route.params)
    const [loading, setLoading] = useState(false)

    const [dataNitro, setDataNitro] = useState();
    const [dataPotas, setDataPotas] = useState();
    const [dataPhospor, setDataPhospor] = useState();
    const [dataConductivity, setDataConductivity] = useState();
    const [dataTemperature, setDataTemperature] = useState();
    const [dataHumidity, setDataHumidity] = useState();
    const [dataPh, setDataPh] = useState();

    const fetchNitro = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/Nitrogen?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataNitro(data)
    }

    const fetchPota = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/pota?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataPotas(data)
    }

    const fetchPhospor = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/phospor?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataPhospor(data)
    }

    const fetchHumidity = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/humidity?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataHumidity(data)
    }

    const fetchConduct = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/EC?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataConductivity(data)
    }

    const fetchTemp = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/temp?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataTemperature(data)
    }

    const fetchPh = async() => {
      setLoading(true)
      const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/ph?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : '44dbb85550128192:c079ec55758e79bb'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        // const data = res_ng["m2m:list"].map(item => item["m2m:cin"]["con"]);
        const data = res_ng["m2m:list"].map(item => {
          const { con, ct, hari, jam, menit } = item["m2m:cin"];
          // convert to integer
          const nilai =  con.length === 6 ?
                    Number(con.substring(1, 5)) :
                    con.length === 5 ?
                    Number(con.substring(1, 4)) :
                    con.length === 4 ?
                    Number(con.substring(1, 3)) :
                    Number(con.substring(1, 2)) 

          // convert to date time
          const year = parseInt(ct.substr(0, 4), 10);
          const month = parseInt(ct.substr(4, 2), 10) - 1; // Months are zero-indexed
          const day = parseInt(ct.substr(6, 2), 10);
          // convert day
          const intDay = parseInt(ct.substr(6, 2), 10);
          // Create a Date object for the current week's Sunday
          const date = new Date();
          date.setDate(date.getDate() - date.getDay());

          // Move to the desired day of the week
          date.setDate(date.getDate() + intDay);

          // Use Intl.DateTimeFormat to get the day name
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

          const hours = parseInt(ct.substr(9, 2), 10);
          const minutes = parseInt(ct.substr(11, 2), 10);
          const seconds = parseInt(ct.substr(13, 2), 10);

          return { 
            con: nilai, 
            hari: dayName, 
            jam : hours, 
            menit : minutes, 
            tanggal: day,
            bulan : month,
            tahun : year
          };
        });
      
        // console.log('fetch nitro : '+ data)
        setLoading(false)
        setDataPh(data)
    }


    useEffect(() => {
      fetchNitro()
      fetchPota()
      fetchPhospor()
      fetchHumidity()
      fetchTemp()
      fetchConduct()
      fetchPh()

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in
          console.log('User logged in:', user.email);
          setEmail(user.email); // Set email state
        } else {
          // User is logged out
          console.log('User logged out');
          setEmail(null); // Clear email state
          // Optionally, clear user data state here
        }
      });

    return () => unsubscribe();
    }, [auth, email])

  const renderHeader = () => (
    <View style={styles.card(COLORS.greenBamboo)}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>        
      </View>

      <View style={styles.body}>
        <Image source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{email}</Text>
          <Text style={styles.userRole}>User</Text>
        </View>
      </View>
    </View>
  )

  const renderClassNitro = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassPotas = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassPhospor = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassConductivity = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassTemperature = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassHumidity = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  const renderClassPh = ({ item }) => (
    <View style={styles.classItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.classContent}>
        <View style={styles.classHours}>
          <Text style={styles.startTime}>{item.jam} : {item.menit}</Text>
          <Text style={styles.endTime}>{`${item.tanggal}/${item.bulan}/${item.tahun}`}</Text>
        </View>

        <View style={[styles.card(COLORS.greenJungle)]}>
          <Text style={styles.cardDate}>{`Timestamp: ${item.hari}`}</Text>          
          <Text style={styles.cardTitle}>Value : {item.con}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
          {title === 'nitrogen' ? (
            <FlatList
              data={dataNitro ? dataNitro.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassNitro}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'potasium' ? (
            <FlatList
              data={dataPotas ? dataPotas.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassPotas}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'phospor' ? (
            <FlatList
              data={dataPhospor ? dataPhospor.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassPhospor}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'konduktivitas' ? (
            <FlatList
              data={dataConductivity ? dataConductivity.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassConductivity}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'temperature' ? (
            <FlatList
              data={dataTemperature ? dataTemperature.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassTemperature}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'kelembapan' ? (
            <FlatList
              data={dataHumidity ? dataHumidity.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassHumidity}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : title === 'PH' ? (
            <FlatList
              data={dataPh ? dataPh.slice(0, 10) : []}
              ListHeaderComponent={renderHeader}
              renderItem={renderClassPh}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'bold', top: 129 }}>404</Text>
              <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'bold', top: 129 }}>Page Not Found</Text>
              <Image
                style={{ width: SIZES.width / 1.3, height: SIZES.height / 1.3, resizeMode: 'contain' }}
                source={require('../assets/images/notFound.png')}
              />
            </View>
          )}
        </>
      )}
    </View>

  )
}

export default HistoryScreens

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
  container: {
    flex:1,
    paddingTop: 20,
  },
  card: (warna) => ({
    flex:1,
    backgroundColor: warna,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    padding: 16,
  }),
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    color: COLORS.lightWhite,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform : 'capitalize'
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:COLORS.lightWhite,
  },
  userRole: {
    fontSize: 12,
    color:COLORS.lightWhite,
  },
  classItem: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.greenGossip,
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.greenOcean,
  },
  classContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  classHours: {
    marginRight: 8,
    alignItems: 'flex-end',
  },
  startTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  endTime: {
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.white,
    marginBottom: 8,
  }
});