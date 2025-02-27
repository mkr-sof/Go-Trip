import React from 'react';
import { createPost } from 'services/postService';
import { getCurrentUser } from 'services/authService';

function TestCreatePost() {
    const handleClick = async () => {
        const user = getCurrentUser();

        const testPost = {
            id: Date.now(),
            title: "Test Post",
            description: "This is a test post",
            image: "",
            authorId: user?.id || "guest",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            isFavorite: false
        };

        console.log("Attempting to create post:", testPost);
        const updatedPosts = await createPost(testPost);
        console.log("Test Create Post Response:", updatedPosts);

        console.log("Posts in local storage:", JSON.parse(localStorage.getItem("posts")));
    };

    return (
        <div>
            <h2>Test Create Post</h2>
            <button onClick={handleClick}>Test Create Post</button>
        </div>
    );
}

export default TestCreatePost;
