import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'
import Ionicons from '@expo/vector-icons/Ionicons'

const PhScreen = ({navigation}) => {

    const route = useRoute()
    const { ph } = route.params
    console.log( ph )
    
    return (
        <View style={styles.container}>
            <View style={styles.containerRoute}>
            <Image
                source={{uri : 'https://pangannews.id/_blog_images/pusat_68159558-0fd4-4c77-bafa-bf038ecf5501_news.jpeg'}}
                style={styles.image}
            />
        
            <View style={styles.details}>
                <View style={styles.titleRow}>
                <Text style={styles.title}>
                    ph air
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
                            <Text style={{ fontFamily : 'semibold', fontSize : 16, color : COLORS.greenJungle }}>{ph}</Text>
                        </View>
                    </View> 
                </View>
                <View style={{ padding : 20, marginBottom : 6, marginHorizontal : 10, top : -40 }}>
                    {ph < 100 && (                    
                        <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.red, fontStyle : 'italic', fontWeight : '600'}}>
                            "Sayangnya, melon dengan kadar nitrogen di bawah 100 tidak memberikan kualitas terbaik. Pilih melon dengan nilai yang lebih tinggi untuk menikmati rasa dan manfaat terbaiknya!"
                        </Text>
                    )}

                    {(ph >= 100 && ph <= 110) && (                    
                        <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.black, fontStyle : 'italic', fontWeight : '600'}}>
                            Melon ini memiliki kadar nitrogen yang cukup baik. Nikmati rasa yang lezat dan manfaat kesehatannya!
                        </Text>
                    )}

                    {ph > 110 && (                    
                        <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.greenBamboo, fontStyle : 'italic', fontWeight : '600'}}>
                            Wow! Tanaman melon ini memiliki kadar nitrogen yang tinggi, memberikan hasil terbaik. Selamat menikmati melon berkualitas tinggi!
                        </Text>
                    )}
                </View>

                <View style={{justifyContent : 'center', alignItems : 'center', marginVertical : SIZES.xSmall, top : -42}}>
                    {/* Button */}
                    <TouchableOpacity onPress={() => navigation.navigate('History Screen', {title : 'PH'})} key={1} style={{
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
        </View>
  )
}

export default PhScreen

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
    details : {
        marginTop : -SIZES.medium,
        backgroundColor : COLORS.offwhite,
        borderTopLeftRadius : SIZES.xLarge,
        borderTopRightRadius : SIZES.xLarge
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