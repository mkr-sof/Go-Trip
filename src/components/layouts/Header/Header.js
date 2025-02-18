import React from "react";
import Logo from "components/common/Logo/Logo";
// import Navbar from "components/layouts/Navbar/Navbar";
import classNames from "classnames";
import styles from "./Header.module.scss";

function Header() {
   
    return(
        <div className={classNames(styles.header)}>
            <Logo className={styles.logo} />
            {/* <Navbar /> */}
        </div>
    );
}

export default Header;