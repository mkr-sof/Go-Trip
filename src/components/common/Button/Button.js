import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

function Button({disabled, text, onClick, className, type = 'button'}) {
    const btnClassName = classNames(
        styles.button, 
        className,
        { [styles.disabled]: disabled }
    );
    return (
        <button 
        type={type}
        className={btnClassName} 
        onClick={onClick}
        disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;