import { saveDataToLocalStorage, getDataFromLocalStorage } from 'services/storageService';

export const createPost = async (post) => {
    const allPosts = await getDataFromLocalStorage("allPosts") || [];
    console.log("allPosts before:", allPosts);
    const updatedPosts = [...allPosts, post];
    console.log("allPosts after:", updatedPosts);
    saveDataToLocalStorage("allPosts", updatedPosts);

    const users = await getDataFromLocalStorage("users") || [];
    console.log("users before:", users);
    const updatedUsers = users.map(user => {
        if (user.id === post.authorId) {
            const updatedUserPosts = [...(user.posts || []), post];
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    console.log("users after:", updatedUsers);
    saveDataToLocalStorage("users", updatedUsers);
    return { updatedPosts, updatedUsers };
}

export const getAllPosts = async () => {
    return await getDataFromLocalStorage("allPosts") || [];
}


// export const updatePost = async (postId, updatedData) => {
//     let allPosts = await getDataFromLocalStorage("allPosts") || [];
//     allPosts = allPosts.map(post => 
//         post.id === postId ? {...post, ...updatedData} : post
//     )
//     saveDataToLocalStorage("allPosts", allPosts);
// }

export const updatePost = async (postId, updatedData) => {

    let allPosts = await getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.map(post =>
        post.id === postId ? { ...post, ...updatedData, updated_at: new Date().toISOString() } : post
    );
    saveDataToLocalStorage("allPosts", allPosts);

    
    let users = await getDataFromLocalStorage("users") || [];
    const updatedUsers = users.map(user => {
        if (user.posts) {
            const updatedUserPosts = user.posts.map(post =>
                post.id === postId ? { ...post, ...updatedData, updated_at: new Date().toISOString() } : post
            );
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    saveDataToLocalStorage("users", updatedUsers);
}


// export const removePost = async (postId) => {
//     let allPosts = await getDataFromLocalStorage("allPosts") || [];
//     allPosts = allPosts.filter(post => post.id !== postId);
//     saveDataToLocalStorage("allPosts", allPosts);
//     return allPosts;
// }

export const removePost = async (postId) => {

    let allPosts = await getDataFromLocalStorage("allPosts") || [];
    allPosts = allPosts.filter(post => post.id !== postId);
    saveDataToLocalStorage("allPosts", allPosts);

    let users = await getDataFromLocalStorage("users") || [];
    const updatedUsers = users.map(user => {
        if (user.posts) {
            const updatedUserPosts = user.posts.filter(post => post.id !== postId);
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    saveDataToLocalStorage("users", updatedUsers);

    return { allPosts, updatedUsers };
}