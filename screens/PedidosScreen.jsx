import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function PedidosScreen({ pedidos }) {


  const generateUniqueKey = (item, index) => {
    return `${item.id || 'no-id'}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Mis Pedidos</Text>

      {(!pedidos || pedidos.length === 0) ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes pedidos aún</Text>
          <Text style={styles.emptySubText}>Realiza tu primera compra en la tienda</Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item, index) => generateUniqueKey(item, index)}
          renderItem={({ item, index }) => (
            <View style={styles.pedidoCard}>
              <Text style={styles.pedidoName}>{item.nombre}</Text>
              <Text style={styles.pedidoPrice}>${item.precio}</Text>
              <Text style={styles.pedidoIndex}>Pedido #{index + 1}</Text>
            </View>
          )}
          ListHeaderComponent={
            <Text style={styles.totalText}>
              Total de pedidos: {pedidos.length}
            </Text>
          }
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d6efd'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 10
  },
  emptySubText: {
    fontSize: 14,
    color: '#adb5bd',
    textAlign: 'center'
  },
  pedidoCard: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  pedidoName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  pedidoPrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 5
  },
  pedidoIndex: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic'
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
    textAlign: 'center'
  }
});