import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const styles = {
  container: {
    width: "500px",
    margin: "0 auto",
  },
  form: {
    marginTop: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "200px",
  },
  button: {
    marginTop: "10px",
  },
};

export default function InvoiceForm() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [newTotal, setNewTotal] = useState("");

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
      .put(`http://localhost:8080/order/updateOrder/${orderId}`, { total: newTotal })
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

    })
      .catch((error) => {
        console.error('Error updating order: ' + error);
        alert('Error updating order: ' + error.message);
      });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Order Name:</label>
        <input type="text" value={orderDetails.name} style={styles.input} disabled />

        <label style={styles.label}>Total Cost:</label>
        <input
          type="number"
          value={newTotal}
          onChange={(e) => setNewTotal(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Status:</label>
        <input type="text" value={orderDetails.status} style={styles.input} disabled />

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}
