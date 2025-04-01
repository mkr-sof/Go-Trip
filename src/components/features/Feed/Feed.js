
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "components/common/Filters/Filters";
import { getDataFromLocalStorage } from "services/storageService";
import { getAllPosts } from "services/postService";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import { setPosts, filterPosts } from "store/modules/postsSlice";

import styles from "./Feed.module.scss";


const Posts = lazy(() => import("components/features/Feed/Posts/Posts"));

function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const user = useSelector((state) => state.auth.user);

    console.log('Posts:', posts);
    console.log('Filtered Posts:', filteredPosts);
    console.log('User:', user);

    const [showScrollUp, setShowScrollUp] = useState(false);

    useEffect(() => {
        const allPosts = getDataFromLocalStorage("allPosts") || [];
        console.log("Fetched posts from local storage:", allPosts); // Debugging log
        dispatch(setPosts(allPosts));
    }, [dispatch]);

    const handleScroll = () => {
        setShowScrollUp(window.scrollY > 300);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleFilterChange = (filter, sortOrder) => {
        console.log("Filter change:", { filter, sortOrder, userId: user?.id }); // Debugging log
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };

    const handleNewPost = (updatedPosts) => {
        dispatch(setPosts(updatedPosts));
    };

    return (
        <div className={styles.feedContainer}>
            {user && <CreatePost onPostCreated={handleNewPost} />}
           
            {posts.length > 0 && <Filters onFilterChange={handleFilterChange} />}
            <Suspense fallback={<p>Loading more posts...</p>}>
                {(filteredPosts || []).length > 0
                    ? (<Posts posts={filteredPosts} />)
                    : (<Description >There are no cards in the system yet.</Description>)
                }
            </Suspense>
            {showScrollUp && (
                <Button
                    className={styles.scrollUp}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    ↑ Scroll Up
                </Button>
            )}
        </div>
    );
}

export default Feed;