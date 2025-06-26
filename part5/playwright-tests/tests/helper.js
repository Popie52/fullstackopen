const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);

  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();

  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);

  await page.getByRole("button", { name: "create" }).click();
  await page.waitForTimeout(200);
};

const increaseLikes = async (page, title, author, count=0) => {
  const viewBtn = page.locator(".blog", { hasText: `${title} ${author}` });
  await viewBtn.getByRole("button", { name: "view" }).click();
  for (let i = 1; i <= count; i++) {
    await viewBtn.getByRole("button", { name: "like" }).click();
    await page.waitForTimeout(100);
  }
};

export default { loginWith, createBlog, increaseLikes };
