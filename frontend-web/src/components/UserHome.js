import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file
import { useState, useEffect } from "react"; // You imported useState and useEffect, but you are not using them. If you don't plan to, remove this line.

export default function UserHome() {
  const navigate = useNavigate();

  const SiteManagerCreateOrder = () => {
    navigate('/SiteManagerCreateOrder');
  };

  const SiteManagerViewOrder = () => {
    navigate('/SiteManagerViewOrder');
  };

  const Inventory = () => {
    navigate('/CreateInventory');
  };

  const handleManagerHome = () => {
    navigate('/managerHome');
  }
  const supplierView = () => {
    navigate('/supplierView')
  }

  return (
    <div>
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
    </div>
  );
}

