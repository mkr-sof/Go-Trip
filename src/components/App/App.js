import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUsers } from "../../store/modules/authSlice";
import { setPosts } from "../../store/modules/postsSlice";
import Header from "components/layouts/Header/Header";
import Content from "components/layouts/Content/Content";
import Sidebar from "components/layouts/Sidebar/Sidebar";
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
import { createTestUsers, createTestPosts, clearLocalStorage } from "services/storageService";
import { getAllPosts } from "services/postService";
import { getUsers } from "services/userService";
import styles from "./App.module.scss";

function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/signup", "/forgot-password", "/profile/edit"];
  const isAuthRoute = hideSidebarRoutes.includes(location.pathname);
  const dispatch = useDispatch()
  useEffect(() => {
    // clearLocalStorage();
    const initializeData = async () => {
      const existingUsers = await getUsers();
      if (!existingUsers || existingUsers.length === 0) {
        const { users } = createTestUsers();
        dispatch(setUsers(users));
        console.log("Test users created!");
      } else {
        dispatch(setUsers(existingUsers));
      }

      const existingPosts = await getAllPosts();
      console.log("Existing posts:", existingPosts);

      if (!existingPosts || existingPosts.length === 0) {
        const { posts } = createTestPosts();
        console.log("Test posts created!");
        dispatch(setPosts(posts));
      } else {
        dispatch(setPosts(existingPosts));
      }
    };
    initializeData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        {!isAuthRoute && <Sidebar />}
        <div className={isAuthRoute ? styles.authContainer : styles.mainContent}>
          <Content className={styles.content} >
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Content>
        </div>
      </div>
    </div>
  );
}

export default App;
