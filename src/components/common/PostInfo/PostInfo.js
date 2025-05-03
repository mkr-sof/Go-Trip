import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { toggleFavorite } from "store/modules/postsSlice";
import { ReactComponent as HeartIcon } from "assets/svgs/heart.svg";
import Description from "components/common/Description/Description";

import styles from "./PostInfo.module.scss";

function PostInfo({ post, onAuthorClick, showFullDescription = false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);

    const handleFavoriteToggle = (e) => {
        e.stopPropagation();
        if (!user) return;
        dispatch(toggleFavorite(post.id));
    };

    return (
        <div className={styles.postInfo}>
            <h2 className={styles.title}>{post.title}</h2>

            {showFullDescription && (
                <Description className={styles.description}>{post.description}</Description>
            )}

            {post.image && (
                <img className={styles.image} src={post.image} alt="Post" />
            )}

            <div className={styles.details}>
                <Description>
                    {post.updated_at && post.updated_at !== post.created_at
                        ? `Updated at ${new Date(post.updated_at).toLocaleDateString()}`
                        : `Created at ${new Date(post.created_at).toLocaleDateString()}`}
                </Description>

                <span className={styles.author} onClick={onAuthorClick}>
                    {post.authorName || "Guest"}
                </span>

                {user && (
                    <button
                        className={classNames(styles.favoriteButton, {
                            [styles.favorited]: isFavorited,
                        })}
                        onClick={handleFavoriteToggle}
                    >
                        <HeartIcon className={styles.heartIcon} />
                        {isFavorited ? "Unfavorite" : "Favorite"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default PostInfo;
