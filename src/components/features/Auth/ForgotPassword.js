import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await resetPassword(email);
      setMessage(response);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Password Recovery</h2>
      {error && <Error>{error}</Error>}
      {message && <p style={{ color: "#107EFF" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <InputField
          className={styles.authInput}
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button 
        type="submit"
        text="Submit"
        />
      </form>
      <p>
        <button onClick={() => navigate("/login")}>Back</button>
      </p>
    </div>
  );
};

export default ForgotPassword;