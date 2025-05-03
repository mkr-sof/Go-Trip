import { v4 as uuidv4 } from "uuid";
import adventure1 from "../assets/images/adventure/adventure1.jpg";
import adventure2 from "../assets/images/adventure/adventure2.jpg";
import adventure3 from "../assets/images/adventure/adventure3.jpg";
import adventure4 from "../assets/images/adventure/adventure4.jpg";
import nature1 from "../assets/images/nature/nature1.jpg";
import nature2 from "../assets/images/nature/nature2.jpg";
import nature3 from "../assets/images/nature/nature3.jpg";
import nature4 from "../assets/images/nature/nature4.jpg";
import cityTrips1 from "../assets/images/cityTrips/cityTrips1.jpg";
import cityTrips2 from "../assets/images/cityTrips/cityTrips2.jpg";
import cityTrips3 from "../assets/images/cityTrips/cityTrips3.jpg";
import cityTrips4 from "../assets/images/cityTrips/cityTrips4.jpg";
import beach1 from "../assets/images/beach/beach1.jpg";
import beach2 from "../assets/images/beach/beach2.jpg";
import beach3 from "../assets/images/beach/beach3.jpg";
import beach4 from "../assets/images/beach/beach4.jpg";

export const saveDataToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`${key} successfully saved in localStorage`, data);  // Добавим логирование

    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}

export const getDataFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error reading ${key} to localStorage:`, error);
        return null;
    }
}

export const removeDataFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} to localStorage:`, error);
    }
}

export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
}

export const createTestUsers = () => {
    const testUsers = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
            posts: []
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            posts: []
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            posts: []
        }
    ];

    saveDataToLocalStorage("users", testUsers);
    return { users: testUsers };
};


export const createTestPosts = () => {
    const users = getDataFromLocalStorage("users") || [];
    const existingPosts = getDataFromLocalStorage("allPosts") || [];

    if (existingPosts.length > 0) {
        console.log("Test posts already exist.");
        return;
    }

    const categories = ["Adventure", "Nature", "City Trips", "Beach"];
    const sampleDescriptions = [
        "An amazing experience in the wild!",
        "Exploring the beauty of nature.",
        "A fantastic city adventure.",
        "Relaxing by the beach under the sun."
    ];

    const categoryImages = {
        Adventure: [
            adventure1,
            adventure2,
            adventure3,
            adventure4
        ],
        Nature: [
            nature1,
            nature2,
            nature3,
            nature4
        ],
        "City Trips": [
            cityTrips1,
            cityTrips2,
            cityTrips3,
            cityTrips4
        ],
        Beach: [
            beach1,
            beach2,
            beach3,
            beach4
        ]
    };
    const testPosts = users.flatMap(user =>
        categories.map((category, index) => {
            const randomImage = categoryImages[category][Math.floor(Math.random() * 4)];
            const newPost = {
                id: uuidv4(),
                authorId: user.id,
                authorName: user.name,
                title: `Test Post ${index + 1} by ${user.name}`,
                description: sampleDescriptions[index],
                category: category,
                image: randomImage,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                isFavorite: false,
            };
            user.posts = user.posts || [];
            user.posts.push(newPost);

            return newPost;
        })
    );
    saveDataToLocalStorage("users", users);
    saveDataToLocalStorage("allPosts", testPosts);
    console.log("Test posts created!");
    return { posts: testPosts }
};