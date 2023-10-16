import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

function SupplierView() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'your-backend-api-endpoint' with the actual URL of your backend API.
    axios.get('http://localhost:8080/order/getAllOrders') // Fetch orders from your backend API
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  if (error) {
    return <div style={errorStyle}>Error: {error.message}</div>;
  } else {
    // Filter orders with status "approved"
    const approvedOrders = orders.filter(order => order.status === "Approved");

    return (
      <div style={supplierViewStyle}>
        <h1 style={titleStyle}>Supplier View - Approved Orders</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>Name</th>
              <th style={headerStyle}>Total</th>
              <th style={headerStyle}>Status</th>
              <th style={headerStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map(order => (
              <tr key={order._id}>
                <td style={cellStyle}>{order.name}</td>
                <td style={cellStyle}>${order.total}</td>
                <td style={cellStyle}>{order.status}</td>
                <td>
                  <Link to={`/confirm-invoice/${order._id}`} style={buttonStyle}>Confirm Invoice</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SupplierView;

// Inline CSS styles
const supplierViewStyle = {
  textAlign: 'center',
  backgroundColor: '#339CFF', // Background color
  padding: '20px',
};

const titleStyle = {
  color: '#4933FF', // Title color
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff', // Table background color
};

const headerStyle = {
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#4933FF', // Header background color
  color: '#fff', // Header text color
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc', // Border color between rows
};

const buttonStyle = {
  backgroundColor: '#4933FF', // Button background color
  color: '#fff', // Button text color
  padding: '5px 10px',
  border: 'none',
  textDecoration: 'none',
};

const errorStyle = {
  color: 'red', // Error text color
};
