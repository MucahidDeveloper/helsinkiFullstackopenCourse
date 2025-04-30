import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

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

test("renders url and likes when view button is clicked", async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      username: "testuser",
      name: "Test User",
    },
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const urlElement = screen.getByText("https://reactpatterns.com/");
  const likesElement = screen.getByText("likes 7");

  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});

test("calls like event handler twice when like button is clicked twice", async () => {
  const blog = {
    id: "123",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
    user: {
      id: "user123",
      username: "user1",
      name: "User One",
    },
  };

  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      user={blog.user}
      updateBlogList={() => {}}
      onLike={mockHandler}
    />
  );

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
