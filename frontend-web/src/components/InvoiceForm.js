import React, { useState, useEffect } from 'react';

export default function InvoiceForm({ orderDetails, onSubmit }) {
  const [newTotal, setNewTotal] = useState('');

  useEffect(() => {
    // Display an alert to show order details when the component is mounted
    alert(`Order Name: ${orderDetails.name}\nTotal Cost: $${orderDetails.total}`);
  }, [orderDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTotal);
  };

  return (
    <div>
      <h1>Invoice Form</h1>
      <p>Order Name: {orderDetails.name}</p>
      <p>Total Cost: ${orderDetails.total}</p>
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
