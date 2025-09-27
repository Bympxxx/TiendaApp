import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { products } from '../data/products';

export default function HomeScreen({ navigation, carrito, setCarrito }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(loadingTimer);
  }, []);

  const handleLongPress = (item) => {
    Alert.alert('Producto', `Nombre: ${item.nombre}\nPrecio: $${item.precio}`);
  };

  const agregarAlCarrito = (item) => {
  const yaEnCarrito = carrito.some(producto => producto.id === item.id);

  if (yaEnCarrito) {
    Alert.alert('Ya agregado', `${item.nombre} ya está en tu carrito`);
    return;
  }

  setCarrito([...carrito, item]);
  Alert.alert('Agregado', `${item.nombre} ha sido agregado a tu carrito`);
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d6efd" style={styles.spinner} />
        <Text style={styles.loadingText}>Cargando productos</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.carritoButton}
          onPress={() => navigation.navigate('Carrito')}
        >
          <Text style={styles.carritoText}>🛒 Carrito ({carrito.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pedidosButton}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.pedidosText}>📦 Ver Pedidos</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalles', { producto: item })}
            onLongPress={() => handleLongPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.card}>
              <Image
                source={{ uri: item.imagen }}
                style={styles.image}
                onError={() => console.log('Error loading image')}
              />
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.price}>${item.precio}</Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => agregarAlCarrito(item)}
              >
                <Text style={styles.addButtonText}>🛒 Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  spinner: {
    marginBottom: 20,
    transform: [{ scale: 2.0 }],
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  carritoButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  pedidosButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  carritoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pedidosText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ff6a00e9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#12223aff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});