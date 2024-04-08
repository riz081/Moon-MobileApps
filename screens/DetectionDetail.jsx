import { 
    View, 
    Text, 
    Image, 
    StyleSheet,
    SafeAreaView
  } from 'react-native';
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants';

const DetectionDetail = () => {

    const route = useRoute()
    const { data } = route.params
    console.log(data)


  return (
    <SafeAreaView>
        {data && (
            <View>
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
                    <View style={{ flexDirection : 'row' }}>
                    <View style={{ width: '28%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>Class </Text>
                    </View>
                    <View style={{ width: '7%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>: </Text>
                    </View>
                    <View style={{ width: '34%' }}>
                        <Text style={{ fontFamily : 'semibold', fontSize : 14, color : COLORS.black }}>{data.class}</Text>
                    </View>
                    </View>            

                    {/* Custom Text for "Melon Sehat" */}
                    {data.class === "Melon Sehat" && (
                    
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray}}>
                    Panen melon terbaru! 🌱✨ Prediksi: "<Text style={{fontFamily: 'bold'}}>{data.class}</Text>" dengan nilai <Text style={{fontFamily: 'bold'}}>{data.confidence}%</Text>. Rawat dengan kasih, dapatkan panen berkualitas! 🍈🌿
                    </Text>
                    )}
                    {/* Custom Text for "Melon Sakit" */}
                    {data.class === "Melon Sakit" && (
                    <Text style={{fontFamily: 'regular', fontSize: 14, color: COLORS.gray}}>
                        Tanaman melon sakit. 🥀 Prediksi: "<Text style={{fontFamily: 'bold'}}>{data.class}</Text>" dengan keyakinan <Text style={{fontFamily: 'bold'}}>{data.confidence}%</Text>. Segera konsultasi ahli pertanian untuk solusi terbaik. 🍈🌱 #MelonSakit #PerawatanCerdas
                    </Text>
                    )}
                </View> 
            </View>
        )}
        
    </SafeAreaView>
  )
}

export default DetectionDetail

const styles = StyleSheet.create({})