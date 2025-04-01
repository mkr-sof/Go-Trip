// import React, { useState, useEffect } from "react";
// import { getDataFromLocalStorage } from "services/storageService";
// import { getFavorites } from "services/favoriteService";
// import styles from "./Filters.module.scss"

// function Filters({ onFilterChange }) {
//     const [filter, setFilter] = useState("all");
//     const [sortOrder, setSortOrder] = useState("newest");

//     const handleFilterChange = (newFilter) => {
//         setFilter(newFilter);
//         onFilterChange(newFilter, sortOrder);
//     };

//     const handleSortChange = (newSortOrder) => {
//         setSortOrder(newSortOrder);
//         onFilterChange(filter, newSortOrder);
//     };

//     return (
//         <div className={styles.filters}>
//             <div>
//                 <span
//                     className={filter === "all" ? styles.active : ""}
//                     onClick={() => handleFilterChange("all")}
//                 >
//                     All
//                 </span>
//                 /
//                 <span
//                     className={filter === "favorites" ? styles.active : ""}
//                     onClick={() => handleFilterChange("favorites")}
//                 >
//                     Favorites
//                 </span>
//             </div>
//             <div>
//                 <span
//                     className={sortOrder === "oldest" ? styles.active : ""}
//                     onClick={() => handleSortChange("oldest")}
//                 >
//                     Oldest First
//                 </span>
//                 /
//                 <span
//                     className={sortOrder === "newest" ? styles.active : ""}
//                     onClick={() => handleSortChange("newest")}
//                 >
//                     Newest First
//                 </span>
//                 {/* <span onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}>
//                     {sortOrder === "newest" ? "Oldest First" : "Newest First"}
//                 </span> */}
//             </div>
//         </div>
//     );
// }
// export default Filters;

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