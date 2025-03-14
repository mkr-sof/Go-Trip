import React from "react";
import UserPanel from "../UserPanel/UserPanel";
import styles from "./Sidebar.module.scss";

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <UserPanel />
        </aside>
    );
}

export default Sidebar;