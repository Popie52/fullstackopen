import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs.js';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateBlogs(state, action) {
            const updated = action.payload;
            return state.map(blog => blog.id === updated.id? updated: blog );
        },
        appendBlogs(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlogs(state, action) {
            const deleted = action.payload;
            return state.filter(blog => blog.id !== deleted);
        }
    }
})


export const initializeBlogsR = () => {
    return async dispatch => {
        const result = await blogService.getAll();
        dispatch(setBlogs(result));
    }
}

export const createBlogsR = (newBlog) => {
    return async dispatch => {
        const result = await blogService.createBlog(newBlog);
        dispatch(appendBlogs(result));
        
    }
}

export const updateBlogR = (blog) => {
    return async dispatch => {
        const result = await blogService.updateBlog(blog.id, blog);
        dispatch(updateBlogs(result))
    }
}

export const deleteBlogR = (blog) => {
    return async dispatch => {
        await blogService.deleteBlog(blog.id);
        dispatch(deleteBlogs(blog.id));
    }
}


export const {updateBlogs, appendBlogs, setBlogs, deleteBlogs} = blogSlice.actions;
export default blogSlice.reducer;