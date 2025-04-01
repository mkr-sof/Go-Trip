// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toggleFavorite, getFavorites } from "services/favoriteService"; 
// import { getCurrentUser } from "services/authService";
// import styles from "./PostCard.module.scss";


// function PostCard({ post, onFavoriteChange }) {
//     const [isFavorited, setIsFavorited] = useState(false);
//     const currentUser = getCurrentUser();
//     const navigate = useNavigate();

//     useEffect(() => {
//         setIsFavorited(getFavorites().includes(post.id));
//     }, [post.id]);

//     const handleFavorite = (e) => {
//         e.stopPropagation(); 
//         if (!currentUser) return; 
//         toggleFavorite(post.id);
//         setIsFavorited(!isFavorited);
//         onFavoriteChange();
//     };
//     const handleCardClick = (e) => {
//         // e.stopPropagation();    
//         navigate(`/post/${post.id}`);
//     };
//     return (
//         <div className={styles.postCard} onClick={handleCardClick}>
//             <h2>{post.title}</h2>
//             <p>{post.description}</p>
//             {post.image && 
//             <img 
//             src={post.image} 
//             alt={post.title} 
//             className={styles.postImage} 
//             // onClick={() => navigate(`/post/${post.id}`)}
//             />}
        
//             <div className={styles.postActions}>
//                 <button 
//                     className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
//                     onClick={handleFavorite}
//                 >
//                     ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default PostCard;


// import React, { useState, useEffect } from "react";
// import styles from "./PostCard.module.scss";
// import { isUserLoggedIn } from "services/authService";
// import { toggleFavorite } from "store/modules/postsSlice";
// import { saveDataToLocalStorage, getDataFromLocalStorage } from "services/storageService";

// function PostCard({ post }) {
//     // const [isFavorited, setIsFavorited] = useState(post.isFavorite || false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         setIsLoggedIn(isUserLoggedIn());
//     }, []);

//     // const handleFavorite = () => {
//     //     const user = isUserLoggedIn();
//     //     if (!user) return;
//     //     if (!isLoggedIn) return;

//     //     const updatedFavoriteStatus = !isFavorited;
//     //     setIsFavorited(updatedFavoriteStatus);

//     //     const allPosts = getDataFromLocalStorage("allPosts") || [];
//     //     const updatedPosts = allPosts.map(p => {
//     //         return p.id === post.id ? {...p, isFavorite:updatedFavoriteStatus} : p;
//     //     })
//     //     saveDataToLocalStorage("allPosts", updatedPosts);
//     // }

//     const handleToggleFavorite = (postId) => {
//         dispatch(toggleFavorite(postId));
//     };

//     return (
//         <div className={styles.postCard}>
//             <h2>{post.title}</h2>
//             <p>{post.description}</p>
//             {post.image && <img src={post.image} alt="Uploaded" className={styles.postImage} />}

//             <div className={styles.postActions}>
//                 {isLoggedIn && (
//                     //     <button 
//                     //     className={`${styles.favoriteButton} ${isFavorited ? styles.favorited : ""}`} 
//                     //     onClick={handleFavorite}
//                     // >
//                     //     ⭐ {isFavorited ? "Unfavorite" : "Favorite"}
//                     // </button>

//                     <button onClick={() => handleToggleFavorite(post.id)}>
//                         {favorites.includes(post.id) ? "❤️ Unfavorite" : "🤍 Favorite"}
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default PostCard;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "store/modules/postsSlice";
import styles from "./PostCard.module.scss";

function PostCard({ post, onAuthorClick }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);

    const handleToggleFavorite = (e) => {
        e.stopPropagation(); 
        dispatch(toggleFavorite(post.id));
    };

    // useEffect(() => {
    //     dispatch(toggleFavorite(favorites))
    // }, [dispatch])

    return (
        <div className={styles.postCard}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post" className={styles.postImage} />}

            <div className={styles.postDetails}>
                <p>
                    <strong>Created by </strong>
                    <span
                        className={styles.authorName}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent navigating to post when clicking author
                            onAuthorClick(post.authorId);
                        }}
                    >
                        {post.authorName || "Guest"}
                    </span>
                </p>
                <p>Created at {new Date(post.created_at).toLocaleDateString()}</p>

                {user && 
                <button className={styles.favoriteButton} onClick={handleToggleFavorite}>
                {isFavorited ? "❤️ Unfavorite" : "🤍 Favorite"}
            </button>}
            </div>
        </div>
    );
}

export default PostCard;
