import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Office Wear', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'Reversible Angora Cardigan ', price: 120, image: require('../assets/dress4.png') },
  { id: '5', name: '21WN', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress6.png') },
  { id: '7', name: '21VN', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress7.png') },
  { id: '8', name: 'Lame ', description: 'Reversible Angora Cardigan', price: 120, image: require('../assets/dress8.png') }
];

export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product]; 
    setCart(newCart); 
    await AsyncStorage.setItem('cart', JSON.stringify(newCart)); 
  };

  const renderProductItem = ({ item, index }) => {
    if (index >= products.length) {
      return null;
    }
    if (index % 2 === 0) {
      return (
        <View style={styles.row}>
          <View style={[styles.productCard, styles.leftProductCard]}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addToCartButton}>
              <Image source={require('../assets/add_circle.png')} style={styles.addToCartIcon} />
            </TouchableOpacity>
          </View>
          {products[index + 1] && (
            <View style={styles.productCard}>
              <Image source={products[index + 1].image} style={styles.productImage} />
              <Text style={styles.productName}>{products[index + 1].name}</Text>
              <Text style={styles.productDescription}>{products[index + 1].description}</Text>
              <Text style={styles.productPrice}>${products[index + 1].price}</Text>
              <TouchableOpacity onPress={() => addToCart(products[index + 1])} style={styles.addToCartButton}>
                <Image source={require('../assets/add_circle.png')} style={styles.addToCartIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
    return null;
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>

        <TouchableOpacity>
            <Image style={styles.menuIcon} source={require('../assets/Menu.png')} />
        </TouchableOpacity>

        <TouchableOpacity>
                <Image style={styles.logoText} source={require('../assets/Logo.png')} />    
        </TouchableOpacity>

        <View style={{display:'flex',flexDirection:'row',gap:10}}>
            <TouchableOpacity>
                <Image style={styles.searchIcon} source={require('../assets/Search.png')} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('Cart')}>
                <Image style={styles.shoppingBagIcon} source={require('../assets/shoppingBag.png')} />
            </TouchableOpacity>   
        </View>
        
      </View>
      <View style={styles.sectionTwo}>
        <Text style={styles.sectionTwoText}>O U R  S T O R Y</Text>
        <View style={{display:'flex',flexDirection:'row',gap:12}}>
            <View style={styles.listContainer}>
            <Ionicons style={styles.listIcon} name="list" size={25} color="black" />
            </View>
            <View style={styles.filterContainer}>
            <Ionicons style={styles.filterIcon} name="filter" size={25} color="#FA908A" />
            </View>
        </View>

      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 10,
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  navBar: {
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 100,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logoText: {
    width: 100,
    height: 90,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  shoppingBagIcon: {
    width: 24,
    height: 24,
  },
  sectionTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTwoText: {
    fontSize: 24,
    fontWeight: '400',
  },
  listContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#F7F7F7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#F7F7F7',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    flex: 1,
    margin: 8,
    alignItems: 'flex-start',
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#F56262',
  },
  addToCartButton: {
  right:-120,
  top:-120,
  
  },
 
});
