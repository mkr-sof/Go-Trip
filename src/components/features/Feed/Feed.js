import React, { useState, useEffect } from "react";
import Posts from "components/features/Feed/Posts/Posts";
import Filters from "components/common/Filters/Filters";
import { getDataFromLocalStorage } from "services/storageService";
import styles from "./Feed.module.scss";

function Feed(){
const [posts, setPosts] = useState([]);
const [showScrollUp, setShowScrollUp] = useState(false);



useEffect(() => {
    const handleScroll = () => {
        setShowScrollUp(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
    <div className={styles.feedContainer}>
        <Welcome />
        {posts.length > 0 && <Filters />}
        {posts}
    </div>
);
}

export default Feed;