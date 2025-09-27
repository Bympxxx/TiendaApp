import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function CarritoScreen({ carrito, setCarrito, pedidos, setPedidos, navigation }) {

  const confirmarPedido = () => {
    if (!carrito || carrito.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos al carrito primero');
      return;
    }


    const pedidosActuales = Array.isArray(pedidos) ? pedidos : [];
    const carritoActual = Array.isArray(carrito) ? carrito : [];

    setPedidos([...pedidosActuales, ...carritoActual]);
    setCarrito([]);
    Alert.alert('✅ Pedido Confirmado', 'Tu pedido ha sido procesado correctamente');
    navigation.navigate('Pedidos');

    navigation.reset({
      index: 0,
      routes: [
        { name: 'Home' },
        { name: 'Pedidos' }
      ],
    });
  };

  const eliminarProducto = (index) => {
    if (!carrito) return;

    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const total = carrito?.reduce((sum, producto) => sum + (producto.precio || 0), 0) || 0;

  const iva = total * 0.15;
  const totalConIva = total + iva;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.confirmButton, (!carrito || carrito.length === 0) && styles.disabledButton]}
        onPress={confirmarPedido}
        disabled={!carrito || carrito.length === 0}
      >
        
        <Text style={styles.confirmButtonText}>✅ Confirmar Pedido</Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>Subtotal: ${total.toFixed(2)}</Text>

      <Text style={styles.totalText}>Total + IVA: ${totalConIva.toFixed(2)}</Text>

      <Text style={styles.itemsText}>Productos en carrito: {carrito?.length || 0}</Text>

      {!carrito || carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Tu carrito está vacío</Text>
          <Text style={styles.emptySubText}>Agrega productos desde la tienda</Text>
        </View>
      ) : (
        <FlatList
          data={carrito}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.productCard}>
              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productPrice}>${item.precio}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarProducto(index)}
              >
                <Text style={styles.deleteText}>🗑️ Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  disabledButton: {
    backgroundColor: '#6c757d',
    opacity: 0.6
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#198754',
    marginBottom: 5,
    textAlign: 'center'
  },
  itemsText: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 15,
    textAlign: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 10
  },
  emptySubText: {
    fontSize: 16,
    color: '#adb5bd',
    textAlign: 'center'
  },
  listContent: {
    paddingBottom: 20
  },
  productCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 2
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#198754',
    flex: 1,
    textAlign: 'right',
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
});