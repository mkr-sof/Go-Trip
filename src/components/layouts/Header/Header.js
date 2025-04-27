import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "components/common/Logo/Logo";
import Navbar from "components/layouts/Navbar/Navbar";
import Avatar from "components/common/Avatar/Avatar";
import SearchInput from "components/common/SearchInput/SearchInput"
import { getDataFromLocalStorage } from "services/storageService";
import { uploadAvatar } from "services/userService";
import { setProfile, setAvatar } from "store/modules/authSlice";
import { setPosts, filterPosts } from "store/modules/postsSlice";
import { fetchPosts, searchPosts, resetFilter } from "store/modules/postsSlice";
import classNames from "classnames";
import styles from "./Header.module.scss";

function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    // const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
    const posts = useSelector((state) => state.posts.posts); 
    const user = useSelector((state) => state.auth.user);
console.log("avatar", user?.avatar);


    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/signup') {
            dispatch(setProfile());
            const allPosts = getDataFromLocalStorage("allPosts") || [];
            dispatch(setPosts(allPosts));
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
            dispatch(searchPosts(query));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            const matchingPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
    
            if (matchingPosts.length === 1) {
                navigate(`/post/${matchingPosts[0].id}`);
            } else {
                dispatch(filterPosts({
                    filter: "search",
                    filter: "all",
                    sortOrder: "newest",
                    query: searchQuery.trim()
                }));
                navigate(`/search?q=${searchQuery.trim()}`);
            }
        }
    };

    const handleAvatarChange = (event) => {
      
    };
    const handleAvatarDelete = () => {
       
    };

    return (
        <div className={classNames(styles.headerContainer)}>
            <div onClick={() => navigate("/")} className={styles.logo} >
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