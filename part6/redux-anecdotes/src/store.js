import anecdoteReducer from './reducers/anecdoteReducer.js';
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer.js';

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store;
