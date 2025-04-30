import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { vi } from "vitest";

test("calls onCreate with correct blog details when form is submitted", async () => {
  const mockCreateHandler = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm onCreate={mockCreateHandler} />);

  const titleInput = screen.getByPlaceholderText("Enter blog title");
  const authorInput = screen.getByPlaceholderText("Enter author name");
  const urlInput = screen.getByPlaceholderText("Enter blog URL");
  const createButton = screen.getByRole("button", { name: /create/i });

  await user.type(titleInput, "Testing React Forms");
  await user.type(authorInput, "John Tester");
  await user.type(urlInput, "http://example.com/test-form");
  await user.click(createButton);

  expect(mockCreateHandler).toHaveBeenCalledTimes(1);
  expect(mockCreateHandler).toHaveBeenCalledWith({
    title: "Testing React Forms",
    author: "John Tester",
    url: "http://example.com/test-form",
  });
});
