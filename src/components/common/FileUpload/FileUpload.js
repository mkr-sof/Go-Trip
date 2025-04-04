import React, { useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "assets/svgs/close.svg";
import { ReactComponent as UploadIcon } from "assets/svgs/upload.svg";
import styles from "./FileUpload.module.scss";

function FileUpload({ onChange, image, onRemoveImage }) {
    const fileInputRef = useRef();
    // const [image, setImage] = useState(null);
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleRemoveImage = () => {
        console.log('Removing image...');
        onRemoveImage();
      };
    return (
        <div className={styles.container}>
            {!image && (
                <div className={styles.uploadButton} onClick={handleClick}>
                    <UploadIcon className={styles.uploadIcon} />
            </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={onChange} 
                ref={fileInputRef}
                className={styles.fileInput}
            />
             {image && (
                <div className={styles.imagePreviewContainer}>
                    <img src={image} alt="Preview" className={styles.imagePreview} />
                    <CloseIcon className={styles.closeIcon} onClick={handleRemoveImage}/>
                </div>
            )}
        </div>
    );
}

export default FileUpload;