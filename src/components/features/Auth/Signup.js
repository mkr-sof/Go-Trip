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
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <InputField
                    label="Full Name"
                    className={styles.authInput}
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
                <InputField
                    label="Email"
                    className={styles.authInput}
                    type="email"
                    placeholder=" "
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value)} />
                <InputField
                    label="Password"
                    className={styles.authInput}
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <InputField
                    label="Confirm Password"
                    className={styles.authInput}
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)} />
                <Button
                    className={styles.authLink}
                    type="submit"
                    disabled={!name || !email || !password || !confirmPassword}
                    text="SignUp"
                />
            </form>
            <div>
            <p>Already have an account?</p>
            <span style={{color: "#007bff", cursor: "pointer"}} onClick={() => navigate("/login")}>Login</span>
            </div>
        </div>
    );
}


export default Signup;
