import React, { useState } from "react";

function Filters(){
const [posts, setPosts] = useState([]);
const [filter, setFilter] = useState("all");
const [sortOrder, setSortOrder] = useState("newest");

useEffect(() => {
    const sortedPosts = getDataFromLocalStorage("allPosts") || [];
    setPosts(sortedPosts);
}, []);

const filterdedPosts = posts
        .filter((post) => (filter === "favorites" ? post.isFavorite : true))
        .sort((a, b) => {
            return sortOrder === "newest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date);
        });

return (
    <div className={styles.filters}>
        <div>
        <span 
        className={filter === "all" ? styles.active : ""}
        onClick={() => setFilter("all")}
        >
        All
        </span>
         / 
        <span 
        className={filter === "favorites" ? styles.active : ""}
        onClick={() => setFilter("favorites")}
        >
        Favorites
        </span>  
        </div> 
        <div>
        <span onClick={() => setSortOrder(sortOrder)}>
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
        </span>
        </div>
    </div>
);
}
export default Filters;