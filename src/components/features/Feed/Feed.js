
import React, { useState, useEffect, lazy, Suspense } from "react";
import { useScrollPosition } from "hooks/useScrollPosition";
import { useDispatch, useSelector } from "react-redux";
import Filters from "components/common/Filters/Filters";
import Description from "components/common/Description/Description";
import Button from "components/common/Button/Button";
import { filterPosts } from "store/modules/postsSlice";

import styles from "./Feed.module.scss";
// const Posts = lazy(() =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(import("components/features/Feed/Posts/Posts")), 2000);
//   })
// );
const Posts = lazy(() => import("components/features/Feed/Posts/Posts"));

function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);
    const user = useSelector((state) => state.auth.user);
    const sortOrder = useSelector((state) => state.posts.sortOrder);

    const [showScrollUp, setShowScrollUp] = useState(false);
    useScrollPosition((scrollY) => {
        setShowScrollUp(scrollY > 300);
    });

    // useEffect(() => {
    //     const allPosts = getDataFromLocalStorage("allPosts") || [];
    //     dispatch(setPosts(allPosts));
    // }, [dispatch]);

    useEffect(() => {
        if (posts.length > 0) {
            dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
        }
    }, [posts, filter, sortOrder, user?.id]);

    const handleFilterChange = (filter, sortOrder) => {
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };
    return (
        <div className={styles.feedContainer}>
            
            {posts.length > 0 && user && <Filters onFilterChange={handleFilterChange} />}
            <Suspense fallback={<Description>Loading more posts...</Description>}>
                {(filteredPosts || []).length > 0
                    ? (<Posts posts={filteredPosts} />)
                    : (<Description >There are no posts in the system yet.</Description>)
                }
            </Suspense>
            {showScrollUp && (
                <Button
                    className={styles.scrollUp}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    text="Scroll Up"
                >
                </Button>
            )}

            </div>
    );
}

export default Feed;