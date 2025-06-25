import { useState } from "react"

const Blog = ({ blog, updateBlog, loggedUser, handleBlogDelete }) => {

  const [visible, setVisible] = useState(false);

  const showVisible = { display: visible? '': 'none' }
  const label = visible ? 'hide' :'view'

  const handleBlogView = () => setVisible(!visible)


  const isOwner = blog.user.username === loggedUser.username
  
  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  const handleLikes = async () => {
    await updateBlog(blog)
  }
  
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} {" "}
    <button onClick={handleBlogView}>{label}</button>

    <div style={showVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLikes}>like</button> </p>
      <p>{blog.user.username}</p>
      {isOwner && <button onClick={() => handleBlogDelete(blog)} >delete</button>}
    </div>

  </div>  
)}

export default Blog