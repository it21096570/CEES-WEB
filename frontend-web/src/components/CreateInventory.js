import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateInventory() {
  const navigate = useNavigate();

  const [inventoryData, setInventoryData] = useState({
    inventoryName: '',
    quantity: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({
      ...inventoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = {};

    if (!inventoryData.inventoryName.trim()) {
      validationErrors.inventoryName = 'Inventory Name is required';
    }
    if (!inventoryData.quantity.trim()) {
      validationErrors.quantity = 'Quantity is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send a POST request to your server to add the course
      await axios.post('http://localhost:8080/inventory/createInventory', inventoryData);
      // Redirect to a different page or display a success message
      alert('Inventory items added successfully!');
      // Optionally reset the form
      setInventoryData({
        inventoryName: '',
        quantity: '',
      });
      navigate('');
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error adding inventory:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Add Inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="inventoryName" className="block text-blue-500">
              Item Name:
            </label>
            <input
              type="text"
              id="inventoryName"
              name="inventoryName"
              value={inventoryData.inventoryName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md border-blue-300 focus:outline-none focus:border-blue-500 ${
                errors.inventoryName ? 'border-red-500' : ''
              }`}
            />
            {errors.inventoryName && (
              <p className="text-red-500 text-xs mt-1">{errors.inventoryName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-blue-500">
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={inventoryData.quantity}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md border-blue-300 focus:outline-none focus:border-blue-500 ${
                errors.quantity ? 'border-red-500' : ''
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInventory;
