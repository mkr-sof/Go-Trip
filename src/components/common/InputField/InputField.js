import React from "react";
import classNames from "classnames";
import styles from "./InputField.module.scss";

function InputField({label, type, placeholder, className, value, onChange}){
    return(
        <div className={styles.inputContainer}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={classNames(styles.inputField, className)}
                placeholder={placeholder}
                required
            />
            {label && <label className={styles.inputLabel}>{label}</label>}
        </div>
    );
}

export default InputField;