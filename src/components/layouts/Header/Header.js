import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "components/common/Logo/Logo";
import Navbar from "components/layouts/Navbar/Navbar";
import Avatar from "components/common/Avatar/Avatar";
import SearchInput from "components/common/SearchInput/SearchInput"
import { loginUser } from "services/authService";
import { getDataFromLocalStorage } from "services/storageService";
import { setProfile } from "store/modules/authSlice";
import { setPosts } from "store/modules/postsSlice";
import classNames from "classnames";
import styles from "./Header.module.scss";


function Header() {
    const {pathname} = useLocation();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (pathname !== '/login' && pathname !== '/signup') {
            dispatch(setProfile());
            const allPosts = getDataFromLocalStorage("allPosts") || [];
            dispatch(setPosts(allPosts));
        }
    }, [pathname]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
///////////////////////////////////////////////
//complite the serch logic get posts and find by title
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${searchQuery.trim()}`);
        }
    };

    return(
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
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search post..."
                    className={styles.searchInput} 
                />
                {loginUser && (
                    <div className={styles.avatarContainer}
                    onClick={() => navigate("/profile")}
                    >
                        <Avatar className={styles.avatar} />
                    </div>
                )}
        </div>
    </div>
    );
}

export default Header;