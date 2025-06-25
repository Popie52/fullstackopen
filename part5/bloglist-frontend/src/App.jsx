import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login.js";
import LoginForm from "./components/LoginForm.jsx";
import "./index.css";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notiType, setNotiType] = useState('')
  const [notiMsg, setNotiMsg] = useState(null);

  const setnotification = (error, msg) => {
    setNotiType(error);
    setNotiMsg(msg);
    setTimeout(() => setNotiMsg(null), 4000)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("loggedInUser");
    const parseToken = JSON.parse(token);
    if (parseToken) {
      blogService.setToken(parseToken);
      setUser(parseToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await loginService.login({ username, password });
      blogService.setToken(login.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(login));
      setUser(login);

      setnotification("success", `${login.username} logged in`);

      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(`wrong credentials`);
      setnotification("error", `wrong username or password`);
      console.log(error.message);
    }
  };

  const handleUsername = (username) => {
    setUsername(username);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handlePassword={handlePassword}
          handleUsername={handleUsername}
          handleSubmit={handleLogin}
        />
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
      setBlogs(prev => [...prev, result]);
      setnotification("success", `a new Blog ${result.title} added`);
    } catch(error) {
      console.log(error);
      console.log(`failed to create blog`);
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
        <h2>create new</h2>
        <BlogForm handleBlog = {handleBlog}
        />

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
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
