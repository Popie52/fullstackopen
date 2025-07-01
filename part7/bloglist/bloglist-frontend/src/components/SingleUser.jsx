import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";


const SingleUser = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, []);
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div>Loading user info...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleUser;
