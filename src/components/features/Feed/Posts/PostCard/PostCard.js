import React from "react";
import { useNavigate } from "react-router-dom";
import PostInfo from "components/common/PostInfo/PostInfo"; 
import styles from "./PostCard.module.scss";

function PostCard({ post }) {
    const navigate = useNavigate();

    const handleAuthorClick = () => {
        navigate(`/profile/${post.authorId}`);
    };

    const handleCardClick = (e) => {
        e.stopPropagation();
        navigate(`/post/${post.id}`);
    };

    return (
        <div className={styles.postCard} onClick={handleCardClick}>
            <PostInfo
                post={post}
                onAuthorClick={(e) => {
                    e.stopPropagation();
                    handleAuthorClick(post.authorId);
                }}
            />
        </div>
    );
}

export default PostCard;
