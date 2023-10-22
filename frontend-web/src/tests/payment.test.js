//import React from 'react';
const React = require('react');
const axios = require('axios');
import { render, fireEvent, waitFor } from '@testing-library/react';
import InvoicePayment from '../components/InvoicePayment';

//const axios = require('axios');

jest.mock('axios');

describe('InvoicePayment Component', () => {
    it('should render the payment form', () => {
        const { getByText, getByLabelText } = render(<InvoicePayment />);

        // Ensure that essential elements are present
        expect(getByText('Payment Gateway')).toBeInTheDocument();
        expect(getByLabelText('OrderId')).toBeInTheDocument();
        expect(getByLabelText('Amount')).toBeInTheDocument();
    });

    it('should allow users to proceed through the payment steps', () => {
        const { getByText } = render(<InvoicePayment />);

        // Proceed to the next step
        fireEvent.click(getByText('Next'));

        // Proceed to the card details step
        fireEvent.click(getByText('Next'));

        // Proceed to the payment confirmation step
        fireEvent.click(getByText('Next'));

        // In a real application, add assertions for the payment confirmation step
        // ...

        // Check if the "Submit" button is displayed on the last step
        expect(getByText('Submit')).toBeInTheDocument();
    });

    it('should submit the payment details', async () => {
        axios.post.mockResolvedValue({ data: {} });

        const { getByText } = render(<InvoicePayment />);

        // Proceed to the payment confirmation step
        fireEvent.click(getByText('Next'));
        fireEvent.click(getByText('Next'));
        fireEvent.click(getByText('Next'));

        // Submit the payment
        fireEvent.click(getByText('Submit'));

        // Wait for the success message to appear
        await waitFor(() => {
            expect(getByText('Payment Submitted')).toBeInTheDocument();
        });
    });

    it('should handle payment submission errors', async () => {
        axios.post.mockRejectedValue({ response: { data: { message: 'Payment failed' } } });

        const { getByText } = render(<InvoicePayment />);

        // Proceed to the payment confirmation step
        fireEvent.click(getByText('Next'));
        fireEvent.click(getByText('Next'));
        fireEvent.click(getByText('Next'));

        // Submit the payment
        fireEvent.click(getByText('Submit'));

        // Wait for the error message to appear
        await waitFor(() => {
            expect(getByText('Error submitting payment: Payment failed')).toBeInTheDocument();
        });
    });
});
