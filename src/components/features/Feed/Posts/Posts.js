import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Posts.module.scss";

function Posts({ posts }) {
    const navigate = useNavigate();
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleAuthorClick = (authorId) => {
        navigate(`/profile/${authorId}`);
        const authorPosts = posts.filter(post => post.authorId === authorId);
        setFilteredPosts(authorPosts);
    }

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);
    return (
        <div className={styles.postsContainer}>

            {filteredPosts.length === 0 ? (
                <p>No post available</p>
            ) : (
            filteredPosts.map((post, index) => (
                // console.log(post),
                
                <div 
                    key={index} 
                    className={styles.post} 
                    onClick={() => handlePostClick(post.id)}
                >
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" />}

                    <div className={styles.postDetails}>
                    <p>
                            <strong>Created by </strong> 
                            <span 
                                className={styles.authorName}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent post click when author name is clicked
                                    handleAuthorClick(post.authorId);
                                }}
                            >
                                {post.authorName || "Guest"}
                            </span>
                        </p>
                        <p>Created at {new Date(post.created_at).toLocaleDateString()}</p>
                        <p><strong>Favorite:</strong> {post.isFavorite ? "⭐ Yes" : "❌ No"}</p>
                    </div>
                </div>
            ))
            )}
        </div>
    );
}

export default Posts;