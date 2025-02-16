import React, { useState } from "react";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "services/storageService";
import styles from "./CreatePost.module.scss";

function CreatePost({onPostCreated}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = (event) => {
        event.preventDefault();
        if(!title && !description) return;

        const user = getDataFromLocalStorage("user");
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

    const allPosts = getDataFromLocalStorage("allPosts") || [];
    const updatedPosts = [newPost, ...allPosts];
    saveDataToLocalStorage("allPosts", updatedPosts);

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