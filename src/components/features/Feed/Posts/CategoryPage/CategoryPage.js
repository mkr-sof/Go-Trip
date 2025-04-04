import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Posts from "components/features/Feed/Posts/Posts";
import Description from "components/common/Description/Description";
import { filterPosts } from "store/modules/postsSlice"; 
import styles from "./CategoryPage.module.scss";

function CategoryPage() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.filteredPosts);
  const { filter, sortOrder, userId } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(filterPosts({ filter, sortOrder, userId, category: categoryName }));
  }, [categoryName, dispatch, filter, sortOrder, userId]);

  return (
    <div className={styles.categortyPage}>
      <h2>Category: {categoryName.replace(/-/g, " ")}</h2>
      {posts.length > 0 ? (
        <Posts posts={posts} />
      ) : (
        <Description>There are no posts in this category.</Description>
      )}
    </div>
  );
}

export default CategoryPage;