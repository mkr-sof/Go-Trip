import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "components/common/Popup/Popup";
import Button from "components/common/Button/Button";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
import { setPosts, filterPosts, resetFilter } from "store/modules/postsSlice";
import { getDataFromLocalStorage } from "services/storageService";
import classNames from "classnames";
import styles from "./Navbar.module.scss";

const categories = ["Adventure", "Nature", "City Trips", "Beach"];


function Navbar() {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const filter = useSelector(state => state.posts.filter);
    const sortOrder = useSelector(state => state.posts.sortOrder);
    const user = useSelector(state => state.auth.user);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
    const handleNewPost = (newPost) => {
        const updatedPosts = [newPost, ...posts];
        dispatch(setPosts(updatedPosts));
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className={styles.navbar}>
            <Link to="/" 
            className={styles.navItem} 
            onClick={() => dispatch(resetFilter())}>Home</Link>
            {/* <Link to="/profile" className={styles.navItem}>Profile</Link> */}
            <div className={styles.dropdown} ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className={classNames(styles.navItem, styles.dropdownButton)}
                >
                    Categories
                </button>
                {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                className={styles.dropdownItem}
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            {user && (
                <div className={styles.navItem} onClick={() => setIsCreateOpen(true)}>
                    Create Post
                </div>
            )}

            {isCreateOpen && (
                <Popup isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                    <CreatePost
                        onPostCreated={(newPost) => {
                            setIsCreateOpen(false);
                            handleNewPost(newPost);
                        }}
                    />
                </Popup>
            )}
        </nav>
    );
}

export default Navbar;