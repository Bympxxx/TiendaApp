import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import CarritoScreen from './screens/CarritoScreen';
import PedidosScreen from './screens/PedidosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#0d6efd' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" options={{ title: 'Importadora Andy' }}>
        {props => (
          <HomeScreen
            {...props}
            carrito={carrito}
            setCarrito={setCarrito}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Detalles" options={{ title: 'Detalles del Producto' }}>
        {props => (
          <DetailScreen
            {...props}
            carrito={carrito}
            setCarrito={setCarrito}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Carrito" options={{ title: 'Carrito' }}>
        {props => (
          <CarritoScreen
            {...props}
            carrito={carrito}
            setCarrito={setCarrito}
            pedidos={pedidos}
            setPedidos={setPedidos}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Pedidos" options={{ title: 'Mis Pedidos' }}>
        {props => (
          <PedidosScreen
            {...props}
            pedidos={pedidos}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}