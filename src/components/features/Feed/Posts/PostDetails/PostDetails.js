import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";
import { toggleFavorite, getFavorites } from "services/favoriteService";
import { getCurrentUser } from "services/authService";
import NotFound from "components/features/NotFound/NotFound";
import styles from "./PostDetails.module.scss";
import { isUserLoggedIn } from "services/authService";

// function PostDetails() {
//     const { postId } = useParams();
//     const navigate = useNavigate();
//     const allPosts = getDataFromLocalStorage("allPosts") || [];
//     const user = isUserLoggedIn();

//     const post = allPosts.find(post => post.id === Number(postId)) || {};
//     const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);

//     useEffect(() => {
//         if (post && Object.keys(post).length > 0) {
//             setIsFavorited(post.isFavorite);
//         }
//     }, [post]);

//     if (!user) return;

//     if (!post || Object.keys(post).length === 0) {
//         return <NotFound />;
//     }

//     const handleFavorite = () => {
//         const updatedFavoriteStatus = !isFavorited;
//         setIsFavorited(updatedFavoriteStatus);

//         const updatedPosts = allPosts.map(p => {
//             if (p.id === post.id) {
//                 return { ...p, isFavorite: updatedFavoriteStatus };
//             }
//             return p;
//         });
//         saveDataToLocalStorage("allPosts", updatedPosts);
//     };

//     const handleAuthorClick = () => {
//         navigate(`/profile/${post.authorId}`);
//     };

//     return (
//         <div className={styles.postContainer}>
//             <h2 className={styles.postTitle}>{post.title}</h2>
//             <p className={styles.postDescrition}>{post.description}</p>
//             <span 
//             className={styles.postAuthor}
//             onClick={handleAuthorClick}
//             >
//                 {post.authorName}
//             </span>
//             {post.image && <img className={styles.postImage} src={post.image} alt="Post" />}
//             <div className={styles.postActions}>
//             {user && (
//                 <button 
//                     className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
//                     onClick={handleFavorite}
//                 >
//                     ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
//                 </button>
//             )}
//             </div>
//         </div>
//     );
// }

// export default PostDetails;

function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const allPosts = getDataFromLocalStorage("allPosts") || [];
        const foundPost = allPosts.find(p => p.id === Number(postId)) || null;
        setPost(foundPost);

        if (foundPost) {
            const favorites = getFavorites();
            setIsFavorited(favorites.includes(foundPost.id));
        }
    }, [postId]);

    const handleFavorite = () => {
        if (!post) return;
        toggleFavorite(post.id);
        setIsFavorited(!isFavorited);
    };

    if (!post) {
        return <p className={styles.error}>Post not found.</p>;
    }

    return (
        <div className={styles.postDetails}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>⬅ Go Back</button>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDescription}>{post.description}</p>
            {post.image && <img src={post.image} alt="Post" className={styles.postImage} />}
            
            <button 
                className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
                onClick={handleFavorite}
            >
                ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
            </button>
        </div>
    );
}

export default PostDetails;