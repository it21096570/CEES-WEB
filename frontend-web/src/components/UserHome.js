import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/home.css'; // Import your custom CSS file
import { useState, useEffect } from "react";

export default function UserHome() {
  const navigate = useNavigate();

  const Inventory = () =>{
    navigate('/CreateInventory')
  }
  return (
    <div>
      <h1>User Home</h1>
      <button className="inventory" onClick={Inventory}>Inventory</button>
    </div>
  );

}
