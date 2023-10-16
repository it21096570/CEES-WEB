import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvoiceForm() {
    const [order, setOrder] = useState({});
    const [newCost, setNewCost] = useState('');
    const [ordername, setOrderName] = useState('');
    const [totalnew, setTotalNew] = useState('');

    // Simulate navigation and route params, or use React Router or another routing library
    const orderId = 'orderId'; // Replace with your actual orderId

    useEffect(() => {
        // Fetch order details using the orderId
        axios.get(`http://localhost:8080/order/getOneOrders//${orderId}`)
            .then(response => {
                setOrder(response.data);
                setOrderName(response.data.name);
            })
            .catch(err => {
                console.error(err);
            });
    }, [orderId]);

    const createInvoice = () => {
        // Example API request (replace with your actual API endpoint):
        axios.post('http://localhost:8080/supplier/create', {
            ordername,
            totalnew: parseFloat(totalnew),
        })
            .then(response => {
                // Handle success, e.g., navigate or show a success message
                console.log('Invoice created successfully');
            })
            .catch(err => {
                // Handle error, e.g., show an error message to the user
                console.error(err);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Invoice Create</h1>
            <p style={styles.label}>Order ID: {order._id}</p>
            <p style={styles.label}>Order Name: {order.name}</p>
            <p style={styles.label}>Total: ${order.total}</p>
            <p style={styles.label}>Status: {order.status}</p>
            <p style={styles.label}>New Cost:</p>
            <input
                type="text"
                style={styles.input}
                value={newCost}
                onChange={(e) => setTotalNew(e.target.value)}
            />
            <button
                onClick={createInvoice}
                style={styles.button}
            >
                Submit Invoice
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
    },
    label: {
        fontSize: '16px',
        marginTop: '10px',
    },
    input: {
        height: '40px',
        border: '1px solid gray',
        marginTop: '10px',
        padding: '10px',
    },
    button: {
        backgroundColor: '#4933FF',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        marginTop: '10px',
        cursor: 'pointer',
    },
};

export default InvoiceForm;
