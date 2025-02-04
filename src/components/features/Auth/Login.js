import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            loginUser({ email, password });
            navigate("/profile");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.authContainer}>
            <h2>Login</h2>
            {error && <Error>{error}</Error>}
            <form onSubmit={handleSubmit}>
                <InputField
                    className={styles.authInput}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    className={styles.authInput}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                className={styles.authButton} 
                type="submit"
                text="Login"
                />
            </form>
            <p>
                <span style={{color: "blue", margin: "5px"}} onClick={() => navigate("/signup")}>Signup</span>
                <span style={{color: "blue", margin: "5px"}} onClick={() => navigate("/forgot-password")}>Recover</span>
            </p>
        </div>
    );

}

export default Login;