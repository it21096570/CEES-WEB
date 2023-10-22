//import React from 'react';
const React = require('react');
const axios = require('axios');
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
//import axios from 'axios'; // Import axios

import Login from '../components/Login';
import Register from '../components/Register';

jest.mock('axios');

describe('Login and Register Components', () => {
    describe('Login Component', () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            );
        });

        it('should render the login form', () => {
            const emailInput = screen.getByPlaceholderText('Enter your email');
            const passwordInput = screen.getByPlaceholderText('Enter your password');
            const loginButton = screen.getByText('Login');

            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(loginButton).toBeInTheDocument();
        });

        it('should handle user login', async () => {
            axios.post.mockResolvedValue({ data: { token: 'your-token', role: 'user' } });

            const emailInput = screen.getByPlaceholderText('Enter your email');
            const passwordInput = screen.getByPlaceholderText('Enter your password');
            const loginButton = screen.getByText('Login');

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            fireEvent.click(loginButton);

            await waitFor(() => {
                expect(screen.getByText('Login success')).toBeInTheDocument();
            });
        });

        it('should handle failed user login', async () => {
            axios.post.mockRejectedValue({ message: 'Login failed' });

            const emailInput = screen.getByPlaceholderText('Enter your email');
            const passwordInput = screen.getByPlaceholderText('Enter your password');
            const loginButton = screen.getByText('Login');

            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            fireEvent.click(loginButton);

            await waitFor(() => {
                expect(screen.getByText('Login Unsuccessful')).toBeInTheDocument();
            });
        });
    });

    describe('Register Component', () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            );
        });

        it('should render the registration form', () => {
            const firstNameInput = screen.getByPlaceholderText('First Name');
            const lastNameInput = screen.getByPlaceholderText('Last Name');
            const emailInput = screen.getByPlaceholderText('Email');
            const ageInput = screen.getByPlaceholderText('Age');
            const dobInput = screen.getByTestId('dob-input');
            const passwordInput = screen.getByPlaceholderText('Password');
            const registerButton = screen.getByText('Submit');

            expect(firstNameInput).toBeInTheDocument();
            expect(lastNameInput).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(ageInput).toBeInTheDocument();
            expect(dobInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument();
            expect(registerButton).toBeInTheDocument();
        });

        it('should handle user registration', async () => {
            axios.post.mockResolvedValue({ data: {} });

            const firstNameInput = screen.getByPlaceholderText('First Name');
            const lastNameInput = screen.getByPlaceholderText('Last Name');
            const emailInput = screen.getByPlaceholderText('Email');
            const ageInput = screen.getByPlaceholderText('Age');
            const dobInput = screen.getByTestId('dob-input');
            const passwordInput = screen.getByPlaceholderText('Password');
            const registerButton = screen.getByText('Submit');

            fireEvent.change(firstNameInput, { target: { value: 'John' } });
            fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
            fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
            fireEvent.change(ageInput, { target: { value: '30' } });
            fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            fireEvent.click(registerButton);

            await waitFor(() => {
                expect(screen.getByText('User add success')).toBeInTheDocument();
            });
        });

        it('should handle failed user registration', async () => {
            axios.post.mockRejectedValue({ message: 'Registration failed' });

            const firstNameInput = screen.getByPlaceholderText('First Name');
            const lastNameInput = screen.getByPlaceholderText('Last Name');
            const emailInput = screen.getByPlaceholderText('Email');
            const ageInput = screen.getByPlaceholderText('Age');
            const dobInput = screen.getByTestId('dob-input');
            const passwordInput = screen.getByPlaceholderText('Password');
            const registerButton = screen.getByText('Submit');

            fireEvent.change(firstNameInput, { target: { value: 'John' } });
            fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
            fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
            fireEvent.change(ageInput, { target: { value: '30' } });
            fireEvent.change(dobInput, { target: { value: '2000-01-01' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });

            fireEvent.click(registerButton);

            await waitFor(() => {
                expect(screen.getByText('Registration failed')).toBeInTheDocument();
            });
        });
    });
});
