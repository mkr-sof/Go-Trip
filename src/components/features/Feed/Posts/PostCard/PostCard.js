import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleFavorite, getFavorites } from "services/favoriteService"; 
import { getCurrentUser } from "services/authService";
import styles from "./PostCard.module.scss";


function PostCard({ post, onFavoriteChange }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        setIsFavorited(getFavorites().includes(post.id));
    }, [post.id]);

    const handleFavorite = (e) => {
        e.stopPropagation(); 
        if (!currentUser) return; 
        toggleFavorite(post.id);
        setIsFavorited(!isFavorited);
        onFavoriteChange();
    };
    const handleCardClick = (e) => {
        // e.stopPropagation();    
        navigate(`/post/${post.id}`);
    };
    return (
        <div className={styles.postCard} onClick={handleCardClick}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image && 
            <img 
            src={post.image} 
            alt={post.title} 
            className={styles.postImage} 
            // onClick={() => navigate(`/post/${post.id}`)}
            />}
        
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