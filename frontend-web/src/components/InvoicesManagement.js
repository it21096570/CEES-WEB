import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function InvoicesManagement() {
    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        // Fetch invoices when the component mounts
        axios.get('http://localhost:8080/invoice/getAllInvoices')
            .then((response) => {
                setInvoices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });
    }, []); // Empty dependency array means this effect runs once on component mount

    // Filter invoices based on the search input
    const filteredInvoices = invoices.filter((invoice) =>
        invoice.ordername.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate the total cost
    const calculateTotalCost = () => {
        const total = filteredInvoices.reduce((acc, invoice) => {
            return acc + parseFloat(invoice.ordertotal);
        }, 0);
        setTotalCost(total);
    };

    useEffect(() => {
        calculateTotalCost();
    }, [filteredInvoices]);

    return (
        <div className="w-full md:w-3/4 lg:w-4/5 xl:w-5/6 shadow-lg bg-white mx-auto">
            <div className="w-52 md:w-2/3 lg-w-1/3 shadow-lg bg-white mx-auto p-2 float-left mt-5">
                <h1 className="text-lg font-semibold">Invoice Details</h1>
            </div>
            <div className="flex justify-end pr-10 pt-10">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search for invoices"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mr-4 py-2 px-4 border rounded-lg"
                    />
                </div>
            </div>
            <table className="w-full shadow-lg bg-white my-4 mx-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 font-semibold">Order Name</th>
                        <th className="py-2 px-4 font-semibold">Order Total</th>
                        <th className="py-2 px-4 font-semibold">Order Status</th>
                        <th className="py-2 px-4 font-semibold">Actual Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map((invoice, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-2 px-4">{invoice.ordername}</td>
                            <td className="py-2 px-4">${invoice.ordertotal}</td>
                            <td className="py-2 px-4">{invoice.orderstatus}</td>
                            <td className="py-2 px-4">${invoice.actualprice}</td>
                            <td className="py-2 px-4">
                                <Link to={`/invoicePayment/${invoice._id}`}>
                                    <button className="text-blue-500 hover:underline">Pay Now</button>
                                </Link></td>
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
