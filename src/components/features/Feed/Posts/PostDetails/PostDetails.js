import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "store/modules/postsSlice";
import NotFound from "components/features/NotFound/NotFound";
import styles from "./PostDetails.module.scss";

function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id.toString() === postId)
    );

    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post?.id);

    if (!post) {
        return <NotFound />;
    }

    const handleFavorite = () => {
        if (!user) return;
        dispatch(toggleFavorite(post.id));
    };

    const handleAuthorClick = () => {
        navigate(`/profile/${post.authorId}`);
    };

    return (
        <div className={styles.postContainer}>

            <button className={styles.backButton} onClick={() => navigate(-1)}>⬅ Go Back</button>
            
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDescription}>{post.description}</p>
            <span className={styles.postAuthor} onClick={handleAuthorClick}>
                {post.authorName}
            </span>
            {post.image && (
                <img className={styles.postImage} src={post.image} alt="Post" />
            )}
            <div className={styles.postActions}>
                {user && (
                    <button
                        className={`${styles.favoriteButton} ${
                            isFavorited ? styles.favorited : ""
                        }`}
                        onClick={handleFavorite}
                    >
                        {isFavorited ? "❤️ Unfavorite" : "🤍 Favorite"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default PostDetails;
