import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "store/modules/postsSlice";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
    }, [dispatch]);
        dispatch(fetchPosts()); 

    return (
        <div className={styles.postsContainer}>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    );
}

export default Posts;
