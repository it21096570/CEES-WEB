import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function OrderDetailsDisplay() {

    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All'); // Initialize with 'All'

    const orderdetails = [
        {
            _id: 'order_id_1',
            name: 'Order 1',
            total: 50.0,
            status: 'Pending',
        }
    ];

    // Dummy data for order items
    const orderItemsData = [
        {
            _id: 'item_id_1',
            orderId: 'order_id_1',
            itemName: 'Item A',
            qty: 2,
            unitPrice: 10.0,
            itemTotal: 20.0,
        },
        {
            _id: 'item_id_2',
            orderId: 'order_id_1',
            itemName: 'Item B',
            qty: 3,
            unitPrice: 15.0,
            itemTotal: 45.0,
        },
        {
            _id: 'item_id_3',
            orderId: 'order_id_2',
            itemName: 'Item C',
            qty: 4,
            unitPrice: 12.5,
            itemTotal: 50.0,
        },
        {
            _id: 'item_id_4',
            orderId: 'order_id_3',
            itemName: 'Item D',
            qty: 1,
            unitPrice: 8.0,
            itemTotal: 8.0,
        },
        {
            _id: 'item_id_5',
            orderId: 'order_id_4',
            itemName: 'Item E',
            qty: 2,
            unitPrice: 20.0,
            itemTotal: 40.0,
        },
        {
            _id: 'item_id_6',
            orderId: 'order_id_5',
            itemName: 'Item A',
            qty: 3,
            unitPrice: 10.0,
            itemTotal: 30.0,
        },
        {
            _id: 'item_id_7',
            orderId: 'order_id_5',
            itemName: 'Item D',
            qty: 2,
            unitPrice: 8.0,
            itemTotal: 16.0,
        },
    ];

    // Fetch the order details and order items based on the orderId
    useEffect(() => {
        // Define a function to fetch order details and items here
        const fetchOrderDetails = async () => {
            try {
                // Fetch order details using the orderId
                const orderResponse = await fetch(`/api/orders/${orderId}`);
                const orderData = await orderResponse.json();

                // Fetch order items using the orderId
                const orderItemsResponse = await fetch(`/api/order-items/${orderId}`);
                const orderItemsData = await orderItemsResponse.json();

                setOrder(orderData);
                setOrderItems(orderItemsData);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const [search, setSearch] = useState('');

    // Filter order items based on the search input
    const filteredItems = orderItemsData.filter((item) =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    const totalCost = filteredItems.reduce((total, item) => total + item.itemTotal, 0);

    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto">

            <div className="w-52 md:w-2/3 lg:w-1/3 shadow-lg bg-white mx-auto p-2 float-left mt-5">
                <h1 className="text-lg font-semibold">Order Details</h1>
                <p className="text-sm">
                    Order Name: {orderdetails.name}<br />
                    Total Cost: ${orderdetails.total}<br />
                    Status: {orderdetails.status}
                </p>
            </div>


            <div className="flex justify-end pr-10 pt-10">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search for items"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mr-4 py-2 px-4 border rounded-lg"
                    />

                    <div className="flex items-center space-x-4">
                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            <span className="mr-2">Approve</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </button>
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            <span className="mr-2">Reject</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            <span className="mr-2">Print</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19l-7-7 7-7m4 14l7-7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <table className="w-full shadow-lg bg-white my-4 mx-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 font-semibold">Item</th>
                        <th className="py-2 px-4 font-semibold">Quantity</th>
                        <th className="py-2 px-4 font-semibold">Unit Price</th>
                        <th className="py-2 px-4 font-semibold">Item Total</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.itemName}</td>
                            <td className="py-2 px-4">{item.qty}</td>
                            <td className="py-2 px-4">${item.unitPrice}</td>
                            <td className="py-2 px-4">${item.itemTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-lg font-semibold float-right">
                Total Cost: ${totalCost}
            </p>
        </div>


    );
}