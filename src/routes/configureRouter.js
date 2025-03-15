import { createBrowserRouter } from "react-router-dom";
import App from "components/App/App";
import Login from "components/features/Auth/Login";
import Signup from "components/features/Auth/Signup";
import ForgotPassword from "components/features/Auth/ForgotPassword";
import Profile from "components/features/Profile/Profile";
import Feed from "components/features/Feed/Feed";
import NotFound from "components/features/NotFound/NotFound";
import PostCard from "components/features/Feed/Posts/PostCard/PostCard";

function configureRouter() {
    return createBrowserRouter([
        {
            element: <App />,
            children: [
                {
                    // index: true,
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "login",
                    element: <Login />
                },
                {
                    path: "signup",
                    element: <Signup />
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword />
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path: "postCard",
                    element: <PostCard />
                },
                {
                    path: "*",
                    element: <NotFound />
                },
            ]
        }
    ]);
}
export default configureRouter;