import { useState } from "react";

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
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
