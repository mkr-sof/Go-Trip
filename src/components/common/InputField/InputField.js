import React from "react";
import classNames from "classnames";
import styles from "./InputField.module.scss";


function InputField({label, name, type, placeholder, className, value, onChange, onBlur}){
    const inputClassName = classNames(
        styles.inputField, 
        className
    );
    return(
        <div className={styles.inputContainer}>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={inputClassName}
                autoComplete="off"
                placeholder={placeholder}
                required
            />
            {label && <label htmlFor={name} className={styles.inputLabel}>{label}</label>}
        </div>
    );
}

export default InputField;