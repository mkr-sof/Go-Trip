import React from 'react';
import { signupUser } from 'services/authService';

function TestSignup() {
    const testUser = {
        name: "Test User",
        email: "test@example.com",
        password: "password123"
    };

    const handleClick = async () => {
        console.log("Attempting to sign up user:", testUser);
        const response = await signupUser(testUser);
        console.log("Test Signup Response:", response);

        if (response.success) {
            console.log("User signed up successfully!");
            // You can check the local storage after the signup
            console.log("Current users in local storage:", JSON.parse(localStorage.getItem("users")));
        } else {
            console.error("Signup failed:", response.message);
        } 
    };

    return (
        <div>
            <h2>Test Signup</h2>
            <button onClick={handleClick}>Test Signup</button>
        </div>
    );
}

export default TestSignup;
