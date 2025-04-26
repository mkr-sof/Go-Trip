import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "services/userService";
import { profile } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Login({onClick}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const rememberedUser = await getCurrentUser();
            if (rememberedUser) {
                setEmail(rememberedUser.email);
                setRememberMe(true);
            } else {
                setRememberMe(false);
            }
        };
    
        fetchUser();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await profile({ email, password, rememberMe });
            if (response.success) {
            navigate("/profile");
        } else {
            setError(response.message);
        }
        } catch (error) {
            setError(error.message);
        }
        setEmail("");
        setPassword("");
    };

    return (
        <div className={styles.authContainer}>
            <h2>Login</h2>
            {error && <Error message={error} >{error}</Error>}
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    className={styles.authInput}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                    label="Password"
                    className={styles.authInput}
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div className={styles.rememberMeContainer}>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <Button 
                    onClick={onClick}
                    className={styles.authLink}
                    type="submit"
                    text="Login"
                />
            </form>
            <p>
                <span style={{color: "#007bff", margin: "5px", cursor: "pointer"}} onClick={() => navigate("/signup")}>Signup</span>
                <span style={{color: "#007bff", margin: "5px", cursor: "pointer"}} onClick={() => navigate("/forgot-password")}>Recover</span>
            </p>
        </div>
    );
}

export default Login;