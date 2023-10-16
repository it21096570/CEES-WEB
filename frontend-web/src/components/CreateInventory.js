import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function CreateInventory() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [avgunitprice, setavgunitprice] = useState('');
  const [nameError, setNameError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [avgunitpriceError, setavgunitpriceError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  
  const handleavgunitpriceChange = (e) => {
    setavgunitprice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let isValid = true;
    if (name.trim() === '') {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (quantity.trim() === '') {
      setQuantityError('Quantity is required.');
      isValid = false;
    } else {
      setQuantityError('');
    }

    if (avgunitprice.trim() === '') {
        setavgunitpriceError('Average unit price is required.');
        isValid = false;
    } else {
        setavgunitpriceError('');
    }

    if (!isValid) {
      return; // Do not submit the form if there are validation errors.
    }

    try {
      const response = await axios.post('http://localhost:8080/inventory/createInventory', {
        name,
        quantity,
        avgunitprice,
      });

      console.log('Inventory Item created:', response.data);

      // Clear the form fields after successful submission
      setName('');
      setQuantity('');
      setavgunitprice('');

      alert('Inventory created successfully');
      navigate(`/InventoryDetailsDisplay`); // Redirect to the desired page after submission
    } catch (error) {
      console.error('Error creating inventory:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-semibold text-themeBlue mb-4">Create New Inventory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-themeBlue text-lg font-semibold mb-2">
              Item Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                nameError ? 'border-red-500' : ''
              }`}
            />
            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-themeBlue text-lg font-semibold mb-2">
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                quantityError ? 'border-red-500' : ''
              }`}
            />
            {quantityError && <p className="text-red-500 mt-2">{quantityError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="avgunitprice" className="block text-themeBlue text-lg font-semibold mb-2">
              Average Unit Price:
            </label>
            <input
              type="text"
              id="avgunitprice"
              value={avgunitprice}
              onChange={handleavgunitpriceChange}
              className={`form-input w-full p-2 border border-themeLightGray rounded-md ${
                avgunitpriceError ? 'border-red-500' : ''
              }`}
            />
            {avgunitpriceError && <p className="text-red-500 mt-2">{avgunitpriceError}</p>}
          </div>
          <button
            type="submit"
            className="btn create-post-btn bg-themePurple hover-bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300"
          >
            Create Inventory
          </button>
        </form>
      </div>
    </div>
  );
}
