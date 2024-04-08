import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const MenuComponents = () => {
  const navigation = useNavigation();
  
  const menu = [
    { id : 1, title : 'Tanaman', uri :require('../assets/images/menu/tanaman.png') },
    { id: 2, title: 'Benih', uri :require('../assets/images/menu/benih.png') },
    { id: 3, title: 'Alat', uri :require('../assets/images/menu/alat.png') },
    { id: 4, title: 'Pupuk', uri :require('../assets/images/menu/pupuk.png') },
  ]

  const [ options, setOptions ] = useState(menu)

  const showAlert = () => {
    Alert.alert('tes')
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={options}
      horizontal={false}
      numColumns={2}
      keyExtractor={item => {
        return item.id
      }}
      renderItem={({ item }) => {
        return(
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('List Screen', {data : item})
            }}
          >
            <View style={styles.cardFooter}></View>
            <Image style={styles.cardImage} source={item.uri} />
            <View style={styles.cardHeader}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default MenuComponents

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    // shadowColor: '#00000021',
    borderRadius : 10,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: 'white',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#696969',
  },
})