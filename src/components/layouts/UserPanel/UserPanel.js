import React from "react";
import { getCurrentUser } from "services/authService";
import { useNavigate } from "react-router-dom";
import Button from "components/common/Button/Button";
import Description from "components/common/Description/Description";
import Profile from "components/features/Profile/Profile";
import styles from "./UserPanel.module.scss";

function UserPanel() {
    const user = getCurrentUser();
    const navigate = useNavigate();


    if(!user){
        return (
            <div className={styles.userPanelContainer}>
                <Description className={styles.guestPanel}>Welcome, Guest!</Description>
                <div className={styles.authOptions}>
                    <Button 
                    className={styles.authLink} 
                    onClick={() => navigate("/login")}
                    text={"Login"} />
                    <Button 
                    className={styles.authLink} 
                    onClick={() => navigate("/signup")}
                    text={"Signup"} />
                </div>
            </div>
        );
    };
    return (
        <Profile />
    );
}

export default UserPanel;