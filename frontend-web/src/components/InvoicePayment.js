import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function InvoicePayment() {
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const orderid = invoiceId;
    const [amount, setAmount] = useState('');
    const [cardno, setCardNo] = useState('');
    const [date, setDate] = useState('');
    const paymentstatus = 'confirm';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate input data here (e.g., card number and date)

            // Create an object to send in the POST request
            const paymentDetails = { orderid, amount, cardno, date, paymentstatus };

            // Send a POST request to your server to save the payment details
            await axios.post('http://localhost:8080/payment/createPayment', paymentDetails);

            // Optionally, you can reset the form or perform other actions on success
            setAmount('');
            setCardNo('');
            setDate('');
            alert('Payment submitted successfully!');

        } catch (error) {
            if (error.response) {
                // Handle specific error responses from the server
                // Display a more detailed error message to the user
                alert('Error submitting payment: ' + error.response.data.message);
            } else {
                alert('Error submitting payment: ' + error.message);
            }
        }
    };

    return (
        <div className="h-screen flex flex-wrap justify-center items-center">
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                <h1 className="text-2xl font-semibold text-center mb-4">Payment Details</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                                value={invoiceId}
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
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
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
                            value={cardno}
                            onChange={(e) => setCardNo(e.target.value)}
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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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
