import React from 'react';

import { View, Text, Image, StyleSheet, Button, Share } from 'react-native';

export default function DetailScreen({ route }) {
    const { producto } = route.params;

    const compartir = () => {
        Share.share({
            message: `Mira este producto: ${producto.nombre} por $${producto.precio}`
        });
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: producto.imagen }} style={styles.image} />
            <Text style={styles.name}>{producto.nombre}</Text>
            <Text style={styles.price}>${producto.precio}</Text>
            <Text style={styles.description}>{producto.descripcion}</Text>

            <Button title="Compartir" onPress={compartir} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    name: {
        fontSize: 22,
        fontWeight: "bold"
    },
    price: {
        fontSize: 18,
        color: "green",
        marginVertical: 5
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20
    }
});
