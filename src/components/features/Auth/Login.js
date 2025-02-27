import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Login({onClick}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser({ email, password });
            navigate("/profile");
        } catch (error) {
            setError(error.message);
        }
    setEmail("");
    setPassword("");
    }

    return (
        <div className={styles.authContainer}>
            <h2>Login</h2>
            {error && <Error>{error}</Error>}
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