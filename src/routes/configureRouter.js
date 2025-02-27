import { createBrowserRouter } from "react-router-dom";
import App from "components/App/App";
import Login from "components/features/Auth/Login";
import TestLogin from "components/features/Auth/TestLogin";
import Signup from "components/features/Auth/Signup";
import TestSignup from "components/features/Auth/TestSignup";
import ForgotPassword from "components/features/Auth/ForgotPassword";
import Profile from "components/features/Profile/Profile";
import Feed from "components/features/Feed/Feed";
import NotFound from "components/features/NotFound/NotFound";

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
                    // element: <TestLogin />
                    element: <Login />
                },
                {
                    path: "signup",
                    // element: <TestSignup />
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
                    path: "*",
                    element: <NotFound />
                },
            ]
        }
    ]);
}
export default configureRouter;