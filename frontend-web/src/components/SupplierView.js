import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SupplierView() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch orders from your backend API
    axios.get('http://localhost:8080/order/getAllOrders') // Replace with your actual endpoint
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => {
        setError(err);
      });

    // Fetch order items from your backend API
    axios.get('http://localhost:8080/orderItems/getAllOrders') // Replace with your actual endpoint
      .then(response => {
        setOrderItems(response.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="supplier-view">
        <h1>Supplier View</h1>
        <div className="order-list">
          <h2>Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <h3>{order.name}</h3>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-items-list">
          <h2>Order Items</h2>
          <ul>
            {orderItems.map(orderItem => (
              <li key={orderItem._id}>
                <h3>Order Item {orderItem._id}</h3>
                <p>Qty: {orderItem.qty}</p>
                <p>Avg Unit Price: ${orderItem.avgunitprice}</p>
                <p>Item Total: ${orderItem.itemtotal}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SupplierView;
