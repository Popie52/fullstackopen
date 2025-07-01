import { configureStore }  from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificaitonReducer.js';
import blogReducer from './reducers/blogReducer.js';
import loginReducer from './reducers/loginReducer.js';
import userReducer from './reducers/userReducer.js';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        login: loginReducer,
        users: userReducer,
    }
})

export default store;