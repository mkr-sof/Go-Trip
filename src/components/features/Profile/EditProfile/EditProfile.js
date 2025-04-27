import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "store/modules/authSlice";
import { saveDataToLocalStorage } from "services/storageService";
import InputField from "components/common/InputField/InputField";
import FileUpload from "components/common/FileUpload/FileUpload";
import Button from "components/common/Button/Button";
import styles from "./EditProfile.module.scss";

function EditProfile() {
    const navigate = useNavigate();
    const location = useLocation();
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
        if (newPassword && newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        const updatedUser = {
            ...profile,
            name,
            email,
            password: newPassword || profile?.password
        };

        dispatch(setProfile(updatedUser));
        saveDataToLocalStorage("profile", updatedUser);

        navigate("/profile");
    };

    return (
        <>
            <h2>Edit Profile</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.formContainer} onSubmit={handleSaveUser}>
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
                    onChange={(event) => setEmail(event.target.value)}
                />
                <InputField
                    label="New Password"
                    type="password"
                    placeholder=" "
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <InputField
                    label="Confirm New Password"
                    type="password"
                    placeholder=" "
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <FileUpload
                    image={image}
                    onChange={handleImageChange}
                    onRemoveImage={handleRemoveImage}
                />
                <div className={styles.authOptions}>
                    <Button
                        type="submit"
                        disabled={!name || !email}
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
