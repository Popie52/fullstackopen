import { createSlice } from "@reduxjs/toolkit";

let timeoutId

const notiSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const notificationHandler = (msg, duration = 5) => {
    return dispatch => {
        dispatch(setNotification(msg))
        if(timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
    } 
}

export const { setNotification, clearNotification } = notiSlice.actions;
export default notiSlice.reducer;