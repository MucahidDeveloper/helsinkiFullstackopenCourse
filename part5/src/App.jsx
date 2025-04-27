import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const blogFormRef = useRef();

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 3000);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService
        .getAll()
        .then((blogs) => {
          // ترتيب المدونات حسب عدد اللايكات (من الأعلى إلى الأدنى)
          const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
          setBlogs(sortedBlogs);
        })
        .catch(() => handleLogout());
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      if (user) {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user)); // ✅ تأكد أنه كائن وليس undefined
        blogService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
        showNotification("Login successful", "success");
      } else {
        showNotification("Login failed: No user data", "error");
      }
    } catch (exception) {
      showNotification("Invalid username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.clearToken();
    setUser(null);
    setBlogs([]);
    showNotification("Logged out successfully", "success");
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      blogFormRef.current.toggleVisibility();
      showNotification(
        `Added blog: ${savedBlog.title} by ${savedBlog.author}`,
        "success"
      );
    } catch (err) {
      showNotification("Failed to add blog", "error");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const updateBlogList = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const blogForm = () =>
    blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        updateBlogList={updateBlogList}
      />
    ));

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>log out</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onCreate={addBlog} />
          </Togglable>
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
