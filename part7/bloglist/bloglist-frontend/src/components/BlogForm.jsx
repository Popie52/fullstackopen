import { useState } from "react";
import PropTypes from "prop-types";
import {Form, Field, Button, Label, Input} from "./BlogForm.js";

const BlogForm = ({ handleBlog }) => {
  // blog Data
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !url) {
      alert(`Please fill out all the fields`);
      return;
    }
    try {
      await handleBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.log(`Error occurred handling form`);
    }
  };

  return (
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="title">Title</Label>
          {/* title: */}
          <Input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
            data-testid="title"
          />
        </Field>
        <Field>
          <Label htmlFor="author">Author</Label>
          {/* author: */}
          <Input
            type="text"
            id="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
            data-testid="author"
          />
        </Field>
        <Field>
          <Label htmlFor="url">URL</Label>
          {/* url: */}
          <Input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
            data-testid="url"
          />
        </Field>
        <Button type="submit">create</Button>
      </Form>
  );
};

BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired,
};

export default BlogForm;
