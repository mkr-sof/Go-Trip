import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            signupUser({ name, email, password, confirmPassword });
            navigate("/profile");
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={styles.authContainer}>
            <h2>SignUp</h2>
            {error && <Error>{error}</Error>}
            <form onSubmit={handleSubmit}>
                <InputField
                    className={styles.authInput}
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
                <InputField
                    className={styles.authInput}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)} />
                <InputField
                    className={styles.authInput}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <InputField
                    className={styles.authInput}
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)} />
                <Button
                    type="submit"
                    disabled={!name || !email || !password || !confirmPassword}
                    text="SignUp"
                />
            </form>
            <p>Already have an account? <button onClick={() => navigate("/login")}>Login</button></p>
        </div>
    );
}


export default Signup;
