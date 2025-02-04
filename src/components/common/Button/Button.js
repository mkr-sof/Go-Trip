import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

function Button({disabled, text, onClick, className}) {
    const btnClassName = classNames(
        styles.button, 
        className,
        { [styles.disabled]: disabled }
    );
    return (
        <button 
        type="button" 
        className={btnClassName} 
        onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;