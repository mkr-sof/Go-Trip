import React from "react";
import styles from "./Posts.module.scss";

function Posts({posts}){
    return (
        <div className={styles.postsContainer}>
            {posts.map((post, index) => (
                <div key={index} className={styles.post}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt="Post" />}
                </div>
            ))}
        </div>
    );
}

export default Posts;