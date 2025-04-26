import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, searchPosts, resetFilter } from "store/modules/postsSlice";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import styles from "./Posts.module.scss";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // const handleSearch = (event) => {
    //     const query = event.target.value;
    //     setSearchQuery(query);
    //     if (query.trim() === "") {
    //         dispatch(resetFilter());
    //     } else {
    //         dispatch(searchPosts(query));
    //     }
    // };

    return (
        <div className={styles.postsContainer}>
            {/* <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={handleSearch}
                className={styles.searchInput}
            /> */}
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