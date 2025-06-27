import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    upVoteAnecdote(state, action) {
      const  changed = action.payload;
      return state.map(anecdote => anecdote.id === changed.id ? changed : anecdote)
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll();
    dispatch(setAnecdotes(data)); 
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.create(content);
    dispatch(appendAnecdotes(response));
  }
}

export const updateAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.update(content);
    dispatch(upVoteAnecdote(response));
  }
}

export const { upVoteAnecdote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer;