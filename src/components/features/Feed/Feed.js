import React, { useState, useEffect, lazy, Suspense } from "react";
import Filters from "components/common/Filters/Filters";
import { getCurrentUser } from "services/authService";
import { getFavorites } from "services/favoriteService";
import { getDataFromLocalStorage } from "services/storageService";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import styles from "./Feed.module.scss";

const Posts = lazy(() => import("components/features/Feed/Posts/Posts"));

function Feed() {

    const currentUser = getCurrentUser();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showScrollUp, setShowScrollUp] = useState(false);
 
    useEffect(() => {
        const allPosts = getDataFromLocalStorage("allPosts") || [];
        setPosts(allPosts);
        setFilteredPosts(allPosts);
    }, []);
    const handleScroll = () => {
        setShowScrollUp(window.scrollY > 300);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const handleFilterChange = (filter, sortOrder) => {
        let filtered = [...posts];
        if (filter === "favorites") {
            const favoriteIds = getFavorites();
            filtered = filtered.filter(post => favoriteIds.includes(post.id));
        }
      filtered.sort((a, b) => {
            return sortOrder === "newest"
                ? new Date(b.created_at) - new Date(a.created_at)
                : new Date(a.created_at) - new Date(b.created_at);
        });
        setFilteredPosts(filtered);
    };

    const handleNewPost = (updatedPosts) => {
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
    };

    return (
        <div className={styles.feedContainer}>
            {currentUser && <CreatePost onPostCreated={handleNewPost} />}
           
            {posts.length > 0 && <Filters onFilterChange={handleFilterChange} />}
            <Suspense fallback={<p>Loading more posts...</p>}>
                {(filteredPosts || []).length > 0
                    ? (<Posts posts={filteredPosts} />)
                    : (<Description >There are no cards in the system yet.</Description>)
                }
            </Suspense>
            {showScrollUp && (
                <Button
                type="button"
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