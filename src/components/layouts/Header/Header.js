import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Logo from "components/common/Logo/Logo";
import Navbar from "components/layouts/Navbar/Navbar";
import Avatar from "components/common/Avatar/Avatar";
import SearchInput from "components/common/SearchInput/SearchInput";
import { setProfile } from "store/modules/authSlice";
import { setPosts, filterPosts } from "store/modules/postsSlice";
import { fetchPosts, resetFilter } from "store/modules/postsSlice";

import styles from "./Header.module.scss";

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const currentFilter = useSelector((state) => state.posts.filter);
    const posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/signup') {
            dispatch(setProfile());
            // dispatch(setPosts(posts));
            dispatch(fetchPosts());
        }
        if (!pathname.includes("/search")) {
            setSearchQuery("");
        }
    }, [pathname, dispatch, posts.length]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            dispatch(resetFilter());
        } else {
            dispatch(filterPosts({
                filter: currentFilter || "all",
                sortOrder: "newest",
                query: query.trim()
            }));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            dispatch(filterPosts({
                filter: currentFilter || "all",
                sortOrder: "newest",
                query: searchQuery.trim()
            }));

            // navigate(`/search?q=${searchQuery.trim()}`);

            // Clear input after navigation
            setSearchQuery("");
        }
    };

    return (
        <div className={classNames(styles.headerContainer)}>
            <div onClick={() =>{ 
                dispatch(resetFilter())
                navigate("/")} }
                className={styles.logo} >
                <Logo />
            </div>

            <div className={styles.navbar}>
                <Navbar />
            </div>

            <div className={styles.rightSection}>
                <SearchInput
                    searchInputValue={searchQuery}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder="Search post..."
                    className={styles.searchInput}
                />
                {user?.avatar && (
                    <div className={styles.avatarContainer}
                        onClick={() => navigate("/profile")}
                    >
                        <Avatar
                            src={user?.avatar}
                            className={styles.avatar}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;