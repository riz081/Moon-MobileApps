import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { COLORS, SIZES } from '../constants'

const MonitorScreens = ({ navigation }) => {
    const route = useRoute()
    const {image, name} = {"id": 1, "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/1280px-Muskmelon.jpg", "name": "Cucumis Melo", "species": "Tropical Tree Species"} //route.params.data
    console.log(route.params.data)

    const [Ph, setPh] = useState()
    const [Sm, setSm] = useState()
    const [St, setSt] = useState()
    const [Sc, setSc] = useState()
    const [Ng, setNg] = useState()
    const [Ff, setFf] = useState()
    const [Pt, setPt] = useState()
    const [loading, setLoading] = useState(true)  

    // PH
    const fetchData_PH = async () => {
        const res_ph = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/pH2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_ph){
        return res_ph.json()
        })
        const data_ph = res_ph['m2m:list'][0]['m2m:cin']['con'];
        const Ph = data_ph.length === 6 ?
                Number(data_ph.substring(1, 5)) :
                data_ph.length === 5 ?
                Number(data_ph.substring(1, 4)) :
                data_ph.length === 4 ?
                Number(data_ph.substring(1, 3)) :
                Number(data_ph.substring(1, 2)) 
        // const lengthPh = data_ph.length
        // console.log('data Ph : ',Ph)
        setPh(Ph)
        setLoading(false)
    }

    // Soil Moisture(Kelembapan Tanah)
    const fetchData_SM = async () => {
        const res_sm = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Moisture2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_sm){
        return res_sm.json()
        })
        const data_sm = res_sm['m2m:list'][0]['m2m:cin']['con'];
        const Sm =  data_sm.length === 6 ?
                    Number(data_sm.substring(1, 5)) :
                    data_sm.length === 5 ?
                    Number(data_sm.substring(1, 4)) :
                    data_sm.length === 4 ?
                    Number(data_sm.substring(1, 3)) :
                    Number(data_sm.substring(1, 2)) 
        // console.log('data Sm : ',Sm)
        setSm(Sm)
        setLoading(false)
    }

    // Soil Twmperature(Temperatur Tanah)
    const fetchData_ST = async () => {
        const res_st = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Temperature2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_st){
        return res_st.json()
        })
        const data_st = res_st['m2m:list'][0]['m2m:cin']['con'];
        const St =  data_st.length === 6 ?
                    Number(data_st.substring(1, 5)) :
                    data_st.length === 5 ?
                    Number(data_st.substring(1, 4)) :
                    data_st.length === 4 ?
                    Number(data_st.substring(1, 3)) :
                    Number(data_st.substring(1, 2)) 
        // console.log('data St : ',St)
        setSt(St)
        setLoading(false)
    }

    // Soil Conductivity(Konduktivitas Tanah)
    const fetchData_SC = async () => {
        const res_sc = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Conductivity2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_sc){
        return res_sc.json()
        })
        const data_sc = res_sc['m2m:list'][0]['m2m:cin']['con'];
        const Sc =  data_sc.length === 6 ?
                    Number(data_sc.substring(1, 5)) :
                    data_sc.length === 5 ?
                    Number(data_sc.substring(1, 4)) :
                    data_sc.length === 4 ?
                    Number(data_sc.substring(1, 3)) :
                    Number(data_sc.substring(1, 2)) 
        // console.log('data Sc : ',Sc)
        setSc(Sc)
        setLoading(false)
    }

    // Nitrogen(Nitrogen)
    const fetchData_NG = async () => {
        const res_ng = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Nitrogen2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_ng){
        return res_ng.json()
        })
        const data_ng = res_ng['m2m:list'][0]['m2m:cin']['con'];
        const Ng =  data_ng.length === 6 ?
                    Number(data_ng.substring(1, 5)) :
                    data_ng.length === 5 ?
                    Number(data_ng.substring(1, 4)) :
                    data_ng.length === 4 ?
                    Number(data_ng.substring(1, 3)) :
                    Number(data_ng.substring(1, 2)) 
        // console.log('data Ng : ',Ng)
        setNg(Ng)
        setLoading(false)
    }

    // Fosfor(Fosfor)
    const fetchData_FF = async () => {
        const res_ff = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Phosporus2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_ff){
        return res_ff.json()
        })
        const data_ff = res_ff['m2m:list'][0]['m2m:cin']['con'];
        const Ff =  data_ff.length === 6 ?
                    Number(data_ff.substring(1, 5)) :
                    data_ff.length === 5 ?
                    Number(data_ff.substring(1, 4)) :
                    data_ff.length === 4 ?
                    Number(data_ff.substring(1, 3)) :
                    Number(data_ff.substring(1, 2)) 
        // console.log('data Ff : ',Ff)
        setFf(Ff)
        setLoading(false)
    }

    // Potassium(Potassium)
    const fetchData_PT = async () => {
        const res_pt = await fetch('https://platform.antares.id:8443/~/antares-cse/antares-id/RooftopITTS2/Potassium2?fu=1&drt=2&ty=4',{
        method : 'get',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-M2M-Origin' : 'dfadb386eb62b10a:99882941cb61d872'
        }
        })
        .then(function(res_pt){
        return res_pt.json()
        })
        const data_pt = res_pt['m2m:list'][0]['m2m:cin']['con'];
        const Pt =  data_pt.length === 6 ?
                    Number(data_pt.substring(1, 5)) :
                    data_pt.length === 5 ?
                    Number(data_pt.substring(1, 4)) :
                    data_pt.length === 4 ?
                    Number(data_pt.substring(1, 3)) :
                    Number(data_pt.substring(1, 2)) 
        // console.log('data Pt : ',Pt)
        setPt(Pt)
        setLoading(false)
    }

    const menuMonitor = [
        { id : 1, title : 'NPK', uri : require('../assets/images/monitor/npk.png'), value : <Text>{Ng}, {Ff}, {Pt}</Text>},
        { id: 2, title: 'Tanah', uri : require('../assets/images/monitor/tanah.png'), value : <Text>{Sm}, {Sc}, {St}</Text>},
        { id: 3, title: 'PH', uri : require('../assets/images/monitor/ph.png'), value : <Text>{Ph}</Text>}
    ]

    useEffect(() => {
        fetchData_PH();
        fetchData_NG();
        fetchData_FF();
        fetchData_PT();
        fetchData_SC();
        fetchData_SM();
        fetchData_ST();
    }, [])

  return (
    <View style={styles.container}>
      <Image
        source={{uri : image}}
        style={styles.image}
      />
   
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {name}
          </Text>
        </View>
        <View style={styles.menuWrapper}>
            {menuMonitor.map(item => (                
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Explore Screen', {
                    id : item.id,
                    title : item.title,
                    ph : Ph,
                    nitro : Ng,
                    fosfor : Ff,
                    potas : Pt,
                    konduk : Sc,
                    temp : St,
                    lembap : Sm,
                    image : image
                })}>
                    {/* {console.log(item.value)} */}
                    <View style={styles.menuItem(0.8)}>
                        <Image 
                            source={item.uri}
                            style={styles.menuImage}
                        />
                        <View style={{ width : '50%'}}>
                            <Text style={styles.menuText(0, COLORS.gray, '800', 18)}>{item.title}</Text>
                        </View>
                        <View style={{ alignSelf : 'flex-end'}}>                            
                            <Text style={styles.menuText(0, COLORS.red, '200', 14)}>{item.value}</Text>                       
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <TouchableOpacity style={{
                    borderWidth : 1, 
                    borderColor : COLORS.lightWhite, 
                    backgroundColor : COLORS.greenOcean,
                    marginTop : 10,
                    padding : 10
                }} onPress={() => navigation.navigate('Forecasting Screen', {
                    ph : Ph,
                    nitro : Ng,
                    fosfor : Ff,
                    potas : Pt,
                    konduk : Sc,
                    temp : St,
                    lembap : Sm,
                })}>
                    <Text>forecasting</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  )
}

export default MonitorScreens

const styles = StyleSheet.create({
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
    menuItem :  (borderBottomWidth) => ({
        borderBottomWidth : borderBottomWidth,
        paddingVertical : 15,
        paddingHorizontal : 40,
        borderColor : COLORS.gray,
        flexDirection : 'row',
        
    }),
    menuText : (right, color, fontWeight, fontSize) => ({
        fontFamily : 'regular',
        color : color,
        marginHorizontal : 20,
        fontWeight : fontWeight,
        fontSize : fontSize,
        lineHeight : 36,
        right : right, 
        textTransform : 'capitalize'
    }),
    menuImage : {
        width : 38,
        height : 38
    }
})