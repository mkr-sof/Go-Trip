import React from "react";
import { Outlet, useLocation } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "components/features/Auth/Login";
// import Signup from "components/features/Auth/Signup";
// import ForgotPassword from "components/features/Auth/ForgotPassword";
// import Feed from "components/features/Feed/Feed";
// import Profile from "components/features/Profile/Profile";
import Header from "components/layouts/Header/Header";
import Content from "components/layouts/Content/Content";
import Sidebar from "components/layouts/Sidebar/Sidebar";
import styles from "./App.module.scss";

function App() {
const location = useLocation();
const hideSidebarRoutes = ["/login", "/signup", "/forgot-password"];
const isAuthRoute = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        {!isAuthRoute && <Sidebar />}
        <div className={isAuthRoute ? styles.authContainer : styles.mainContent}>
      <Content className={styles.content} >
        <Outlet />
      </Content>
      </div>
      </div>
    </div>
  // <Router>
      // <Routes>
      //   <Route path="/" element={<Feed />} />
      //   <Route path="/login" element={<Login />} />
      //   <Route path="/signup" element={<Signup />} />
      //   <Route path="/forgot-password" element={<ForgotPassword />} />
      //   <Route path="/profile" element={<Profile />} />
      // </Routes>
  //  </Router> 
  );
}

export default App;
