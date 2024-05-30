import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Ionicons from '@expo/vector-icons/Ionicons'


const TanahScreens = ({ navigation }) => {

    const route = useRoute()
    const { konduk, temp, lembap} = route.params
    console.log( konduk, temp, lembap)

    const KonduktivitasRoute = () => (
        <View style={styles.containerRoute}>
          <Image
            source={{uri : 'https://www.swadayaonline.com/images/view/-IMG_20200508_4339.jpg'}}
            style={styles.image}
          />
       
          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>
                konduktivitas
              </Text>
            </View>
            <View style={{ padding : 20, marginTop : 10, marginHorizontal : 10 }}>
                <Text style={{ fontFamily : 'semibold', fontSize : 18, color : COLORS.greenBamboo, textTransform : 'capitalize' }}>description</Text>                
                <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray, marginTop: 8}}>
                    "Kualitas melon optimal ketika kadar nitrogen di atas 110, melon cukup baik jika antara 100 hingga 110, namun hindari yang di bawah 100 untuk hasil terbaik. Pilih melon, nikmati kesegaran yang tak terlupakan!"
                </Text>
                <View style={{ flexDirection : 'row', marginVertical : 5 }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>Kadar </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>: </Text>
                    </View>
                    <View style={{ width: '34%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenJungle }}>{konduk}</Text>
                    </View>
                </View> 
            </View>
            <View style={{ padding : 20, marginBottom : 6, marginHorizontal : 10, top : -40 }}>
                {konduk < 100 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.red, fontStyle : 'italic', fontWeight : '600'}}>
                        "Sayangnya, melon dengan kadar nitrogen di bawah 100 tidak memberikan kualitas terbaik. Pilih melon dengan nilai yang lebih tinggi untuk menikmati rasa dan manfaat terbaiknya!"
                    </Text>
                )}

                {(konduk >= 100 && konduk <= 110) && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.black, fontStyle : 'italic', fontWeight : '600'}}>
                        Melon ini memiliki kadar nitrogen yang cukup baik. Nikmati rasa yang lezat dan manfaat kesehatannya!
                    </Text>
                )}

                {konduk > 110 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.greenBamboo, fontStyle : 'italic', fontWeight : '600'}}>
                        Wow! Tanaman melon ini memiliki kadar nitrogen yang tinggi, memberikan hasil terbaik. Selamat menikmati melon berkualitas tinggi!
                    </Text>
                )}
            </View>

            <View style={{justifyContent : 'center', alignItems : 'center', marginVertical : SIZES.xSmall, top : -42}}>
                {/* Button */}
                <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : 'konduktivitas'})} key={1} style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8, 
                    flexDirection : 'row',
                    gap : 5
                }}>
                    <Ionicons
                        name='time'
                        size={22}
                        color={COLORS.lightWhite}
                    />
                    <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                        Log Details
                    </Text>              
                </TouchableOpacity>             
            </View>
          </View>
        </View>
    );
    
    const TemperatureRoute = () => (
        <View style={styles.containerRoute}>
          <Image
            source={{uri : 'https://www.swadayaonline.com/images/view/-IMG_20200508_4339.jpg'}}
            style={styles.image}
          />
       
          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>
                Temperature
              </Text>
            </View>
            <View style={{ padding : 20, marginTop : 10, marginHorizontal : 10 }}>
                <Text style={{ fontFamily : 'semibold', fontSize : 18, color : COLORS.greenBamboo, textTransform : 'capitalize' }}>description</Text>                
                <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray, marginTop: 8}}>
                    "Kualitas melon optimal ketika kadar potasium di atas 110, melon cukup baik jika antara 100 hingga 110, namun hindari yang di bawah 100 untuk hasil terbaik. Pilih melon, nikmati kesegaran yang tak terlupakan!"
                </Text>
                <View style={{ flexDirection : 'row', marginVertical : 5 }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>Kadar </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>: </Text>
                    </View>
                    <View style={{ width: '34%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenJungle }}>{temp}</Text>
                    </View>
                </View> 
            </View>
            <View style={{ padding : 20, marginBottom : 6, marginHorizontal : 10, top : -40 }}>
                {temp < 100 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.red, fontStyle : 'italic', fontWeight : '600'}}>
                        "Sayangnya, melon dengan kadar potasium di bawah 100 tidak memberikan kualitas terbaik. Pilih melon dengan nilai yang lebih tinggi untuk menikmati rasa dan manfaat terbaiknya!"
                    </Text>
                )}

                {(temp >= 100 && temp <= 110) && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.black, fontStyle : 'italic', fontWeight : '600'}}>
                        Melon ini memiliki kadar potasium yang cukup baik. Nikmati rasa yang lezat dan manfaat kesehatannya!
                    </Text>
                )}

                {temp > 110 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.greenBamboo, fontStyle : 'italic', fontWeight : '600'}}>
                        Wow! Tanaman melon ini memiliki kadar potasium yang tinggi, memberikan hasil terbaik. Selamat menikmati melon berkualitas tinggi!
                    </Text>
                )}
            </View>

            <View style={{justifyContent : 'center', alignItems : 'center', marginVertical : SIZES.xSmall, top : -42}}>
                {/* Button */}
                <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : 'temperature'})} key={1} style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8, 
                    flexDirection : 'row',
                    gap : 5
                }}>
                    <Ionicons
                        name='time'
                        size={22}
                        color={COLORS.lightWhite}
                    />
                    <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                        Log Details
                    </Text>              
                </TouchableOpacity>             
            </View>
          </View>
        </View>
    );
    
    const KelembapanRoute = () => (
        <View style={styles.containerRoute}>
          <Image
            source={{uri : 'https://www.swadayaonline.com/images/view/-IMG_20200508_4339.jpg'}}
            style={styles.image}
          />
       
          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>
                kelembapan
              </Text>
            </View>
            <View style={{ padding : 20, marginTop : 10, marginHorizontal : 10 }}>
                <Text style={{ fontFamily : 'semibold', fontSize : 18, color : COLORS.greenBamboo, textTransform : 'capitalize' }}>description</Text>                
                <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray, marginTop: 8}}>
                    "Kualitas melon optimal ketika kadar kalium di atas 110, melon cukup baik jika antara 100 hingga 110, namun hindari yang di bawah 100 untuk hasil terbaik. Pilih melon, nikmati kesegaran yang tak terlupakan!"
                </Text>
                <View style={{ flexDirection : 'row', marginVertical : 5 }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>Kadar </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenGossip }}>: </Text>
                    </View>
                    <View style={{ width: '34%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenJungle }}>{lembap}</Text>
                    </View>
                </View> 
            </View>
            <View style={{ padding : 20, marginBottom : 6, marginHorizontal : 10, top : -40 }}>
                {lembap < 100 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.red, fontStyle : 'italic', fontWeight : '600'}}>
                        "Sayangnya, melon dengan kadar kalium di bawah 100 tidak memberikan kualitas terbaik. Pilih melon dengan nilai yang lebih tinggi untuk menikmati rasa dan manfaat terbaiknya!"
                    </Text>
                )}

                {(lembap >= 100 && lembap <= 110) && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.black, fontStyle : 'italic', fontWeight : '600'}}>
                        Melon ini memiliki kadar kalium yang cukup baik. Nikmati rasa yang lezat dan manfaat kesehatannya!
                    </Text>
                )}

                {lembap > 110 && (                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.greenBamboo, fontStyle : 'italic', fontWeight : '600'}}>
                        Wow! Tanaman melon ini memiliki kadar kalium yang tinggi, memberikan hasil terbaik. Selamat menikmati melon berkualitas tinggi!
                    </Text>
                )}
            </View>

            <View style={{justifyContent : 'center', alignItems : 'center', marginVertical : SIZES.xSmall, top : -42}}>
                {/* Button */}
                <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : 'kelembapan'})} key={1} style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8, 
                    flexDirection : 'row',
                    gap : 5
                }}>
                    <Ionicons
                        name='time'
                        size={22}
                        color={COLORS.lightWhite}
                    />
                    <Text style={{ color: COLORS.white, fontFamily: 'bold', fontSize: 16 }}>
                        Log Details
                    </Text>              
                </TouchableOpacity>             
            </View>
          </View>
        </View>
    );
    
    const renderScene = SceneMap({
        konduktivitas : KonduktivitasRoute,
        temperature: TemperatureRoute,
        kelembapan: KelembapanRoute,
    });

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'konduktivitas', title: 'Conduct' },
        { key: 'temperature', title: 'Temp' },
        { key: 'kelembapan', title: 'Humidity' }
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: COLORS.lightWhite }}
            style={{ backgroundColor: COLORS.greenBamboo }}
        />
    );

  return (

    <View style={styles.container}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    </View>
  )
}

