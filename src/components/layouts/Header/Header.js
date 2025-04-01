import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/common/Logo/Logo";
import Navbar from "components/layouts/Navbar/Navbar";
import Avatar from "components/common/Avatar/Avatar";
import SearchInput from "components/common/SearchInput/SearchInput"
import classNames from "classnames";
import { loginUser } from "services/authService"
import styles from "./Header.module.scss";

function Header() {
    const navigate = useNavigate(); 
    const [searchQuery, setSearchQuery] = useState("");

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
                    <div className={styles.avatarContainer}>
                        <Avatar className={styles.avatar} />
                    </div>
                )}
        </div>
    </div>
    );
}

export default Header;