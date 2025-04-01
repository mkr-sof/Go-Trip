import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";

function Posts() {
    const navigate = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    const favorites = useSelector((state) => state.posts.favorites);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleAuthorClick = (authorId) => {
        const authorPosts = posts.filter((post) => post.authorId === authorId);
        setFilteredPosts(authorPosts);
    };

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    return (
        <div className={styles.postsContainer}>
            {filteredPosts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className={styles.post}
                        onClick={() => handlePostClick(post.id)}
                    >
                        <PostCard
                            post={post}
                            onAuthorClick={handleAuthorClick}
                            favorites={favorites}
                        />
                    </div>
                ))
            )}
        </div>
    );
}

export default Posts;
