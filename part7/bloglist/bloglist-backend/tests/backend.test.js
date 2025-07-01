import { test, describe, beforeEach, after, before } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import supertest from "supertest";
import app from "../app.js";
import helper from "./test_helper.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
// import jwt from "jsonwebtoken";

const api = supertest(app);

const baseUrl = "/api/blogs";

let token;

describe("For Blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get(baseUrl);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("unique id for blogs", async () => {
    const response = await api.get(baseUrl);

    const blog = response.body[0];
    assert.ok(blog.id, "Blog id should be defined");
  });

  describe("auth test", () => {
    beforeEach(async () => {
      await Blog.deleteMany({});
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("secret", 10);
      const user = new User({ username: "lamine", passwordHash, name: "koli" });
      const savedUser = await user.save();

      const response = await api.post("/api/login").send({
        username: "lamine",
        password: "secret",
      });
      token = response.body.token;

      const blogObjects = helper.initialBlogs.map(
        (blog) => new Blog({ ...blog, user: savedUser._id })
      );
      const promiseArray = blogObjects.map((blog) => blog.save());
      await Promise.all(promiseArray);
    });

    test("adding blogs", async () => {
      const newBlog = {
        title: "hello",
        author: "carl",
        url: "skdf.com",
        likes: 4,
      };

      await api
        .post(baseUrl)
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((e) => e.title);
      assert(titles.includes("hello"));
    });

    test("default likes works", async () => {
      const newBlog = {
        title: "hello",
        author: "carl",
        url: "skdf.com",
      };

      await api
        .post(baseUrl)
        .send(newBlog)
        .set("Authorization", `Bearer ${token}`)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find((e) => e.title === newBlog.title);
      assert.strictEqual(updatedBlog.likes, 0);
    });

    test("fails with 401 if token is not provided", async () => {
      const newBlog = {
        title: "unauthorized post",
        author: "hacker",
        url: "no-access.com",
        likes: 0,
      };

      await api.post(baseUrl).send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      const titles = blogsAtEnd.map((b) => b.title);

      assert(!titles.includes("unauthorized post"));
    });

    describe("test for missing author or title", () => {
      test("Bad Post request missing title", async () => {
        const newBlog = {
          author: "carlson",
          url: "benjamin",
        };

        await api
          .post(baseUrl)
          .send(newBlog)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      });

      test("Bad Post request missing author", async () => {
        const newBlog = {
          title: "carlson king",
          url: "benjamin",
        };

        await api
          .post(baseUrl)
          .send(newBlog)
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      });
    });

    test("delete blog", async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api
        .delete(`${baseUrl}/${blogsAtStart[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length);
    });
  });

  test("update a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: 5 };

    const response = await api
      .put(`${baseUrl}/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlogInDb = blogsAtEnd.find((e) => e.id === blogToUpdate.id);
    assert.strictEqual(updatedBlogInDb.likes, 5);

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
    assert.strictEqual(response.body.likes, 5);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
