import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";

import NotFound from "components/features/NotFound/NotFound";
import styles from "./PostDetails.module.scss";
import { isUserLoggedIn } from "services/authService";

function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const allPosts = getDataFromLocalStorage("allPosts") || [];
    const post = allPosts.find(post => post.id.toString() === postId);
    const user = isUserLoggedIn();
    const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);
    const handleFavorite = () => {

        if (!user) return;
        const updatedFavoriteStatus = !isFavorited;
        setIsFavorited(updatedFavoriteStatus);

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

    const handleAuthorClick = () => {
        navigate(`/profile/${post.authorId}`);
    };
    
    if (!post){
       return <NotFound />;
    }

    return (
        <div className={styles.postContainer}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDescrition}>{post.description}</p>
            <span 
            className={styles.postAuthor}
            onClick={handleAuthorClick}
            >
                {post.authorName}
            </span>
            {post.image && <img className={styles.postImage} src={post.image} alt="Post" />}
            <div className={styles.postActions}>
            {user && (
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

export default PostDetails;