import React, { useState } from "react";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";
import styles from "./PostCard.module.scss";

function PostCard({ post }) {
    const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);
    const handleFavorite = () => {
        const updatedFavoriteStatus = !isFavorited;
        setIsFavorited(!isFavorited);

        const allPosts = getDataFromLocalStorage("allPosts") || [];
        console.log(allPosts);
        const updatedPosts = allPosts.map(p => {
            if(p.id === post.id){
                return {...p, isFavorite: updatedFavoriteStatus};
            }
            return p;
        });
        saveDataToLocalStorage("allPosts", updatedPosts);
    };

    return (
        <div className={styles.postCard}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt="Post" className={styles.postImage} />}
        
            <div className={styles.postActions}>
                <button 
                    className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
                    onClick={handleFavorite}
                >
                    ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
                </button>
            </div>
        </div>
    );
}

export default PostCard;
