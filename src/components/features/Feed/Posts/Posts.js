import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Posts.module.scss";

function Posts({ posts }) {
    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className={styles.postsContainer}>
            {posts.map((post, index) => (
                <div 
                    key={index} 
                    className={styles.post} 
                    onClick={() => handlePostClick(post.id)}
                >
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" />}
                </div>
            ))}
        </div>
    );
}

export default Posts;