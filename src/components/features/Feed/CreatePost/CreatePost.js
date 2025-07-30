import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import InputField from "components/common/InputField/InputField";
import Button from "components/common/Button/Button";
import SelectField from "components/common/SelectField/SelectField";
import FileUpload from "components/common/FileUpload/FileUpload";
import Error from "components/common/Error/Error";
import { getCurrentUser, getUsers } from "services/userService";
import { createPost, updatePost } from "store/modules/postsSlice";
import { setUsers, setProfile } from "store/modules/authSlice";
import styles from "./CreatePost.module.scss";

function CreatePost({
    onPostCreated,
    initialTitle,
    initialDescription,
    initialCategory,
    initialImage,
    initialPostId,
    initialCreatedAt,
    isEditing = false,
}) {
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState(initialTitle || "");
    const [description, setDescription] = useState(initialDescription || "");
    const [image, setImage] = useState(initialImage || "");
    const [category, setCategory] = useState(initialCategory || "");

    const dispatch = useDispatch();

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
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required.";
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!category) newErrors.category = "Category is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const user = getCurrentUser();

        const updatedPost = {
            id: isEditing ? initialPostId : uuidv4(),
            authorId: user?.id || "guest",
            authorName: user?.name || "Guest",
            title,
            description,
            category,
            image: image || null,
            created_at: isEditing ? initialCreatedAt : new Date().toISOString(),
            updated_at: new Date().toISOString(),
            isFavorite: false
        }
        let result;
        if (isEditing) {
            result = await dispatch(updatePost(updatedPost));
        } else {
            result = await dispatch(createPost(updatedPost));
        }
        const updatedUser = {
            ...user,
            posts: [...user.posts, updatedPost],
        };

        dispatch(setProfile(updatedUser));
        onPostCreated(result.payload);
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
            <h3>{isEditing ? "Edit Post" : "Create a New Post"}</h3>
            <form className={styles.formContainer} noValidate={true} onSubmit={handleCreatePost}>
                <InputField
                    label="Title"
                    type="text"
                    placeholder=" "
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                        if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                    }}
                />
                {errors.title && <Error message={errors.title} />}
                <InputField
                    label="Description"
                    type="text"
                    placeholder=" "
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                        if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                />
                {errors.description && <Error message={errors.description} />}
                <SelectField
                    label="Category"
                    value={category}
                    onRemoveImage={handleRemoveImage}
                    onChange={(event) => {
                        setCategory(event.target.value);
                        if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
                    }} options={["Adventure", "Nature", "City Trips", "Beach"]}

                />
                {errors.category && <Error message={errors.category} />}
                <FileUpload
                    onRemoveImage={handleRemoveImage}
                    onChange={handleImageUpload}
                    image={image}
                />
                <Button
                    // onClick={onClick} 
                    type="submit"
                    text={isEditing ? "Save" : "Create"}
                    className={styles.authLink}
                />
            </form>
        </div>
    );
}
export default CreatePost;