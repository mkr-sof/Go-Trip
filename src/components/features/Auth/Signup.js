import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupUser } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss";

function Signup({onClick}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        console.log("Submitting signup form...", { name, email, password });
        try {
            const userData = { name, email, password };
            console.log("Submitting signup form...");
            const response = await signupUser(userData, dispatch);
            if(response.success){
                // console.log("Signup successful, navigating to profile...");
                navigate("/profile");
            }else{
                setError(response.message)
            }
            
        } catch (error) {
            console.error("Error during signup", error);
            setError(error.message)
        }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");  
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
                    onClick={onClick}
                    className={styles.authLink}
                    type="submit"
                    disabled={!name || !email || !password || !confirmPassword}
                    text="SignUp"
                    // onClick={() => console.log("Button clicked!")}
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
