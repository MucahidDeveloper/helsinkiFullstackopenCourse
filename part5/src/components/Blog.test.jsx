import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog"; // تأكد من المسار الصحيح للكومبوننت

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

  // نضغط على زر view
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  // التأكد من ظهور الرابط وعدد الإعجابات بعد الضغط
  const urlElement = screen.getByText("https://reactpatterns.com/");
  const likesElement = screen.getByText("likes 7");

  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});
