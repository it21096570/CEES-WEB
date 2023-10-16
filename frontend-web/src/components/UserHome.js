import React from "react";
import { Link } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


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
    navigate('/managerHome')
  }

  return (
    <div>
      <h1>User Home</h1>
      <button className="SiteManger" onClick={SiteManagerCreateOrder}> order </button>
      <button className="inventory" onClick={Inventory}>Inventory</button>
      <button className="vieworder" onClick={SiteManagerViewOrder}>view order</button>
    </div>


  );

}
