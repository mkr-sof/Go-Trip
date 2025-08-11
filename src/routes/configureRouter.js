import { createBrowserRouter } from "react-router-dom";
import App from "components/App/App";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import Login from "components/features/Auth/Login";
import Signup from "components/features/Auth/Signup";
import ForgotPassword from "components/features/Auth/ForgotPassword";
import Profile from "components/features/Profile/Profile";
import Feed from "components/features/Feed/Feed";
import NotFound from "components/features/NotFound/NotFound";
import PostDetails from "components/features/Feed/Posts/PostDetails/PostDetails";
import CategoryPage from "components/features/Feed/Posts/CategoryPage/CategoryPage";

function configureRouter() {
    return createBrowserRouter(
        [
            {
                element: (
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                ),
                children: [
                    {
                        index: true,
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
                        path: "profile/edit",
                        element: <Profile />
                    },
                    {
                        path: "profile/:userId",
                        element: <Profile />
                    },
                    {
                        path: "post/:postId",
                        element: <PostDetails />
                    },
                    {
                        path: "category/:categoryName",
                        element: <CategoryPage />
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    },
                ]
            }
        ],
        {
            basename: "/Go-Trip",
        });
}
export default configureRouter;