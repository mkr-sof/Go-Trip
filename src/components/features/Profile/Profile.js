
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";
import EditProfile from "components/features/Profile/EditProfile/EditProfile";
import Description from "components/common/Description/Description";
import styles from "./Profile.module.scss";

function Profile() {
    const location = useLocation();
    const { userId } = useParams();

    const profile = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.posts.posts);
    const allUsers = useSelector((state) => state.auth.users);

    const isEditing = location.pathname === "/profile/edit";

    const profileUser = userId
        ? allUsers.find(user => user.id === Number(userId))
        : profile;


    if (!profileUser) {
        return <p>Loading...</p>;
    }
    const filteredPosts = posts.filter(post => +post.authorId === profileUser.id);


    return (
        <div className={styles.profileContainer}>
            {isEditing ? (
                <EditProfile />
            ) : (
                <>
                    <h2>{profileUser.name}'s Profile</h2>
                    <Description>{profileUser.name}'s Posts</Description>
                    {filteredPosts.length > 0 ? ( // Use local state here
                        filteredPosts.map(post => <PostCard key={post.id} post={post} />)
                    ) : (
                        <p>No posts found</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;