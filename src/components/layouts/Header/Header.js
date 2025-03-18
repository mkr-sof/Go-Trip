import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "components/common/Logo/Logo";
// import Navbar from "components/layouts/Navbar/Navbar";
import classNames from "classnames";
import styles from "./Header.module.scss";

function Header() {
    const navigate = useNavigate(); 
    return(
        <div className={classNames(styles.headerContainer)}>
        <div onClick={() => navigate("/")} className={styles.logo} >
            <Logo />
        </div>
    </div>
    );
}

export default Header;