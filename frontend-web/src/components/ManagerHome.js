import React from "react"
import axios from "axios";
import { Link } from 'react-router-dom';


export default function ManagerHome() {


    return (


        <div className="h-screen flex flex-wrap justify-center items-center">
            <Link to="/orderManagement">
                <div className="w-96 h-96 bg-blue-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src="image1.jpg" alt="Image 1" className="w-16 h-16" />
                    <div>Orders</div>
                </div>
            </Link>
            <Link to="/page2">
                <div className="w-96 h-96 bg-green-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src="image2.jpg" alt="Image 2" className="w-16 h-16" />
                    <div>Invoices</div>
                </div>
            </Link>
            <Link to="/page3">
                <div className="w-96 h-96 bg-yellow-200 rounded-lg p-4 m-4 flex flex-col items-center">
                    <img src="image3.jpg" alt="Image 3" className="w-16 h-16" />
                    <div>Payments</div>
                </div>
            </Link>
        </div>
    )
}