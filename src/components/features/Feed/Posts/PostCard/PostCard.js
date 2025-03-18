import React, { useState, useEffect } from "react";
import styles from "./PostCard.module.scss";
import { isUserLoggedIn } from "services/authService";
import { saveDataToLocalStorage, getDataFromLocalStorage } from "services/storageService";

function PostCard({ post }) {
    const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn());
    }, []);

    const handleFavorite = () => {
        const user = isUserLoggedIn();
        if (!user) return;
        if (!isLoggedIn) return;

        const updatedFavoriteStatus = !isFavorited;
        setIsFavorited(updatedFavoriteStatus);

        const allPosts = getDataFromLocalStorage("allPosts") || [];
        const updatedPosts = allPosts.map(p => {
            return p.id === post.id ? {...p, isFavorite:updatedFavoriteStatus} : p;
        })
        saveDataToLocalStorage("allPosts", updatedPosts);
    }

    return (
        <div className={styles.postCard}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt="Uploaded" className={styles.postImage} />}
        
            <div className={styles.postActions}>
                {isLoggedIn && (
                    <button 
                    className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
                    onClick={handleFavorite}
                >
                    ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
                </button>
                )}
            </div>
        </div>
    );
}

export default PostCard;
