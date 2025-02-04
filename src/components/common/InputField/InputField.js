import React from "react";
import styles from "./InputField.module.scss";

function InputField({input, placeholder, className, value, onChange}){
    return(
        <input
            type={input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            required
        />
    );
}

export default InputField;