import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ListTanaman = [
  {
    id: 1,
    name: 'Cucumis Melo',
    species: 'Tropical Tree Species',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Muskmelon.jpg/1280px-Muskmelon.jpg',
  }
];

const ListBenih = [
  {
    id: 1,
    name: 'Checking plants',
    balance: 1000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
];

const ListPupuk = [
  {
    id: 1,
    name: 'Checking plants',
    balance: 1000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 2,
    name: 'Savings plants',
    balance: 5000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
];

const ListAlat = [
  {
    id: 1,
    name: 'Checking plants',
    balance: 1000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 2,
    name: 'Savings plants',
    balance: 5000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 3,
    name: 'Checking plants',
    balance: 1000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 4,
    name: 'Savings plants',
    balance: 5000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 5,
    name: 'Pending Payments plants',
    balance: 3000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
  },
];

const ListsScreens = ({ navigation }) => {
    const route = useRoute()
    const {id, title} = route.params.data
    // console.log(id)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      { title === 'Tanaman' ?
        ListTanaman.map(item => (
          <TouchableOpacity key={item.id} style={styles.plants} onPress={() => navigation.navigate('Monitor Screen', {data : item})}>
            <Image source={{ uri: item.image }} style={styles.plantsImage} />
            <View style={styles.plantsContent}>
              <Text style={styles.plantsName}>{item.name}</Text>
              <Text style={styles.plantsBalance}>{item.species}</Text>
            </View>
          </TouchableOpacity>
        )) : 
        title === 'Benih' ?
        ListBenih.map(plants => (
          <TouchableOpacity key={plants.id} style={styles.plants}>
            <Image source={{ uri: plants.image }} style={styles.plantsImage} />
            <View style={styles.plantsContent}>
              <Text style={styles.plantsName}>{plants.name}</Text>
              <Text style={styles.plantsBalance}>${plants.balance}</Text>
            </View>
          </TouchableOpacity>
        )) : 
        title === 'Pupuk' ?
        ListPupuk.map(plants => (
          <TouchableOpacity key={plants.id} style={styles.plants}>
            <Image source={{ uri: plants.image }} style={styles.plantsImage} />
            <View style={styles.plantsContent}>
              <Text style={styles.plantsName}>{plants.name}</Text>
              <Text style={styles.plantsBalance}>${plants.balance}</Text>
            </View>
          </TouchableOpacity>
        )) : 
        ListAlat.map(plants => (
          <TouchableOpacity key={plants.id} style={styles.plants}>
            <Image source={{ uri: plants.image }} style={styles.plantsImage} />
            <View style={styles.plantsContent}>
              <Text style={styles.plantsName}>{plants.name}</Text>
              <Text style={styles.plantsBalance}>${plants.balance}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default ListsScreens

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plants: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  plantsImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  plantsContent: {
    justifyContent: 'center',
  },
  plantsName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  plantsBalance: {
    fontSize: 16,
    color: '#999',
  },
});