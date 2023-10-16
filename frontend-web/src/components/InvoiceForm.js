import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function InvoiceForm() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [newTotal, setNewTotal] = useState('');

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const orderResponse = await axios.get(`http://localhost:8080/order/getOneOrder/${orderId}`);
        setOrderDetails(orderResponse.data);
      } catch (error) {
        console.error("Error fetching order details: " + error);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  const handleSubmit = () => {
    // Send a request to update the order with the new total
    axios
      .put(`http://localhost:8080/order/updateOrder/${orderId}`, {total: newTotal })
      .then(async (response) => {
        alert('Order updated successfully');
        // Create a new invoice record
        const newInvoice = {
          ordername: orderDetails.name,
          ordertotal: newTotal,
          orderstatus: orderDetails.status,
          actualprice: orderDetails.total,
        };
        await axios.post(`http://localhost:8080/invoice/createInvoice`, newInvoice);
        alert('New invoice created successfully');
        // You can handle success here, e.g., navigate back to the previous page
      })
      .catch((error) => {
        console.error('Error updating order: ' + error);
        alert('Error updating order: ' + error.message);
      });
  };

  return (
    <div>
      <h1>Invoice Form</h1>
      <p>Order Name: {orderDetails.name}</p>
      <p>Total Cost: ${orderDetails.total}</p>
      <p>Status: {orderDetails.status}</p>
      <form onSubmit={handleSubmit}>
        <label>New Total: </label>
        <input
          type="number"
          value={newTotal}
          onChange={(e) => setNewTotal(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
