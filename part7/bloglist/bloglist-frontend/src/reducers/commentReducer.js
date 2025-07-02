import { createSlice } from "@reduxjs/toolkit";
import commentService from '../services/comments.js';

const commentSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        },
        appendComments(state, action) {
            state.push(action.payload)
        }
    }
})

export const initializeComments =  (id) => {
    return async dispatch => {
        const response = await commentService.getAll(id);
        dispatch(setComments(response));
    }

}

export const addComments = (id, data) => {
    return async dispatch => {
        const response = await commentService.createComment(id, data);
        dispatch(appendComments(response));
    }
}

export const {setComments, appendComments} = commentSlice.actions;

export default commentSlice.reducer;