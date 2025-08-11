import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/modules/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from "components/common/Button/Button";
import Description from "components/common/Description/Description";
import styles from "./UserPanel.module.scss";

function UserPanel() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let displayedUser;
    const user = useSelector((state) => state.auth?.user);
    const allUsers = useSelector((state) => state.auth?.users);
    const profile = useSelector((state) => state.profile?.user);


    if(userId && user?.id !== Number(userId)){
        displayedUser = allUsers.find((u) => u.id === Number(userId));
    }else{
        displayedUser = user || profile || {};
    }

    const isOwnProfile = user && displayedUser && user.id === displayedUser.id;

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
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
            <div className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={displayedUser.avatar || "/default-avatar.png"}
                        alt="User Avatar"
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.profileInfo}>
                    <h2 className={styles.userName}>{displayedUser.name}</h2>
                    <p className={styles.userTagline}>
                        {displayedUser.tagline || "Travel Enthusiast"}
                    </p>

                    <div className={styles.socialIcons}>
                        <a href={displayedUser.twitter || "#"} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className="fab fa-twitter" />
                        </a>
                        <a href={displayedUser.instagram || "#"} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className="fab fa-instagram" />
                        </a>
                        <a href={displayedUser.linkedin || "#"} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className="fab fa-linkedin" />
                        </a>
                    </div>

                    <p className={styles.userBio}>
                        {displayedUser.bio ||
                            "Exploring the world, one trip at a time. Passionate about design, culture, and creating amazing experiences."}
                    </p>

                    <div className={styles.authOptions}>
                        {isOwnProfile ? (
                            <>
                                <Button
                                    className={styles.authLink}
                                    type="button"
                                    onClick={() => navigate("/profile/edit")}
                                    text="Edit Profile"
                                />
                                <Button
                                    className={styles.authLink}
                                    type="button"
                                    onClick={handleLogout}
                                    text="Logout"
                                />
                            </>
                        ) : (
                           <>
                            <Button
                                className={styles.authLink}
                                type="button"
                                onClick={() => navigate(`/profile/${displayedUser.id}`)}
                                text="My Posts"
                            />
                            <Button
                                className={styles.authLink}
                                type="button"
                                onClick={() => navigate(`/profile/${displayedUser.id}`)}
                                text="Mail me"
                            />
                           </>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UserPanel;


// <div className={styles.userPanelContainer}>
//     <Description className={styles.userPanel}>
//         <span
//             className={styles.usernameLink}
//             onClick={() => navigate(user ? "/profile" : `/profile/${user.id}`)}
//         >
//             Welcome, {user.name}!
//         </span>
//     </Description>
//     <Description className={styles.profileDescription}>
//         <a href={`mailto:${user?.email}`} className={styles.emailLink}>
//             Email: {user?.email}
//         </a>
//     </Description>
//     <div className={styles.authOptions}>
//         <Button
//             className={styles.authLink}
//             type="button"
//             onClick={() => navigate("/profile/edit")}
//             text="Edit Profile"
//         />
//         <Button
//             type="button"
//             className={styles.authLink}
//             onClick={handleLogout}
//             text={"Logout"}
//         />
//     </div>
// </div>