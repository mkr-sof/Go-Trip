import { saveDataToLocalStorage, removeDataFromLocalStorage } from 'services/storageService';
import { getUsers } from "services/userService";
import { setProfile, setUsers } from "store/modules/authSlice";
import avatar from "assets/avatars/default-avatar.jpg";
import store from "store/configureStore";


export const signupUser = async (userData) => {
    try {
        const { name, email, password } = userData;
        const users = await getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return { success: false, message: "User alredy exists!" };
        }
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            posts: [],
            avatar: avatar,
            isVerified: false,
            rememberMe: false
        };
        saveDataToLocalStorage("users", [...users, newUser]);
        await profile(newUser);
        // console.log(newUser)
        // return { success: true };
        return { success: true, user: newUser };
    } catch (error) {
        return { success: false, message: "Something went wrong!" };
    }
}

export const profile = async (userData, dispatch) => {
    try {
        const { email, password, rememberMe } = userData;
        const users = await getUsers();
        const user = users.find(user => user.email === email);

        if (!user) {
            return { success: false, message: "You are not registered yet!" };
        }

        if (user.password !== password) {
            return { success: false, message: "Invalid email or password" };
        }
        if (rememberMe) {
            saveDataToLocalStorage("profile", user);
        } else {
            sessionStorage.setItem("profile", JSON.stringify(user));
        }
        dispatch(setProfile({ ...user, rememberMe }));
        return { success: true };
    } catch (error) {
        return { success: false, message: "Something went wrong!" }
    }
}

export const resetPassword = async (email, newPassword) => {
    try {
        const users = await getUsers();
        const user = users.find(user => user.email === email);
        if (!user) {
            return { success: false, message: "User with this email does not exist." };
        }
 user.password = newPassword;

    await setUsers(users);

    store.dispatch({
      type: 'auth/updateUserPassword',
      payload: { email, newPassword }
    });

    return { success: true, message: "Password successfully updated." };    } catch (error) {
        return { success: false, message: "Something went wrong!" };
    }
}

export const logoutUser = async () => {
    try {
        removeDataFromLocalStorage("profile");
        sessionStorage.removeItem("profile");
    } catch (error) {
        console.error("Error during logout", error);
    }
}