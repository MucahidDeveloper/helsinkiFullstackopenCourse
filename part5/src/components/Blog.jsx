import { useState } from "react";
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
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user && blog.user.username === user.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
