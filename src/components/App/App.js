import React, { useEffect } from "react";
import { Outlet, useLocation } from 'react-router-dom';
import Header from "components/layouts/Header/Header";
import Content from "components/layouts/Content/Content";
import Sidebar from "components/layouts/Sidebar/Sidebar";
import { createTestUsers, createTestPosts, clearLocalStorage } from "services/storageService";
import { getAllPosts } from "services/postService";
import { getUsers } from "services/userService";
import styles from "./App.module.scss";

function App() {
const location = useLocation();
const hideSidebarRoutes = ["/login", "/signup", "/forgot-password", "/profile/edit"];
const isAuthRoute = hideSidebarRoutes.includes(location.pathname);

useEffect(() => {
  // clearLocalStorage();
  const initializeData = async () => {
  const existingUsers = await getUsers();
  if (!existingUsers || existingUsers.length === 0) {
    createTestUsers();
    console.log("Test users created!");
  }

  const existingPosts = await getAllPosts();
  console.log("Existing posts:", existingPosts);
    if (!existingPosts || existingPosts.length === 0) {
        createTestPosts();
        console.log("Test posts created!");
    }
  };
  initializeData();
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
