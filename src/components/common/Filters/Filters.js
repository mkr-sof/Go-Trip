import React, { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "services/storageService";
import styles from "./Filters.module.scss"

function Filters({ onFilterChange }) {
    const [filter, setFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        const storedPosts = getDataFromLocalStorage("allPosts") || [];
        onFilterChange(filter, sortOrder, storedPosts);
    }, [filter, sortOrder]);

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