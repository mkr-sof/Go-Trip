import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'services/authService';

function TestLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const testUser = {
        email: "test@example.com",
        password: "password123"
    };

    const handleClick = async () => {
        console.log("Attempting to log in user:", testUser);
        const response = await loginUser(testUser);
        console.log("Test Login Response:", response);

        if (response.success) {
            await loginUser({ email, password });
            navigate("/");
            console.log("User logged in successfully!");
            console.log("Current user in local storage:", JSON.parse(localStorage.getItem("user")));
        } else {
            console.error("Login failed:", response.message);
        }
    };

    return (
        <div>
            <h2>Test Login</h2>
            <button onClick={handleClick}>Test Login</button>
        </div>
    );
}

export default TestLogin;
