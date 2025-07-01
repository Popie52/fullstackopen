import { configureStore }  from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificaitonReducer.js';
import blogReducer from './reducers/blogReducer.js';
import loginReducer from './reducers/loginReducer.js';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer,
    }
})

export default store;