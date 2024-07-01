import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
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

  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.product} >
        <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
      
            <View style={{width:180,gap:10,left:10}}>
            <Text style={{fontSize:20}}>{item.name}</Text>
            <Text style={{fontSize:15}}>{item.description}</Text>
            <Text style={{color:'orange'}}>${item.price}</Text>
            </View>

      </View>
      <TouchableOpacity style={{top:80}} onPress={() => removeFromCart(item.id)}>
      <Image source={require('../assets/remove_circle.png')}  />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
            <View>

            </View>
            <TouchableOpacity>
                    <Image style={styles.logoText} source={require('../assets/Logo.png')}/>    
            </TouchableOpacity>

            
            <TouchableOpacity>
                <Image style={styles.searchIcon} source={require('../assets/Search.png')} />
            </TouchableOpacity>  
    
        </View>
        <TouchableOpacity>
            <Image style={styles.logocheck} source={require('../assets/checkout.png')}/>    
        </TouchableOpacity>
        <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderCartItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
  },
  logoText: {
    width: 100,
    height: 90,
  },
  logocheck: {
    width: [40],
    alignItems: 'center',
    justifyContent: 'center',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
  },
  productImage: {
    width: 120,
    height: 200,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  
 
});
