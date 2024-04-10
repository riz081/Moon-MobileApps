import { 
    View, 
    Text, 
    Image, 
    StyleSheet,
    SafeAreaView,
    Animated,
    ScrollView
  } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants';

const DetectionDetail = () => {

    const route = useRoute()
    const { data } = route.params
    console.log(data)
    const [fadeAnim] = useState(new Animated.Value(0));

    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

  return (
    <SafeAreaView>
        {data && (
            <ScrollView>
                <Image
                    style={{  
                        width: SIZES.width,
                        height: SIZES.height / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        resizeMode : 'cover'
                    }}
                    source={{ uri: data.images_url }}
                />

                <View style={{justifyContent : 'center', alignItems : 'flex-start', marginVertical : 5, paddingTop: 20, paddingRight: 20, paddingLeft: 20, paddingBottom: 0 }}>            
                    <Text style={{ fontFamily : 'bold', fontSize : 18, color : COLORS.greenBamboo }}>Detail Result:</Text>
                    {/* ID Box */}
                    <View style={{ flexDirection : 'row' }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Plants ID </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{data.id}</Text>
                    </View>
                    </View>
                    {/* Timestamp Box */}
                    <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>Timestamp </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={{ fontFamily: 'semibold', fontSize: 14, color: COLORS.gray }}>{data.timestamp}</Text>
                    </View>
                    </View>
                    {/* Coffidence Box */}
                    <View style={{ flexDirection : 'row' }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Coffidence </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{data.confidence}</Text>
                    </View>
                    </View>
                    {/* Class Box */}
                    <Animated.View style={[
                        styles.containerAnim,
                        { opacity: fadeAnim },
                        data.class === 'Melon Sehat' ? { backgroundColor: COLORS.greenOcean, borderColor: COLORS.greenBamboo } : null
                    ]}>
                        <Text style={[
                            styles.predictText,
                            data.class === 'Melon Sehat' ? { color: COLORS.lightWhite } : null
                        ]}>Data Result</Text>
                        <Text style={[
                            styles.descriptionText,
                            data.class === 'Melon Sehat' ? { color: COLORS.lightWhite } : null
                        ]}>
                            {data.class === 'Melon Sehat'
                                ? `Panen melon terbaru! 🌱✨ Prediksi: "${data.class}" dengan nilai ${data.confidence}%. Rawat dengan kasih, dapatkan panen berkualitas! 🍈🌿`
                                : data.class === 'Melon Sakit'
                                ? `Tanaman melon sakit. 🥀 Prediksi: "${data.class}" dengan keyakinan ${data.confidence}%. Segera konsultasi ahli pertanian untuk solusi terbaik. 🍈🌱 #MelonSakit #PerawatanCerdas`
                                : null}
                        </Text>
                    </Animated.View>

                </View> 
            </ScrollView>
        )}
        
    </SafeAreaView>
  )
}

export default DetectionDetail

const styles = StyleSheet.create({
    containerAnim: {
        padding: 20,
        backgroundColor: '#f8d7da',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9534f',
    },
    predictText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#721c24',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#721c24',
        fontStyle: 'italic',
    },
});
