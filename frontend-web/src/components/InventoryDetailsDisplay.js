import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function InventoryDetailsDisplay() {
  const navigate = useNavigate();
 
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  const updateInventory = (inventoryId) => {
    navigate(`/UpdateInventory/${inventoryId}`);
  };

  const deleteInventory = (inventoryId) => {
    // Implement the logic to delete the inventory item with the given ID
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/inventory/getAllInventory')
      .then((response) => {
        setInventory(response.data);
        setFilteredInventory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = inventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);

  return (
    <div className="bg-themeLightGray py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-3xl font-semibold text-themeBlue mt-5 mb-4">Inventory</h2>
          <div>
            <button
              className="btn create-post-btn bg-themePurple hover-bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300 mr-2"
              onClick={() => navigate("/create-inventory")}
            >
              New +
            </button>
            <button
              className="btn create-post-btn bg-themePurple hover-bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300 mr-2"
              onClick={() => {
                // Add your print functionality here
              }}
            >
              Print
            </button>
            <button
              className="btn create-post-btn bg-themePurple hover-bg-themeBlue text-white py-2 px-4 rounded-md transition duration-300"
              onClick={() => {
                // Add your order functionality here
              }}
            >
              Add Order
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Inventory"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-themeLightGray rounded-md p-2 w-full"
          />
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Product Name</th>
              <th className="text-left">Available Quantity</th>
              <th className="text-left">Average Unit Price</th>
              <th className="text-left">Order Level</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.avgunitprice}</td>
                <td>
                  <span
                    className={
                      item.quantity < 10
                        ? "text-red-500"
                        : item.quantity < 20
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {item.quantity < 10
                      ? "Preorder level"
                      : item.quantity < 20
                      ? "Low"
                      : "Normal"}
                  </span>
                </td>
                
                <td>
                  {/* You can add action buttons here, e.g., edit, delete, etc. */}
                  <button
                    className="text-themeBlue hover:text-themePurple"
                    onClick={() => updateInventory(item._id)}>
                    Edit
                  </button>
                  <button
                    className="text-themeBlue hover:text-themePurple ml-2"
                    onClick={() => deleteInventory(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
