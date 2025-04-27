import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import blogService from "../services/blogs"; // تأكد من المسار

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

      // نربط بيانات المستخدم القديمة (التي تحتوي على الاسم) مرة أخرى
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
        updateBlogList(blog.id); // نمرر id المدونة التي تم حذفها
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

// Define PropTypes for the Blog component
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
