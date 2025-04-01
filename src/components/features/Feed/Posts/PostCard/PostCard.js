import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "store/modules/postsSlice";
import styles from "./PostCard.module.scss";

function PostCard({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);

    const handleToggleFavorite = (e) => {
        e.stopPropagation(); 
        dispatch(toggleFavorite(post.id));
    };

    const handleAuthorClick = () => {
        navigate(`/profile/${post.authorId}`);
    };
    const handleCardClick = (e) => {
        e.stopPropagation();
        navigate(`/post/${post.id}`);
    };
    return (
        <div className={styles.postCard}
        onClick={handleCardClick}
        >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className={styles.postImage} />}

            <div className={styles.postDetails}>
                <p>
                    <strong>Created by </strong>
                    <span
                        className={styles.authorName}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent navigating to post when clicking author
                            handleAuthorClick(post.authorId);
                        }}
                    >
                        {post.authorName || "Guest"}
                    </span>
                </p>
                <p>Created at {new Date(post.created_at).toLocaleDateString()}</p>

                {user && 
                <button className={styles.favoriteButton} onClick={handleToggleFavorite}>
                {isFavorited ? "❤️ Unfavorite" : "🤍 Favorite"}
            </button>}
            </div>
        </div>
    );
}

export default PostCard;
