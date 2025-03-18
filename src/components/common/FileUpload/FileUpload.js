import React from "react";
import styles from "./FileUpload.module.scss";

function FileUpload({ onChange, image }) {
    return (
        <div className={styles.container}>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className={styles.fileInput}
            />
            {image && <img src={image} alt="Preview" className={styles.imagePreview} />}
        </div>
    );
}

export default FileUpload;