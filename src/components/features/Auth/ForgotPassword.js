import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "services/authService";
import Error from "components/common/Error/Error";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import styles from "./Auth.module.scss"
import Description from "components/common/Description/Description";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await resetPassword(email);
      if (response.success) {
        setMessage("User found! Please enter your new password.");
        setShowNewPasswordInput(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

    const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await resetPassword(email, newPassword);
      if (response.success) {
        setMessage(response.message);
        setShowNewPasswordInput(false);
        setEmail("");
        setNewPassword("");

        setTimeout(() => {
        navigate("/login");
      }, 1500); 
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className={styles.authContainer}>
      <h2>Password Recovery</h2>
      {error && <Error>{error}</Error>}
      {message && <Description>{message}</Description>}

      {!showNewPasswordInput ? (
        <form className={styles.formContainer} onSubmit={handleEmailSubmit}>
          <InputField
            label="Your Email"
            className={styles.authInput}
            type="email"
            placeholder=" "
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button 
            className={styles.authLink}
            type="submit"
            text="Next"
          />
        </form>
      ) : (
        <form className={styles.formContainer} onSubmit={handlePasswordSubmit}>
          <InputField
            label="New Password"
            className={styles.authInput}
            type="password"
            placeholder=" "
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={6}
          />
          <Button 
            className={styles.authLink}
            type="submit"
            text="Reset Password"
          />
        </form>
      )}

      <p>
        <span
          style={{ color: "#007bff", margin: "5px", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Back
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;