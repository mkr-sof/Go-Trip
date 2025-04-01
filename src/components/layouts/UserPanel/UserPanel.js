import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/modules/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "components/common/Button/Button";
import Description from "components/common/Description/Description";
import styles from "./UserPanel.module.scss";

function UserPanel() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (!user) {
        return (
            <div className={styles.userPanelContainer}>
                <Description className={styles.guestPanel}>Welcome, Guest!</Description>
                <div className={styles.authOptions}>
                    <Button
                        type="button"
                        className={styles.authLink}
                        onClick={() => navigate("/login")}
                        text={"Login"}
                    />
                    <Button
                        type="button"
                        className={styles.authLink}
                        onClick={() => navigate("/signup")}
                        text={"Signup"}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.userPanelContainer}>
            <Description className={styles.userPanel}>
                <span
                    className={styles.usernameLink}
                    onClick={() => navigate(user ? "/profile" : `/profile/${user.id}`)}
                >
                    Welcome, {user.name}!
                </span>
            </Description>
            <Description className={styles.profileDescription}>
                <a href={`mailto:${user?.email}`} className={styles.emailLink}>
                    Email: {user?.email}
                </a>
            </Description>
            <div className={styles.authOptions}>
                <Button
                    className={styles.authLink}
                    type="button"
                    onClick={() => navigate("/profile/edit")}
                    text="Edit Profile"
                />
                <Button
                    type="button"
                    className={styles.authLink}
                    onClick={handleLogout}
                    text={"Logout"}
                />
            </div>
        </div>
    );
}

export default UserPanel;