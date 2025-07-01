import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm.jsx";
import "./index.css";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import { notificationHandler } from "./reducers/notificaitonReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { createBlogsR, deleteBlogR, initializeBlogsR, updateBlogR } from "./reducers/blogReducer.js";
import { loginUser, logoutUser, setUser } from "./reducers/loginReducer.js";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector(state => state.login);

  const blogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogsR());
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUser");
    const parseToken = JSON.parse(token);
    if (parseToken) {
      blogService.setToken(parseToken.token);
      dispatch(setUser(parseToken));
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      dispatch(loginUser({username, password}));
      dispatch(notificationHandler(`success`, `${username} logged in`));
    } catch (error) {
      dispatch(notificationHandler("error", `wrong username or password`));
      console.log(error.message);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    );
  };

  const handleLogout = () => {
    const check = window.confirm(`Want ${user.username} to log out`);
    if (check) {
      dispatch(logoutUser());
      dispatch(notificationHandler("success", `${user.username} logged out`));
    }
  };

  const handleBlog = async (newBlog) => {
    try {
      dispatch(createBlogsR(newBlog));
      dispatch(
        notificationHandler(
          "success",
          `a new Blog ${newBlog.title} added by ${newBlog.author}`
        )
      );
      blogRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      console.log(`failed to create blog`);
    }
  };

  const handleUpdateBlog = async (blog) => {
    try {
      const updateBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      dispatch(updateBlogR(updateBlog));
      dispatch(
        notificationHandler(
          "success",
          `liked ${blog.title} by ${user.username}`
        )
      );
    } catch (err) {
      dispatch(notificationHandler("error", `could not like`));
    }
  };

  const handleDelete = async (blog) => {
    try {
      const check = window.confirm(
        `Remove blof ${blog.title} by ${blog.author}`
      );
      if (check) {
        dispatch(deleteBlogR(blog));
        dispatch(
          notificationHandler(
            `success`,
            `deleted blog ${blog.title} by ${blog.author}`
          )
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(notificationHandler("error", `could not delete the blog`));
    }
  };

  const loggedUser = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h4>
          {user.username} has logged in.{" "}
          <button onClick={handleLogout}>logout</button>
        </h4>

        <Togglable label="new blog" ref={blogRef}>
          <h2>create new</h2>
          <BlogForm handleBlog={handleBlog} />
          <button onClick={() => blogRef.current.toggleVisibility()}>
            cancel
          </button>
        </Togglable>

        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={handleUpdateBlog}
              loggedUser={user}
              handleBlogDelete={handleDelete}
            />
          ))}
      </div>
    );
  };

  return (
    <div>
      <Notification />
      {!user && loginForm()}
      {user && loggedUser()}
    </div>
  );
};

export default App;
