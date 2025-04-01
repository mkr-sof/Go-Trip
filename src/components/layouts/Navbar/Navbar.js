import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames"; 
import styles from "./Navbar.module.scss";

const categories = ["Adventure", "Nature", "City Trips", "Beach"];


function Navbar() {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
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
            <Link to="/" className={styles.navItem}>Home</Link>
            <Link to="/profile" className={styles.navItem}>Profile</Link>
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
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;