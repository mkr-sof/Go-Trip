import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "store/modules/postsSlice";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";

function Posts() {
    const dispatch = useDispatch();
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className={styles.postsContainer}>
            {filteredPosts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    );
}

export default Posts;