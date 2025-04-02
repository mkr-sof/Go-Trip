import React from "react";
import { ReactComponent as CloseIcon } from "assets/svgs/close.svg";
import styles from "./FileUpload.module.scss";

function FileUpload({ onChange, image, onRemoveImage }) {
    return (
        <div className={styles.container}>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                className={styles.fileInput}
            />
             {image && (
                <div className={styles.imagePreviewContainer}>
                    <img src={image} alt="Preview" className={styles.imagePreview} />
                    <CloseIcon className={styles.closeIcon} onClick={onRemoveImage}/>
                </div>
            )}
        </div>
    );
}

export default FileUpload;