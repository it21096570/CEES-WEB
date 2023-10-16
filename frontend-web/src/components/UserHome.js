import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file
import { useState, useEffect } from "react";



export default function UserHome() {
  const navigate = useNavigate();

  const SiteManagerCreateOrder = () => {
    navigate('/SiteManagerCreateOrder');
  };

  const Inventory = () => {
    navigate('/CreateInventory');
  };
  const handleManagerHome = () => {
    navigate('/managerHome')
  }

  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-semibold mb-4">User Home</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
        onClick={SiteManagerCreateOrder}
      >
        Create Order
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
        onClick={Inventory}
      >
        Inventory
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md"
        onClick={handleManagerHome}
      >
        Manager Home
      </button>
    </div>



  );

}
