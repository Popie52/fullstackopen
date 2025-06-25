import Blog from "../models/Blog.js";
import User from '../models/User.js';

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
  },
];


const nonExistingId = async () => {
    const blog = new Blog({title: "willremovethisson", author: "remove", url: "remove.com"});
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString();
}

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
}

export default { initialBlogs, nonExistingId, blogsInDb, usersInDb}