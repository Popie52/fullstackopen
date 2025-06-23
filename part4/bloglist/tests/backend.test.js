import { test, describe, beforeEach, after } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js'
import supertest from 'supertest';
import app from '../app.js';
import helper from './test_helper.js';
import { title } from 'node:process';

const api = supertest(app);


const baseUrl = '/api/blogs';

beforeEach(async() => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
})

test('blogs are returned as json', async () => {
    await api.get(baseUrl).expect(200).expect('Content-Type', /application\/json/)

})

test('all blogs are returned', async () => {
    const response = await api.get(baseUrl)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique id for blogs', async () => {
    const response = await api.get(baseUrl);

    const blog = response.body[0]
    assert.ok(blog.id, 'Blog id should be defined');
})

test('adding blogs', async () => {
    const newBlog = {
        title: "hello",
        author: "carl",
        url: "skdf.com",
        likes: 4
    }

    await api.post(baseUrl).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1);

    const titles = blogsAtEnd.map(e => e.title);
    assert(titles.includes("hello"))

})

test('default likes works', async () => {
    const newBlog = {
        title: "hello",
        author: "carl",
        url: "skdf.com",
    }

    await api.post(baseUrl).send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(e => e.title === newBlog.title);
    assert.strictEqual(updatedBlog.likes, 0)

})


describe('test for missing author or title', () => {

    test('Bad Post request missing title', async () => {
        const newBlog = {
            author: "carlson",
            url: "benjamin",
        }
        
        await api.post(baseUrl).send(newBlog).expect(400);
        
        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        
    })
    
    test('Bad Post request missing author', async () => {
        const newBlog = {
            title: "carlson king",
            url: "benjamin",
        }
        
        await api.post(baseUrl).send(newBlog).expect(400);
        
        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        
    })
})

test('delete blog', async() => {
    const blogsAtStart = await helper.blogsInDb();


    await api.delete(`${baseUrl}/${blogsAtStart[0].id}`).expect(204);
    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtStart.length-1, blogsAtEnd.length);

})


test('update a blog', async() => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {...blogToUpdate, likes: 5};
    
    const response = await api.put(`${baseUrl}/${blogToUpdate.id}`)
    .send(updatedBlog).expect(200)
    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlogInDb = blogsAtEnd.find(e => e.id === blogToUpdate.id);
    assert.strictEqual(updatedBlogInDb.likes, 5);

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
    assert.strictEqual(response.body.likes, 5);

})

after(async () => {
    await mongoose.connection.close();
})