import React, { useState, useEffect, lazy, Suspense } from "react";
import Filters from "components/common/Filters/Filters";
import { isUserLoggedIn } from "services/authService";
import { getDataFromLocalStorage } from "services/storageService";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
// import TestCreatePost from "components/features/Feed/CreatePost/TestCreatePost";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
// import Welcome from "components/features/Feed/Welcome/Welcome";
import styles from "./Feed.module.scss";

const Posts = lazy(() => import("components/features/Feed/Posts/Posts"));

function Feed() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [showScrollUp, setShowScrollUp] = useState(false);
    // const [showWelcome, setShowWelcome] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = isUserLoggedIn(); // or get from local storage or context
        setIsLoggedIn(loggedInStatus);
    }, []); // Run once on mount



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


    const handleFilterChange = (filter, sortOrder, allPosts) => {
        let filtered = allPosts;
        if (filter === "favorites") {
            filtered = allPosts.filter(post => post.isFavorite);
        }
        const sorted = filtered.sort((a, b) => {
            return sortOrder === "newest"
                ? new Date(b.created_at) - new Date(a.created_at)
                : new Date(a.created_at) - new Date(b.created_at);
        });
        setFilteredPosts(sorted);
    }

    const handleNewPost = (updatedPosts) => {
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
    };

    // const handleContinueAsGuest = () => {
    //     saveDataToLocalStorage("hasVisited", true);
    //     setShowWelcome(false);
    // };

    // if (showWelcome) {
    //     return <Welcome onContinueAsGuest={handleContinueAsGuest} />;
    // }
    return (
        <div className={styles.feedContainer}>
            {isLoggedIn && <CreatePost onPostCreated={handleNewPost} />}
            {/* {isLoggedIn && <TestCreatePost onPostCreated={handleNewPost} />} */}


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