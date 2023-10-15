import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PaymentDetails() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All'); // Initialize with 'All'

    useEffect(() => {
        // Fetch payment details from your API (replace with actual API endpoint)
        // Example API call using Fetch:
        fetch('/api/payment-details') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const filteredData = data.filter((item) =>
        (selectedStatus === 'All' || item.paymentstatus === selectedStatus) &&
        item.orderid.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-screen flex flex-col items-center">
            <h1 className="text-4xl font-semibold mb-4">Payment Details</h1>

            <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white">
                <div className="bg-white shadow-lg p-4 flex items-center justify-between">
                    <div className="relative w-3/4">
                        <input
                            type="text"
                            placeholder="Search by Order ID"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-96 py-2 pl-8 pr-3 border rounded-lg"
                        />
                        <div className="absolute top-0 left-2 mt-2 text-gray-500">
                            <i className="fas fa-search"></i> {/* Add your search icon here */}
                        </div>
                    </div>
                    <div className="relative w-1/4">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full py-2 pr-3 border rounded-lg"
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                    <div className="relative w-1/4 p-5">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Print Details
                        </button>
                    </div>
                </div>
            </div>
            <table className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 font-semibold">Order ID</th>
                        <th className="py-2 px-4 font-semibold">Amount</th>
                        <th className="py-2 px-4 font-semibold">Card Number</th>
                        <th className="py-2 px-4 font-semibold">Payment Status</th>
                        <th className="py-2 px-4 font-semibold">View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.orderid}</td>
                            <td className="py-2 px-4">{item.amount}</td>
                            <td className="py-2 px-4">{item.cardno}</td>
                            <td className="py-2 px-4">{item.paymentstatus}</td>
                            <td className="py-2 px-4">
                                <Link to={`/payment-details/${item._id}`}>
                                    <button className="text-blue-500 hover:underline">Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentDetails;
