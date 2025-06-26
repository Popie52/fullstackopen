import { test, expect } from "@playwright/test";
import helper from "./helper";

test.describe("BlogList App", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
      data: {
        name: "Henry",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "Loki",
        username: "panday",
        password: "suck",
      },
    });
  });

  test("Login form is shown", async ({ page }) => {
    await page.goto("/");

    const locator = await page.getByText("login");

    await expect(locator).toBeVisible();

    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
  });

  test.describe("Testing components", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test.describe("Login", () => {
      test("succeeds with correct creddentials", async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "salainen");
        await expect(page.getByText("mluukkai has logged in.")).toBeVisible();
      });

      test("fails with wring credentials", async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "shit");
        const errorDiv = page.locator(".error");
        await expect(errorDiv).toContainText("wrong username or password");

        await expect(errorDiv).toHaveCSS("border-style", "solid");
        await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
        await expect(errorDiv).toHaveCSS("border-color", "rgb(255, 0, 0)");

        await expect(
          page.getByText("wrong username or password")
        ).toBeVisible();
        await expect(
          page.getByText("mluukkai has logged in.")
        ).not.toBeVisible();
      });
    });

    test.describe("When logged in", () => {
      test.beforeEach(async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "salainen");
      });

      test("a new blog can be created", async ({ page }) => {
        await helper.createBlog(page, "Humangasaur", "robert", "local.com");

        await expect(
          page.getByText("a new Blog Humangasaur added by robert")
        ).toBeVisible();
      });

      test.describe("Like Testing", () => {
        test.beforeEach(async ({ page }) => {
          await helper.createBlog(page, "hero", "humangasaur", "local.com");
          await page.getByRole("button", { name: "view" }).click();
        });

        test("a blog can be liked", async ({ page }) => {
          await page.getByRole("button", { name: "like" }).click();

          await expect(page.getByText("likes 1")).toBeVisible();
        });

        test("delete blog by user", async ({ page }) => {
          page.once("dialog", async (dialog) => {
            await dialog.accept();
          });

          await page.getByRole("button", { name: "delete" }).click();
          await expect(page.getByText("hero humangasaur")).not.toBeVisible();
        });

        test("blog delete only visible to owner", async ({ page }) => {
          page.once("dialog", async (dialog) => {
            await dialog.accept();
          });

          await page.getByRole("button", { name: "logout" }).click();
          await expect(page.getByText("mluukkai logged out")).toBeVisible();

          await helper.loginWith(page, "panday", "suck");

          await expect(page.getByText("panday has logged in.")).toBeVisible();

          await page.getByRole("button", { name: "view" }).click();

          await expect(
            page.getByRole("button", { name: "delete" })
          ).not.toBeVisible();
        });
      });
    });

    test.describe("Most Likes test", () => {
      test.beforeEach(async ({ page }) => {
        await helper.loginWith(page, "mluukkai", "salainen");
      });

      test.describe("Most Liked blogs", () => {
        test.beforeEach(async ({ page }) => {
          await helper.createBlog(page, "super", "mani", "shit.com");
          await helper.createBlog(page, "hero", "romeo", "hit.com");
          await helper.createBlog(page, "lok", "kama", "rate.com");
        });

        test("check blogs", async ({ page }) => {
            await expect(page.getByText("hero romeo")).toBeVisible();
            await expect(page.getByText("lok kama")).toBeVisible();
            await expect(page.getByText("super mani")).toBeVisible();
        });

        test("blogs likes", async ({ page }) => {
          await helper.increaseLikes(page, "super", "mani", 2);
          await helper.increaseLikes(page, "lok", "kama", 3);

          const blogs = await page.locator('.blog');
          const likes = await blogs.evaluateAll(node => node.map(e => parseInt(e.querySelector('.likes').textContent)))

          const sorted = [...likes].sort((a,b) => b-a);
          expect(likes).toEqual(sorted)

        });
      });
    });
  });
});
