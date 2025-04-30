import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

const Blog = ({ blog, user, updateBlogList }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    paddingBottom: 3,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlogData = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlogData);

      const updatedBlogWithUser = {
        ...returnedBlog,
        user: blog.user,
      };

      updateBlogList(updatedBlogWithUser);
    } catch (error) {
      console.error("Failed to like the blog", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );
    if (confirmed) {
      try {
        await blogService.remove(blog.id);
        updateBlogList(blog.id);
      } catch (error) {
        console.error("Failed to delete the blog", error);
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-header">
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button onClick={toggleVisibility} className="toggle-visibility">
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}
            <button onClick={handleLike} className="like-button">
              like
            </button>
          </div>
          <div className="blog-user">{blog.user.name}</div>
          {user && blog.user.username === user.username && (
            <button onClick={handleDelete} className="delete-button">
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  updateBlogList: PropTypes.func.isRequired,
};

export default Blog;
