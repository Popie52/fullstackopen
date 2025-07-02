
const Blog = ({ blog}) => {

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
    </div>
  );
};

export default Blog;
