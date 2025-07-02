import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBlogsR } from "../reducers/blogReducer";
import Comments from "./Comments.jsx";

const Singleblogs = ({ update, loggedUser, handleBlogDelete }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogsR());
  }, []);

  const handleLikes = async () => {
    await update(blog);
  };

  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((u) => u.id === id);

  if (!blog) {
    return <div>Loading user info...</div>;
  }
  const isOwner = blog.user.username === loggedUser.username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>
        {blog.likes} <button onClick={handleLikes}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <p>{blog.user.username}</p>

      {isOwner && (
        <button onClick={() => handleBlogDelete(blog)}>delete</button>
      )}

      <h2>Comments</h2>
      <Comments id={blog.id} />
    </div>
  );
};

export default Singleblogs;
