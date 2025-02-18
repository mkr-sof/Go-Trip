import React, { useState } from "react";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import { getDataFromLocalStorage } from "services/storageService";
import { getCurrentUser } from "services/authService";
import { createPost } from "services/postService";
import styles from "./CreatePost.module.scss";

function CreatePost({onPostCreated}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if(file){
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    const handleCreatePost = (event) => {
        event.preventDefault();
        if(!title && !description) return;

        const user = getCurrentUser();
        const newPost = {
            postId: Date.now(),
            authorId: user?.id || "guest",
            title,
            description,
            image: image || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            isFavorite: false
        }

    const updatedPosts = createPost(newPost);
    onPostCreated(updatedPosts);

    setTitle("");
    setDescription("");
    setImage("");

    };

    return(
        <div className={styles.createPostContainer}>
            <h3>Create a New Post</h3>
            <form className={styles.formContainer} onSubmit={handleCreatePost}>
                <InputField
                    className={styles.authInput}
                    label="Title"
                    type="text"
                    placeholder=" "
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <InputField
                    className={styles.authInput}
                    label="Description"
                    type="text"
                    placeholder=" "
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                />
                {image && <img src={image} alt="Preview" className={styles.imagePreview} />}
                <Button 
                type="submit" 
                text="Create"
                className={styles.authLink}
                />
            </form>
        </div>
    );
}
export default CreatePost;