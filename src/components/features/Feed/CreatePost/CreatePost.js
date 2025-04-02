import React, { useState } from "react";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import SelectField from "components/common/SelectField/SelectField";
import FileUpload from "components/common/FileUpload/FileUpload";
import { getCurrentUser } from "services/userService";
import { createPost } from "services/postService";
import styles from "./CreatePost.module.scss";

function CreatePost({
    onPostCreated, 
    onClick, 
    initialTitle,
    initialDescription,
    initialCategory,
    initialImage,
    isEditing = false,
}){
    const [title, setTitle] = useState(initialTitle ||"");
    const [description, setDescription] = useState(initialDescription || "");
    const [image, setImage] = useState(initialImage ||"");
    const [category, setCategory] = useState(initialCategory || "");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // convert file to Base64
            reader.onloadend = () => {
                setImage(reader.result); // save the Base64 string in state
            };
        }
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        if(!title && !description && !category) return;

        const user = getCurrentUser();
        const newPost = {
            id: Date.now(),
            authorName: user?.name || "Guest", 
            title,
            description,
            category,
            image: image || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            isFavorite: false
        }

    const updatedPosts = await createPost(newPost);
    onPostCreated(updatedPosts);

    setTitle("");
    setDescription("");
    setImage("");
    setCategory("");

    };

    const handleRemoveImage = () => {
        setImage(""); 
    };

    return (
        <div className={styles.createPostContainer}>
            <h3>Create a New Post</h3>
            <form className={styles.formContainer} onSubmit={handleCreatePost}>
                <InputField
                    label="Title"
                    type="text"
                    placeholder=" "
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <InputField
                    label="Description"
                    type="text"
                    placeholder=" "
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <SelectField
                    label="Category"
                    value={category}
                    onRemoveImage={handleRemoveImage}
                    onChange={(event) => setCategory(event.target.value)}
                    options={["Adventure", "Nature", "City Trips", "Beach"]}
                />
                <FileUpload onChange={handleImageUpload} image={image} />
                <Button onClick={onClick} type="submit" text="Create" className={styles.authLink} />
            </form>
        </div>
    );
}
export default CreatePost;