export default TanahScreens

const styles = StyleSheet.create({
    // nitro route
    containerRoute : {
        flex : 1,
        backgroundColor : COLORS.offwhite
    },
    image : {
        aspectRatio : 1.8,
        resizeMode : 'cover'
    },
    details: {
        marginTop: Platform.OS === 'android' ? -SIZES.medium * 1.7 : -SIZES.xxLarge * 1.8,
        backgroundColor: COLORS.offwhite,
        borderTopLeftRadius: SIZES.xLarge,
        borderTopRightRadius: SIZES.xLarge
    },
    titleRow : {
        marginHorizontal : 20,
        alignItems : 'center',
        top : 18
    },
    title : {
        fontFamily : 'bold',
        fontSize : SIZES.large + 7,
        textTransform : 'uppercase'
    },
    menuWrapper : {
        marginTop : SIZES.large,
        width : SIZES.width,
        backgroundColor : COLORS.lightWhite,
        borderRadius : 12
    },
    // end nitro route
    container : {
        flex : 1,
    },
    imageBg : (lebar, tinggi) => ({
        width : lebar,
        height : tinggi,
        top : -15,
        justifyContent : 'center',
        alignItems : 'center',
        resizeMode : 'cover'
    }),
    boxTop : (lebar, top) => ({
        width : lebar,
        height : '54%',
        justifyContent : 'center',
        alignItems : 'center',
        top : top,
    }),
    boxTopImg : (lebar, tinggi, left, marginBottom) => ({
        width : lebar,
        height : tinggi,
        marginBottom : marginBottom,
        left : left
    }),
    boxTopTxt : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        fontSize : size,
        marginBottom : SIZES.medium,
        color : color
    }),
    lineImg : (lebar, tinggi) => ({
        width : lebar - 13,
        height : tinggi
    }),
    boxBot : (lebar) =>  ({
        width : lebar,
        height : '38%',
        padding : SIZES.large,
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        top : SIZES.large + 33,
    }),
    btnMonitor : {
        flexDirection : 'column',
        alignItems : 'center',
        marginHorizontal : SIZES.large
    },
    txtMonitor : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        textTransform : 'capitalize',
        fontSize : size,
        marginBottom : SIZES.small - 7,
        color : color
    }),
    imgIcon : {
        width : 93,
        height : 74,
        marginVertical : SIZES.medium - 9
    },
    txtValues : (fontFamily, size, color) => ({
        fontFamily : fontFamily,
        textTransform : 'capitalize',
        fontSize : size,
        marginTop : SIZES.small - 7,
        color : color
    })

})