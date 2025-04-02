import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "store/modules/postsSlice";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);

    useEffect(() => {
         dispatch(fetchPosts()); 
    }, [dispatch]);
       
    return (
        <div className={styles.postsContainer}>
            {!(filter === 'all' ? posts : filteredPosts).length ? (
                <p>No posts available</p>
            ) : (
                (filter === 'all' ? posts : filteredPosts).map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    );
}

export default Posts;
