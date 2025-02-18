import React from "react";
import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "components/features/Auth/Login";
// import Signup from "components/features/Auth/Signup";
// import ForgotPassword from "components/features/Auth/ForgotPassword";
// import Feed from "components/features/Feed/Feed";
// import Profile from "components/features/Profile/Profile";
import Header from "components/layouts/Header/Header";
import Content from "components/layouts/Content/Content";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Content className={styles.content} >
        <Outlet />
      </Content>
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
