import React from "react";
import classNames from "classnames";
import styles from "./SelectField.module.scss";

function SelectField({ label, value, onChange, options, className }) {
    const selectClassName = classNames(
        styles.select, 
        className
    );
    return (
        <div className={styles.selectContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className={selectClassName}
            >
                <option value="">Choose Your Category</option>
                {options.map((option, idx) => (
                    <option key={idx} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;
