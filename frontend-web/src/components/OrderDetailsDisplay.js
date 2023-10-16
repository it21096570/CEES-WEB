import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function OrderDetailsDisplay() {
    const { orderId } = useParams();
    const [search, setSearch] = useState('');
    const [orderDetails, setOrderDetails] = useState({});
    const [orderItemDetails, setOrderItemDetails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const orderResponse = await axios.get(`http://localhost:8080/order/getOneOrder/${orderId}`);
                setOrderDetails(orderResponse.data);

                const itemResponse = await axios.get(`http://localhost:8080/orderItem/getOneOrder/${orderId}`);
                setOrderItemDetails(itemResponse.data);
            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }

        fetchData();
    }, [orderId]);

    const managerApproval = (id) => {
        const newStatus = "Approved"; // Change this to the desired status

        axios.put(`http://localhost:8080/order/updateOrder/${id}`, { status: newStatus })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Order ${orderId} has been ${newStatus}`);
                    // Optionally, you can update the order status in your frontend data
                    setOrderDetails({ ...orderDetails, status: newStatus });
                }
            })
            .catch((error) => {
                console.error('Error updating order status: ', error);
                alert('Error updating order status: ' + error.message);
            });
    };

    const managerReject = (id) => {
        const newStatus = "Rejected"; // Change this to the desired status

        axios.put(`http://localhost:8080/order/updateOrder/${id}`, { status: newStatus })
            .then((response) => {
                if (response.status === 200) {
                    alert(`Order ${orderId} has been ${newStatus}`);
                    // Optionally, you can update the order status in your frontend data
                    setOrderDetails({ ...orderDetails, status: newStatus });
                }
            })
            .catch((error) => {
                console.error('Error updating order status: ', error);
                alert('Error updating order status: ' + error.message);
            });
    };

    // Filter order items based on the search input
    let filteredItems = [];
    if (Array.isArray(orderItemDetails)) {
        filteredItems = orderItemDetails.filter((item) => (
            item.itemName && item.itemName.toLowerCase().includes(search.toLowerCase())
        ));
    }

    const totalCost = filteredItems.reduce((total, item) => total + item.itemTotal, 0);

    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 400;
        const margin = 20;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Order Table Details";
        const headers = ["Item Name", "Quantity", "Unit Price", "Item Total"];
        const data = filteredItems.map((rep) => [
            rep.itemName,
            rep.qty,
            rep.unitPrice,
            rep.itemTotal,
        ]);

        let content = {
            startY: 70,
            head: [headers],
            body: data,
        };

        doc.setFontSize(18);
        doc.text(title, marginLeft, 40);

        // Add Order Name, Status, and Total Price to the header
        doc.setFontSize(12);
        doc.text(`Order Name: ${orderDetails.name}`, margin, 20);
        doc.text(`Status: ${orderDetails.status}`, margin, 30);
        doc.text(`Total Price: $${orderDetails.total}`, margin, 40);

        doc.autoTable(content);
        doc.save("OrderDetails.pdf");
    }

    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto">
            <div className="w-52 md:w-2/3 lg:w-1/3 shadow-lg bg-white mx-auto p-2 float-left mt-5">
                <h1 className="text-lg font-semibold">Order Details</h1>
                <p className="text-sm">
                    Order Name: {orderDetails.name}<br />
                    Total Cost: ${orderDetails.total}<br />
                    Status: {orderDetails.status}
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
                        <button
                            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={() => managerApproval(orderDetails._id)}
                        >
                            <span className="mr-2">Approve</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </button>
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            onClick={() => managerReject(orderDetails._id)} >
                            <span className="mr-2">Reject</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <button
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={generatePdf}
                        >
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
