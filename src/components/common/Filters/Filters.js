

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterPosts } from "store/modules/postsSlice";
import styles from "./Filters.module.scss";

function Filters() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.posts.filter); // Assuming `filter` is part of the posts slice
    const sortOrder = useSelector((state) => state.posts.sortOrder); // Assuming `sortOrder` is part of the posts slice

    const handleFilterChange = (newFilter) => {
        dispatch(filterPosts({ filter: newFilter, sortOrder }));
    };

    const handleSortOrderChange = (newSortOrder) => {
        dispatch(filterPosts({ filter, sortOrder: newSortOrder }));
    };

    return (
        <div className={styles.filters}>
            <div>
                <span
                    className={filter === "all" ? styles.active : ""}
                    onClick={() => handleFilterChange("all")}
                >
                    All
                </span>
                /
                <span
                    className={filter === "favorites" ? styles.active : ""}
                    onClick={() => handleFilterChange("favorites")}
                >
                    Favorites
                </span>
            </div>
            <div>
                <span
                    className={sortOrder === "oldest" ? styles.active : ""}
                    onClick={() => handleSortOrderChange("oldest")}
                >
                    Oldest First
                </span>
                /
                <span
                    className={sortOrder === "newest" ? styles.active : ""}
                    onClick={() => handleSortOrderChange("newest")}
                >
                    Newest First
                </span>
            </div>
        </div>
    );
}

export default Filters;