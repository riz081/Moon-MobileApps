import { TouchableOpacity, Text, View, Alert, StyleSheet, Image, SafeAreaView, ScrollView, RefreshControl} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SimpleLineIcons } from "@expo/vector-icons";
import { SIZES, COLORS } from '../constants';
import Lottie from 'lottie-react-native';

const Home = ({navigation}) => {
  const {image, name} = {"id": 1, "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/1280px-Muskmelon.jpg", "name": "Cucumis Melo", "species": "Tropical Tree Species"} //route.params.data
  // console.log(route.params.data)

  const [Ph, setPh] = useState()
  const [Sm, setSm] = useState()  
  const [St, setSt] = useState()  
  const [Sc, setSc] = useState() 
  const [Ng, setNg] = useState()
  const [Ff, setFf] = useState()
  const [Pt, setPt] = useState() 
  const [loading, setLoading] = useState(false)  
  const [trouble, setTrouble] = useState(false)

    // PH
    const fetchData_PH = async () => {
        try {
            setLoading(true);
            const res_ph = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/ph?fu=1&drt=2&ty=4', {
                method: 'get',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
                }
            });
        
            if (!res_ph.ok) {
                throw new Error(`Failed to fetch data. Status: ${res_ph.status}`);
            }
        
            const data_ph = (await res_ph.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
            
            if (!data_ph) {
                throw new Error('Data not found');
            }
        
            const Ph = data_ph.length === 6 ?
                Number(data_ph.substring(1, 5)) :
                data_ph.length === 5 ?
                Number(data_ph.substring(1, 4)) :
                data_ph.length === 4 ?
                Number(data_ph.substring(1, 3)) :
                Number(data_ph.substring(1, 2));
        
            setPh(Ph);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            // Display an alert for the error
            setTrouble(true)
        }
    };
  
    //Soil Moisture(Kelembapan Tanah)
    const fetchData_SM = async () => {
        try {
        setLoading(true);
        const res_sm = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/humidity?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_sm.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_sm.status}`);
        }
    
        const data_sm = (await res_sm.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_sm) {
            throw new Error('Data not found');
        }
    
        const Sm = data_sm.length === 6 ?
            Number(data_sm.substring(1, 5)) :
            data_sm.length === 5 ?
            Number(data_sm.substring(1, 4)) :
            data_sm.length === 4 ?
            Number(data_sm.substring(1, 3)) :
            Number(data_sm.substring(1, 2));
    
        setSm(Sm);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching Soil Moisture data:', error);
        setLoading(false);
        // Display an alert for the error
        setTrouble(true)
        }
    };
  
    // Soil Temperature(Temperatur Tanah)
    const fetchData_ST = async () => {
        try {
        setLoading(true);
        const res_st = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/temp?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_st.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_st.status}`);
        }
    
        const data_st = (await res_st.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_st) {
            throw new Error('Data not found');
        }
    
        const St = data_st.length === 6 ?
            Number(data_st.substring(1, 5)) :
            data_st.length === 5 ?
            Number(data_st.substring(1, 4)) :
            data_st.length === 4 ?
            Number(data_st.substring(1, 3)) :
            Number(data_st.substring(1, 2));
    
        setSt(St);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching Soil Temperature data:', error);
        setLoading(false);
        setTrouble(true)
        }
    };
  
    // Soil Conductivity(Konduktivitas Tanah)
    const fetchData_SC = async () => {
        try {
        setLoading(true);
        const res_sc = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/EC?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_sc.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_sc.status}`);
        }
    
        const data_sc = (await res_sc.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_sc) {
            throw new Error('Data not found');
        }
    
        const Sc = data_sc.length === 6 ?
            Number(data_sc.substring(1, 5)) :
            data_sc.length === 5 ?
            Number(data_sc.substring(1, 4)) :
            data_sc.length === 4 ?
            Number(data_sc.substring(1, 3)) :
            Number(data_sc.substring(1, 2));
    
        setSc(Sc);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching Soil Conductivity data:', error);
        setLoading(false);
        setTrouble(true)
        }
    };
  
    // Nitrogen(Nitrogen)
    const fetchData_NG = async () => {
        try {
        setLoading(true);
        const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/Nitrogen?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_ng.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_ng.status}`);
        }
    
        const data_ng = (await res_ng.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_ng) {
            throw new Error('Data not found');
        }
    
        const Ng = data_ng.length === 6 ?
            Number(data_ng.substring(1, 5)) :
            data_ng.length === 5 ?
            Number(data_ng.substring(1, 4)) :
            data_ng.length === 4 ?
            Number(data_ng.substring(1, 3)) :
            Number(data_ng.substring(1, 2));
    
        setNg(Ng);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching Nitrogen data:', error);
        setLoading(false);
        setTrouble(true)
        }
    };
  
    // Fosfor(Fosfor)
    const fetchData_FF = async () => {
        try {
        setLoading(true);
        const res_ff = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/phospor?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_ff.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_ff.status}`);
        }
    
        const data_ff = (await res_ff.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_ff) {
            throw new Error('Data not found');
        }
    
        const Ff = data_ff.length === 6 ?
            Number(data_ff.substring(1, 5)) :
            data_ff.length === 5 ?
            Number(data_ff.substring(1, 4)) :
            data_ff.length === 4 ?
            Number(data_ff.substring(1, 3)) :
            Number(data_ff.substring(1, 2));
    
        setFf(Ff);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching Fosfor data:', error);
        setLoading(false);
        setTrouble(true)
        }
    };

    // Potassium(Potassium)
    const fetchData_PT = async () => {
        try {
        setLoading(true);
        const res_pt = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/interest/pota?fu=1&drt=2&ty=4', {
            method: 'get',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-M2M-Origin': '44dbb85550128192:c079ec55758e79bb'
            }
        });
    
        if (!res_pt.ok) {
            throw new Error(`Failed to fetch data. Status: ${res_pt.status}`);
        }
    
        const data_pt = (await res_pt.json())?.['m2m:list']?.[0]?.['m2m:cin']?.['con'];
    
        if (!data_pt) {
            throw new Error('Data not found');
        }
    
        const Pt = data_pt.length === 6 ?
            Number(data_pt.substring(1, 5)) :
            data_pt.length === 5 ?
            Number(data_pt.substring(1, 4)) :
            data_pt.length === 4 ?
            Number(data_pt.substring(1, 3)) :
            Number(data_pt.substring(1, 2));
    
        setPt(Pt);
        setLoading(false);
        } catch (error) {
            console.error('Error fetching Potassium data:', error);
            setLoading(false);
            setTrouble(true)
        }
    };
  


    useEffect(() => {
        fetchData_PH();
        fetchData_NG();
        fetchData_FF();
        fetchData_PT();
        fetchData_SC();
        fetchData_SM();
        fetchData_ST();
    }, [])

    const onRefresh = () => {
        // setRefreshing(false);
        fetchData_PH();
        fetchData_NG();
        fetchData_FF();
        fetchData_PT();
        fetchData_SC();
        fetchData_SM();
        fetchData_ST();
      };

    const menuItem = (key, title, value, onPress) => (
        <TouchableOpacity key={key} onPress={onPress}>
            <View style={styles.menuItemContainer}>
                <Image source={getMenuImage(title)} style={styles.menuImage} />
                <View style={styles.menuItemTextContainer}>
                    <Text style={styles.menuTextTitle}>{title}</Text>
                    <Text style={styles.menuTextValue}>{value}</Text>
                </View>
                <SimpleLineIcons name='arrow-right' size={18} color={COLORS.greenBamboo} />
            </View>
        </TouchableOpacity>
    );
    
    const getMenuImage = (title) => {
    // Define the image source based on the menu title
        switch (title) {
            case 'NPK':
            return require('../assets/images/monitor/npk.png');
            case 'Tanah':
            return require('../assets/images/monitor/tanah.png');
            case 'Ph':
            return require('../assets/images/monitor/ph.png');
            default:
            return null;
        }
    };      

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow : 1 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh}/>
                }
            >
                {trouble && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>410</Text>
                        <Text style={styles.overlayText}>Data is Gone</Text>
                        <Image
                            style={styles.overlayImage}
                            source={require('../assets/images/notFound.png')}
                        />
                    </View>
                )}

                {loading && (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingBackground} />
                        <Lottie
                            style={styles.loadingAnimation}
                            source={require('../assets/animations/loading cube.json')}
                            autoPlay
                            loop
                        />
                    </View>
                )}

                <View style={styles.container}>
                    <Image source={{ uri: image }} style={styles.image} />

                    <View style={styles.details}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>{name}</Text>
                        </View>

                        <View style={styles.menuWrapper}>
                            {menuItem(1, 'NPK', `${Ng}, ${Ff}, ${Pt}`, () =>
                                navigation.navigate('Npk Screen', { nitro: Ng, fosfor: Ff, potas: Pt })
                            )}

                            {menuItem(2, 'Tanah', `${Sc}, ${St}, ${Sm}`, () =>
                                navigation.navigate('Tanah Screen', { konduk: Sc, temp: St, lembap: Sm, image: image })
                            )}

                            {menuItem(3, 'Ph', `${Ph}`, () =>
                                navigation.navigate('Ph Screen', { ph: Ph })
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        backgroundColor: COLORS.lightWhite,
        top : -42
      },
      overlayText: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'bold',
        top : 120
      },
      overlayImage: {
        width: SIZES.width / 1.3,
        height: SIZES.height / 1.3,
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
        width: SIZES.width /2,
        height: SIZES.height /2,
        zIndex: 2,
      },
    container : {
        flex : 1,
        backgroundColor : COLORS.lightWhite
    },
    image : {
        aspectRatio : 1.8,
        resizeMode : 'cover'
    },
    details : {
        marginTop : -SIZES.large,
        backgroundColor : COLORS.lightWhite,
        borderTopLeftRadius : SIZES.xLarge,
        borderTopRightRadius : SIZES.xLarge
    },
    titleRow : {
        marginHorizontal : 20,
        paddingBottom : SIZES.small,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : SIZES.width -44,
        top : 20
    },
    title : {
        fontFamily : 'bold',
        fontSize : SIZES.large,
        textTransform : 'capitalize'
    },
    menuWrapper : {
        marginTop : SIZES.large,
        width : SIZES.width,
        backgroundColor : COLORS.lightWhite,
        borderRadius : 12
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
        justifyContent : 'space-evenly',
      },
      menuImage: {
        width: SIZES.xxLarge -4,
        height: SIZES.xxLarge -4,
        marginRight: -12,
      },
      menuItemTextContainer: {
        width: '50%', // Adjust as needed
      },
      menuTextTitle: {
        color: COLORS.gray,
        fontFamily : 'semibold',
        fontSize: 18,
      },
      menuTextValue: {
        color: COLORS.greenBamboo,
        fontFamily : 'regular',
        fontSize: 16,
      }
})

