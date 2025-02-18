import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "services/authService";
import { getDataFromLocalStorage } from "services/storageService";
import styles from "./Welcome.module.scss";
import Button from "components/common/Button/Button";

function Welcome() {
    const navigate = useNavigate();
    const isLoggedIn = isUserLoggedIn();
    const user = getDataFromLocalStorage("user");

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/feed");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className={styles.welcomeContainer}>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome back, {user?.name || "Traveler"}! 🌍</h1>
                    <p>Continue exploring amazing travel blogs from people around the world.</p>
                    <Button className={styles.goToFeed} onClick={() => navigate("/feed")} text="Go To Feed" />
                </div>
            ) : (
                <div className={styles.authOptions}>
                    <h1>Welcome to <span className={styles.logo}>Go Trip</span>! ✈️</h1>
                    <p>Discover and share travel experiences with people from all over the world.</p>
                    <div >
                        <Button
                            className={styles.authLink}
                            onClick={() => navigate("/login")}
                            text="Sign In"
                        />
                        <Button
                            className={styles.authLink}
                            onClick={() => navigate("/signup")}
                            text="Sign Up"
                        />
                    </div>

                    <p>or</p>
                    <Button
                        className={styles.guestButton}
                        onClick={() => navigate("/feed")}
                        text="Continue as Guest"
                    />
                </div>
            )}
        </div>
    );
}


export default Welcome;