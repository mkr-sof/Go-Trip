import postsReducer, { createPost } from "store/modules/postsSlice";

describe("postsSlice - createPost", () => {
  const initialState = {
    posts: [],
    users: [
      {
        id: "user1",
        name: "Alice",
        posts: [
          { id: "post1", title: "Old Post", authorId: "user1" }
        ]
      },
      {
        id: "user2",
        name: "Bob",
        posts: []
      }
    ],
    filteredPosts: [],
    favorites: [],
    showScrollUp: false,
    filter: "all",
    sortOrder: "newest",
  };

  it("should add a new post and update the user's posts", () => {
    const newPost = {
      id: "post2",
      title: "New Post",
      authorId: "user1"
    };

    const state = postsReducer(initialState, createPost(newPost));

    // 1. Check if post added to state.posts
    expect(state.posts[0]).toEqual(newPost);

    // 2. Check if author’s posts array is updated
    const updatedUser = state.users.find(u => u.id === "user1");
    expect(updatedUser.posts).toContainEqual(newPost);
    expect(updatedUser.posts.length).toBe(2);

    // 3. Check if other users remain unchanged
    const untouchedUser = state.users.find(u => u.id === "user2");
    expect(untouchedUser.posts.length).toBe(0);
  });

  it("should initialize posts array if undefined", () => {
    const newInitialState = {
      ...initialState,
      users: [{ id: "user3", name: "New User" }]
    };

    const newPost = {
      id: "post3",
      title: "First Post",
      authorId: "user3"
    };

    const state = postsReducer(newInitialState, createPost(newPost));
    const updatedUser = state.users.find(u => u.id === "user3");

    expect(updatedUser.posts).toEqual([newPost]);
  });

  it("should not duplicate the post if called twice", () => {
    const newPost = {
      id: "post4",
      title: "Unique Post",
      authorId: "user1"
    };

    let state = postsReducer(initialState, createPost(newPost));
    state = postsReducer(state, createPost(newPost));

    const updatedUser = state.users.find(u => u.id === "user1");
    const postCount = updatedUser.posts.filter(p => p.id === "post4").length;

    expect(postCount).toBe(1); // Ensure no duplicate
  });
});
