import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { getCurrentUser } from "services/authService";
import { saveDataToLocalStorage, getDataFromLocalStorage } from "services/storageService";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import InputField from "components/common/InputField/InputField";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import styles from "./Profile.module.scss";

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useParams();
    const currentUser = getCurrentUser();
    const isEditing = location.pathname === "/profile/edit";

    const users = getDataFromLocalStorage("users");


    const profileUser = userId 
        ? getDataFromLocalStorage("users")?.find(user => user.id === Number(userId)) 
        : currentUser;

    console.log("Profile User:", profileUser);

    const [name, setName] = useState(profileUser?.name || "");
    const [email, setEmail] = useState(profileUser?.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (profileUser && profileUser.id) {
                const fetchUserPosts = async () => {
                const allPosts = await getDataFromLocalStorage("allPosts") || [];
                const posts = allPosts.filter(post => post.authorId.toString() === profileUser.id.toString());
                setUserPosts(posts);
            };
            fetchUserPosts();
        }
    }, []);

    if (!profileUser) {
        return <p>Loading...</p>;
    }

    const handleSaveUser = (event) => {
        event.preventDefault();
        if (newPassword && newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        const updatedUser = {
            ...profileUser,
            id: profileUser?.id || Date.now(),
            name,
            email,
            password: newPassword || profileUser?.password
        };

        const users = getDataFromLocalStorage("users") || [];
        const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
        saveDataToLocalStorage("users", updatedUsers);

        if (!userId) {
            if (getDataFromLocalStorage("profile")) {
                saveDataToLocalStorage("profile", updatedUser);
            } else {
                sessionStorage.setItem("profile", JSON.stringify(updatedUser));
            }
        }
        navigate("/profile");
    };

    return (
        <div className={styles.profileContainer}>
            {isEditing ? (
                <>
                    <h2>Edit Profile</h2>
                    {error && <p className={styles.error}>{error}</p>}
                    <form className={styles.formContainer} onSubmit={handleSaveUser}>
                        <InputField
                            className={styles.authInput}
                            label="Full Name"
                            type="text"
                            placeholder=" "
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <InputField
                            label="Email"
                            className={styles.authInput}
                            type="email"
                            placeholder=" "
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <InputField
                            label="New Password"
                            className={styles.authInput}
                            type="password"
                            placeholder=" "
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                        <InputField
                            label="Confirm New Password"
                            className={styles.authInput}
                            type="password"
                            placeholder=" "
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                        <div className={styles.authOptions}>
                            <Button
                                className={styles.authLink}
                                type="submit"
                                disabled={!name || !email}
                                text="Save"
                            />
                            <Button
                                className={styles.authLink}
                                type="button"
                                onClick={() => navigate("/profile")}
                                text="Cancel"
                            />
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h2>{profileUser.name}'s Profile</h2>
                    <Description>{profileUser.name}'s Posts</Description>
                    {userPosts.length > 0 ? (
                        userPosts.map(post => (
                            <Link 
                            key={post.id} 
                            to={`/post/${post.id}`}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            >
                                <PostCard post={post} />
                            </Link>
                        ))
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;