import React from 'react';

import styles from './Avatar.module.scss'; 

function Avatar({ src, alt, showMoreInfo }) {
    return (
        <img 
            // className={showMoreInfo ? styles.avatarSmall : styles.avatar} 
            className={`${styles.avatar} ${showMoreInfo ? styles.avatarSmall : ""}`} 
            src={src} 
            alt={alt} 
        />
    );
}

export default Avatar;