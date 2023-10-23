import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

                const itemResponse = await axios.get(`http://localhost:8080/orderItem/getOrderItemsByOrderID/${orderId}`);
                setOrderItemDetails(itemResponse.data);

            } catch (error) {
                console.error("Error fetching data: " + error);
            }
        }

        fetchData();
    }, [orderId]);

    let filteredItems = orderItemDetails.filter((item) => (
        item.item.name && item.item.name.toLowerCase().includes(search.toLowerCase())
    ));

    const handleQuantityChange = async (item, e) => {
        const newQty = e.target.value;
        const newTotal = newQty * item.item.avgunitprice; // Calculate the new item total
        const itemId = item._id;
        const newGrandTotal = orderDetails.total + newTotal;

        try {
            const data = {
                total: newGrandTotal
            }
            await axios.put(`http://localhost:8080/order/updateOrder/${orderId}`, data);
            
        }catch(error){
            console.error("Error upadte data: ", error);
        }
       
    
        try {
            const updatedItem = { ...item, qty: newQty, itemtotal: newTotal }; // Update both qty and itemtotal
            await axios.put(`http://localhost:8080/orderItem/updateOrderItems/${itemId}`, updatedItem);
            
            // Update the local state for items
            setOrderItemDetails(prevItems =>
                prevItems.map(i => (i._id === itemId ? { ...i, qty: newQty, itemtotal: newTotal } : i))
            );
    
          
    
        } catch (error) {
            console.error("Error updating quantity: ", error);
        }
    }
    
    

    function generatePdf() {
        const doc = new jsPDF("portrait", "pt", "A3");

        const title = "Order Table Details";
        const headers = ["Item Name", "Quantity", "Unit Price", "Item Total"];
        const data = filteredItems.map((rep) => [
            rep.item.name,
            rep.qty,
            rep.item.avgunitprice,
            rep.itemtotal,
        ]);

        doc.setFontSize(18);
        doc.text(title, 400, 40);
        doc.setFontSize(12);
        doc.text(`Order Name: ${orderDetails.name}`, 20, 20);
        doc.text(`Status: ${orderDetails.status}`, 20, 30);
        doc.text(`Total Price: $${orderDetails.total}`, 20, 40);

        doc.autoTable({
            startY: 70,
            head: [headers],
            body: data,
        });
        doc.save("OrderDetails.pdf");
    }

    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto mt-5">
            <div className="w-52 md:w-2/3 lg:w-1/3 shadow-lg bg-white mx-auto p-2 mt-5">
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
                    <button
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={generatePdf}
                    >
                        <span className="mr-2">Print</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l-7-7 7-7m4 14l7-7-7-7"></path>
                        </svg>
                    </button>
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
                        <tr key={item._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{item.item.name}</td>
                            <td className="py-2 px-4">
                                <input 
                                    type="number" 
                                    value={item.qty} 
                                    onChange={(e) => handleQuantityChange(item, e)} 
                                    className="py-1 px-2 border rounded"
                                />
                            </td>
                            <td className="py-2 px-4">{item.item.avgunitprice}</td>
                            <td className="py-2 px-4">{item.itemtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-4 text-lg font-semibold float-right">
                Total Cost: ${orderDetails.total}
            </p>
        </div>
    );
}
