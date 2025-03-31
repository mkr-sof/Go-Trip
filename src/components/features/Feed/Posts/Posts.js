import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";


function Posts({ posts }) {
    const navigate = useNavigate();
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts]);

    const handleFavoriteChange = () => {
        setFilteredPosts([...posts]); 
    };
    // const handlePostClick = (postId) => {
    //     navigate(`/post/${postId}`);
    // };
    return (
        <div className={styles.postsContainer}>
            {filteredPosts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                filteredPosts.map((post) => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        onFavoriteChange={handleFavoriteChange}
                        // onClick={() => handlePostClick(post.id)}  
                    />
                ))
            )}
        </div>
    );
}

export default Posts;