import React, { useState, useEffect, lazy, Suspense } from "react";
import Filters from "components/common/Filters/Filters";
import { getDataFromLocalStorage } from "services/storageService";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import Welcome from "components/features/Feed/Welcome/Welcome";
import styles from "./Feed.module.scss";

const Posts = lazy(() => import("components/features/Feed/Posts/Posts"));

function Feed({filterdedPosts}){
const [posts, setPosts] = useState([]);
const [filteredPosts, setFilteredPosts] = useState([]);
const [showScrollUp, setShowScrollUp] = useState(false);

useEffect(() => {
    const allPosts = getDataFromLocalStorage("allPosts") || [];
    setPosts(allPosts);
    setFilteredPosts(allPosts);
}, []);

useEffect(() => {
    const handleScroll = () => {
        setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);


const handleFilterChange = (filter, sortOrder, allPosts) =>{
    let filtered = allPosts;
    if(filter === "favorites"){
        filtered = allPosts.filter(post => post.isFavorite);
    }
    const sorted = filtered.sort((a, b) => {
        return sortOrder === "newest"
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
    });
    setFilteredPosts(sorted);
}
    
const handleNewPost = (updatedPosts) => {
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
};
        
return (
    <div className={styles.feedContainer}>
        <Welcome />

        <CreatePost onPostCreated={handleNewPost} />

        {posts.length > 0 && <Filters onFilterChange={handleFilterChange} />}
        <Suspense fallback={<p>Loading more posts...</p>}>
        {(filterdedPosts || []).length > 0
        ? <Posts posts={filteredPosts}/>
        : <Description >There are no cards in the system yet.</Description>
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