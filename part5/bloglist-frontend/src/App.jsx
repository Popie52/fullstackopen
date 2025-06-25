import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import LoginForm from "./components/LoginForm.jsx";
import "./index.css";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import Togglable from "./components/Togglable.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [notiType, setNotiType] = useState("");
  const [notiMsg, setNotiMsg] = useState(null);

  const blogRef = useRef();

  const setnotification = (error, msg) => {
    setNotiType(error);
    setNotiMsg(msg);
    setTimeout(() => setNotiMsg(null), 4000);
  };

  useEffect(() => {
    (async () => {
      const result = await blogService.getAll();
      setBlogs((prevBlogs) => prevBlogs.concat(result));
    })();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUser");
    const parseToken = JSON.parse(token);
    if (parseToken) {
      blogService.setToken(parseToken.token);
      setUser(parseToken);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const login = await loginService.login({ username, password });
      blogService.setToken(login.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(login));
      setUser(login);

      setnotification("success", `${login.username} logged in`);
    } catch (error) {
      setnotification("error", `wrong username or password`);
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
      window.localStorage.clear();
      blogService.setToken(null);
      setnotification("success", `${user.username} logged out`);
      setUser(null);
    }
  };

  const handleBlog = async (newBlog) => {
    try {
      const result = await blogService.createBlog(newBlog);
      setBlogs((prev) => [...prev, result]);
      setnotification(
        "success",
        `a new Blog ${result.title} added by ${result.author}`
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
        user: blog.user.id
      };
      const result = await blogService.updateBlog(blog.id, updateBlog);
      setBlogs(blogs.map((e) => (e.id === result.id ? {...result, user: blog.user} : e)));
    } catch (err) {
      setnotification("error", `could not like`);
    }
  };

  const handleDelete = async (blog) => {
    try {
      const check = window.confirm(`Remove blof ${blog.title} by ${blog.author}`);
      if(check) {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter(e => e.id !== blog.id))
        setnotification(`success`, `deleted blog ${blog.title} by ${blog.author}`)
      } 
    } catch (error) {
      console.log(error);
      setnotification('error', 'could not delte the blog')
    }
  }

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

        {[...blogs].sort((a,b)=> b.likes - a.likes).map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} loggedUser={user} handleBlogDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Notification notiType={notiType} msg={notiMsg} />
      {!user && loginForm()}
      {user && loggedUser()}
    </div>
  );
};

export default App;
