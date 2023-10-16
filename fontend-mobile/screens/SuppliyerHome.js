import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

function SuppliyerHome() {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace 'your-backend-api-endpoint' with the actual URL of your backend API.
        axios.get('http://192.168.43.93:8080/order/getAllOrders') // Fetch orders from your backend API
            .then(response => {
                setOrders(response.data);
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    const navigateToInvoiceCreate = (orderId) => {
        // Use navigation.navigate to go to the "Invoice Create" screen and pass the order ID as a parameter
        navigation.navigate('InvoiceCreatePage', { orderId });
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    } else {
        // Filter orders with status "approved"
        const approvedOrders = orders.filter(order => order.status === 'Approved');

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Supplier View - Approved Orders</Text>
                <FlatList
                    data={approvedOrders}
                    keyExtractor={(order) => order._id}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>${item.total}</Text>
                            <Text style={styles.cell}>{item.status}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={navigateToInvoiceCreate(item._id)}

                            >
                                <Text style={styles.buttonText}>Confirm Invoice</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#339CFF',
        padding: 20,
        top: 100
    },
    title: {
        color: '#4933FF',
        fontSize: 24,
        textAlign: 'center',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
    },
    button: {
        backgroundColor: '#4933FF',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
    },
});

export default SuppliyerHome;