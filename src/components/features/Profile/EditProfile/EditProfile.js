import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "store/modules/authSlice";
import { saveDataToLocalStorage } from "services/storageService";
import InputField from "components/common/InputField/InputField";
import FileUpload from "components/common/FileUpload/FileUpload";
import Button from "components/common/Button/Button";
import Error from "components/common/Error/Error";
import styles from "./EditProfile.module.scss";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.auth.user);

    const [name, setName] = useState(profile?.name || "");
    const [email, setEmail] = useState(profile?.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState(profile?.avatar || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleSaveUser = (event) => {
        event.preventDefault();

        if (newPassword && newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            setNewPassword("");
            setConfirmPassword("");
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            setNewPassword("");
            setConfirmPassword("");
            return;
        }
        const updatedUser = {
            ...profile,
            name,
            email,
            password: newPassword || profile?.password,
            avatar: image || profile?.avatar,
        };

        dispatch(setProfile(updatedUser));
        saveDataToLocalStorage("profile", updatedUser);

        navigate("/profile");
    };

    return (
        <>
            <h2>Edit Profile</h2>
            {error && <Error message={error} />}
            <form className={styles.formContainer} noValidate onSubmit={handleSaveUser}>
                <InputField
                    label="Full Name"
                    type="text"
                    placeholder=" "
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder=" "
                    value={email}
                    disabled
                    onChange={() => { }}
                    className={styles.authInput}
                />
                <InputField
                    label="New Password"
                    type="password"
                    placeholder=" "
                    value={newPassword}
                    onChange={(event) => {
                        const value = event.target.value;
                        setNewPassword(value);
                        if (value && value.length < 6) {
                            setError("Password must be at least 6 characters.");
                        } else if (confirmPassword && value !== confirmPassword) {
                            setError("Passwords do not match!");
                        } else {
                            setError("");
                        }
                    }}
                />
                <InputField
                    label="Confirm New Password"
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(event) => {
                        const value = event.target.value;
                        setConfirmPassword(value);
                        if (newPassword && newPassword !== value) {
                            setError("Passwords do not match!");
                        } else {
                            setError("");
                        }
                    }} 
                />
                <FileUpload
                    image={image}
                    onChange={handleImageChange}
                    onRemoveImage={handleRemoveImage}
                />
                <div className={styles.authOptions}>
                    <Button
                        type="submit"
                        text="Save"
                    />
                    <Button
                        type="button"
                        onClick={() => navigate("/profile")}
                        text="Cancel"
                    />
                </div>
            </form>
        </>
    );
}

export default EditProfile;
