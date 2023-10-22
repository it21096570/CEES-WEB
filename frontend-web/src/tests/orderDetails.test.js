import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderDetailsDisplay from './OrderDetailsDisplay';
import axios from 'axios';

// Mocking axios for API calls
jest.mock('axios');

describe('OrderDetailsDisplay Component', () => {
    // Define some mock data to be used in the tests
    const mockOrderData = {
        _id: '1',
        name: 'Sample Order',
        total: 100,
        status: 'Pending',
    };

    const mockOrderItemsData = [
        {
            item: {
                name: 'Item 1',
                avgunitprice: 50,
            },
            qty: 2,
            itemtotal: 100,
        },
    ];

    beforeEach(() => {
        // Reset axios mock data before each test
        axios.get.mockReset();
    });

    it('should render the order details correctly', async () => {
        // Mock axios.get for fetching order and order items
        axios.get.mockResolvedValueOnce({ data: mockOrderData });
        axios.get.mockResolvedValueOnce({ data: mockOrderItemsData });

        render(<OrderDetailsDisplay />);

        // Wait for the order details to be rendered
        const orderName = await screen.findByText('Order Name: Sample Order');
        const orderStatus = await screen.findByText('Status: Pending');
        const totalCost = await screen.findByText('Total Cost: $100');

        expect(orderName).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(totalCost).toBeInTheDocument();
    });

    it('should filter order items based on search input', async () => {
        // Mock axios.get for fetching order items
        axios.get.mockResolvedValueOnce({ data: mockOrderItemsData });

        render(<OrderDetailsDisplay />);

        // Wait for the order items to be rendered
        const item1 = await screen.findByText('Item 1');
        const item2 = await screen.queryByText('Item 2');

        expect(item1).toBeInTheDocument();
        expect(item2).toBeNull();

        // Enter a search input
        const searchInput = screen.getByPlaceholderText('Search for items');
        fireEvent.change(searchInput, { target: { value: 'Item 1' } });

        // Ensure only matching items are displayed
        const filteredItem1 = screen.getByText('Item 1');
        const filteredItem2 = screen.queryByText('Item 2');

        expect(filteredItem1).toBeInTheDocument();
        expect(filteredItem2).toBeNull();
    });

    it('should call managerApproval function and update status', async () => {
        // Mock axios.put for managerApproval
        axios.put.mockResolvedValueOnce({ status: 200 });

        render(<OrderDetailsDisplay />);

        const approveButton = screen.getByText('Approve');
        fireEvent.click(approveButton);

        // Wait for the success alert to be displayed
        const successAlert = await screen.findByText('Order 1 has been Approved');
        expect(successAlert).toBeInTheDocument();
    });

    it('should call managerReject function and update status', async () => {
        // Mock axios.put for managerReject
        axios.put.mockResolvedValueOnce({ status: 200 });

        render(<OrderDetailsDisplay />);

        const rejectButton = screen.getByText('Reject');
        fireEvent.click(rejectButton);

        // Wait for the success alert to be displayed
        const successAlert = await screen.findByText('Order 1 has been Rejected');
        expect(successAlert).toBeInTheDocument();
    });

    it('should generate a PDF when the Print button is clicked', async () => {
        render(<OrderDetailsDisplay />);

        const printButton = screen.getByText('Print');
        fireEvent.click(printButton);

        // Wait for the "Order Table Details" title in the generated PDF
        await screen.findByText('Order Table Details');

        // Add additional assertions for the content of the generated PDF as needed
    });
});
