import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author, but not url or likes by default", () => {
  const blog = {
    user: {
      username: "testuser",
      name: "Test User",
      id: "1234",
    },
    likes: 5,
    author: "Author Name",
    title: "Blog Title",
    url: "https://example.com",
  };

  render(
    <Blog
      blog={blog}
      user={{ username: "testuser", name: "Test User" }}
      updateBlogList={() => {}}
    />
  );

  // تحقق من أن العنوان والمؤلف ظاهرين
  expect(screen.getByText("Blog Title")).toBeInTheDocument();
  expect(screen.getByText("Author Name")).toBeInTheDocument();

  // تحقق من أن الرابط وعدد الإعجابات غير ظاهرين
  const url = screen.queryByText("https://example.com");
  const likes = screen.queryByText(/likes/i);

  expect(url).not.toBeInTheDocument();
  expect(likes).not.toBeInTheDocument();
});
