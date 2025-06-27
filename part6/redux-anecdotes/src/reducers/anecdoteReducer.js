import { createSlice } from "@reduxjs/toolkit";


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    upVoteAnecdote(state, action) {
      const id = action.payload;
      const toChange = state.find((e) => e.id === id);
      const changed = { ...toChange, votes: toChange.votes + 1 };
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

export const { createAnecdote, upVoteAnecdote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer;