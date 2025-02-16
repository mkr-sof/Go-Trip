import React from "react";
import classNames from "classnames";
import styles from "./description.module.scss";

function Description({ children, className }) {
    return (
        <p className={classNames(styles.description, className)}>
            {children}
        </p>
    );
}

export default Description;