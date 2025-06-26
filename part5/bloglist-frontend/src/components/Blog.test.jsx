import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";

test("renders content", () => {
  const blog = {
    title: "Hero",
    author: "Skaa",
    url: "HUU.com",
    likes: "5",
    user: {
      username: "lamine",
      name: "loki",
    },
  };
  const { container } = render(
    <Blog blog={blog} loggedUser={{ username: "loki" }} />
  );
  const element = screen.getByText("Hero Skaa");
  const url = container.querySelector(".showContent");

  expect(element).toBeDefined();
  expect(url).toHaveStyle("display: none");
});

describe("testing likes, url and others", () => {
  let container;

  const blog = {
    title: "Hero",
    author: "Skaa",
    url: "HUU.com",
    likes: "5",
    user: {
      username: "lamine",
      name: "loki",
    },
  };

  const mockHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog blog={blog} loggedUser={{ username: "loki" }} updateBlog={mockHandler} />
    ).container;
  });

  test("clicking the button calls event handler once", async () => {


    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const element = screen.getByText("hide");
    const url = screen.getByText(blog.url);
    const likes = screen.queryByText(`likes ${blog.likes}`);
    const name = screen.getByText(blog.user.username);

    expect(element).toBeDefined();
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(name).toBeDefined()

    screen.debug()

  });

  test('ensure like button works', async () => {


    const user = userEvent.setup()
    const button = screen.getByText("view");
    await user.click(button);

    const like = screen.getByText('like');
    await user.click(like);
    await user.click(like);

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

});
