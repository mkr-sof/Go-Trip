import React, { useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from "components/layouts/Header/Header";
import Content from "components/layouts/Content/Content";
import Sidebar from "components/layouts/Sidebar/Sidebar";
import { getDataFromLocalStorage, createTestUsers, createTestPosts, clearLocalStorage } from "services/storageService";
import styles from "./App.module.scss";

function App() {
const location = useLocation();
const hideSidebarRoutes = ["/login", "/signup", "/forgot-password", "/profile/edit"];
const isAuthRoute = hideSidebarRoutes.includes(location.pathname);

useEffect(() => {
  // clearLocalStorage();

  const existingUsers = getDataFromLocalStorage("users");
  if (!existingUsers || existingUsers.length === 0) {
    createTestUsers();
    console.log("Test users created!");
  }

  const existingPosts = getDataFromLocalStorage("allPosts");
    if (!existingPosts || existingPosts.length === 0) {
        createTestPosts();
        console.log("Test posts created!");
    }
}, []);

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
  );
}

export default App;
