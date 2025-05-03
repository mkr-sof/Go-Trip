import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterPosts, deletePost } from "store/modules/postsSlice";
import NotFound from "components/features/NotFound/NotFound";
import Button from "components/common/Button/Button";
import CreatePost from "components/features/Feed/CreatePost/CreatePost";
import Popup from "components/common/Popup/Popup";
import PostInfo from "components/common/PostInfo/PostInfo";
import styles from "./PostDetails.module.scss";

function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [isEditing, setIsEditing] = useState(false);

    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id.toString() === postId)
    );

    if (!post) {
        return <NotFound />;
    }

    const handleAuthorClick = () => {
        dispatch(filterPosts({ filter: "author", userId: post.authorId, sortOrder: "newest" }));
        navigate(`/profile/${post.authorId}`);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleClosePopup = () => {
        setIsEditing(false);
    };
    const handleDelete = () => {
        dispatch(deletePost(post.id)); 
        navigate(-1);
    };

    return (
        <div className={styles.postContainer}>
        <Button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
            text="Back"
        />

        <PostInfo
            post={post}
            onAuthorClick={handleAuthorClick}
            showFullDescription={true}
        />

        <div className={styles.postActions}>
            {user && user.id === post.authorId && (
                <>
                <Button 
                    className={styles.editButton}
                    onClick={handleEdit}
                    text="Edit"
                />
                <Button 
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    text="Delete"
                />
            </>
            )}
        </div>

            {isEditing && (
                <Popup onClose={handleClosePopup}>
                    <CreatePost
                        onPostCreated={handleClosePopup}
                        onClick={handleClosePopup}
                        initialTitle={post.title}
                        initialDescription={post.description}
                        initialCategory={post.category}
                        initialImage={post.image}
                        initialPostId={post.id}
                        initialCreatedAt={post.created_at}
                        isEditing={true}
                    />
                </Popup>
            )}


        </div>
    );
}

export default PostDetails;
