import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="supplier-view">
        <h1>Supplier View</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SupplierView;
