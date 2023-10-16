import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


export default function InvoicePayment() {


    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        orderid: '123456', // You can provide a default order ID here
        cardno: '',
        date: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value,
        });
    };



    return (
        <div className="h-screen flex flex-wrap justify-center items-center">
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                <h1 className="text-2xl font-semibold text-center mb-4">Payment Details</h1>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full md:w-1/2">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="orderid">
                                Order ID:
                            </label>
                            <input
                                className="w-full border rounded-lg py-2 px-3"
                                type="text"
                                id="orderid"
                                name="orderid"
                                placeholder="Enter order ID"
                                required
                                value={paymentDetails.orderid}
                                readOnly
                            />
                        </div>
                        <div className="p-2 w-full md:w-1/2">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="amount">
                                Amount:
                            </label>
                            <input
                                className="w-full border rounded-lg py-2 px-3"
                                type="text"
                                id="amount"
                                name="amount"
                                placeholder="Enter amount"
                                required
                                onChange={handleInputChange}
                                value={paymentDetails.amount}
                            />
                        </div>
                    </div>

                    <div className="p-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="cardno">
                            Card Number:
                        </label>
                        <input
                            className="w-full border rounded-lg py-2 px-3"
                            type="text"
                            id="cardno"
                            name="cardno"
                            placeholder="Enter card number"
                            required
                            onChange={handleInputChange}
                            value={paymentDetails.cardno}
                        />
                    </div>

                    <div className="p-2">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">
                            Expiration Date:
                        </label>
                        <input
                            className="w-full border rounded-lg py-2 px-3"
                            type="text"
                            id="date"
                            name="date"
                            placeholder="MM/YY"
                            required
                            onChange={handleInputChange}
                            value={paymentDetails.date}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Submit Payment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}