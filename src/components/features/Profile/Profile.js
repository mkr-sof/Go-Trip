import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "services/authService";
import { saveDataToLocalStorage } from "services/storageService";
import InputField from "components/common/InputField/InputField";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import styles from "./Profile.module.scss";

function Profile() {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSaveUser = (event) => {
        event.preventDefault();
        if(newPassword && newPassword !== confirmPassword){
            setError("Passwords do not match!");
            return;
        }
        const updatedUser = {
            ...user,
            name, 
            email,
            password: newPassword || user?.password
        };
        saveDataToLocalStorage("user", updatedUser);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };
    
    return (
        <div className={styles.profileContainer}>
            <h2>Profile</h2>
            {isEditing ? (
                <form className={styles.formContainer} onSubmit={handleSaveUser}>
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
                                    label="New Password"
                                    className={styles.authInput}
                                    type="password"
                                    placeholder=" "
                                    value={user.password}
                                    onChange={(event) => setNewPassword(event.target.value)} />
                                <InputField
                                    label="Confirm New Password"
                                    className={styles.authInput}
                                    type="password"
                                    placeholder=" "
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)} />
                                <Button
                                    className={styles.authLink}
                                    type="submit"
                                    disabled={!name || !email || !user.password || !confirmPassword}
                                    text="Save"
                                />
                            </form>
            ) : (
                <div className={styles.profileInfo}>
                    <Description className={styles.userPanel}>Welcome, {user.name}!</Description>
                    <Description className={styles.profileDescription}>Name: {user?.name}</Description>
                    <Description className={styles.profileDescription}>Email: {user?.email}</Description>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            )
        }
            
        </div>
    );
}

export default Profile;