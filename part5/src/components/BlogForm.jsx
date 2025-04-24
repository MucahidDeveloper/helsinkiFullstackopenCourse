import { useState } from "react";

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, author, url }); // likes = 0 by default
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>create new</h3>
      <div>
        title&nbsp;
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        author&nbsp;
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        url&nbsp;
        <input value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
