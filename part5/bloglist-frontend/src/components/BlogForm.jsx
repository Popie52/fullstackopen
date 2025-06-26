import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({handleBlog}) => {
  // blog Data
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if(!title || !author || !url) {
        alert(`Please fill out all the fields`);
        return;
    }
    try {

        await handleBlog({title, author, url});
        setTitle('');
        setAuthor('')
        setUrl('');
    } catch(error) {
        console.log(`Error occurred handling form`);
    }
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
          data-testid='title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
          data-testid='author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
          data-testid="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired
}

export default BlogForm;
