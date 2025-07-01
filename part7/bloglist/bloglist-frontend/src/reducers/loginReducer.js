import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});


export const loginUser = (credentails) => {
  return async (dispatch) => {
    const login = await loginService.login(credentails);
    blogService.setToken(login.token);
    window.localStorage.setItem("loggedInUser", JSON.stringify(login));
    dispatch(setUser(login));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    blogService.setToken(null);
    dispatch(clearUser());
  };
};



export const { setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
