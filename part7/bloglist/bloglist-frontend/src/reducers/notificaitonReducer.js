import { createSlice } from "@reduxjs/toolkit";

const notifcationSlice = createSlice({
    name: "notifications",
    initialState: {
        message: '',
        type:'',
    },
    reducers: {
        setNotification(state, action) {
            return {
                message: action.payload.message,
                type: action.payload.type
            };
        },
        clearNotification() {
            return {
                message: '',
                type: '',
            };
        }
    }
})

let timeoutId;
export const {setNotification, clearNotification} = notifcationSlice.actions;

export const notificationHandler = (type, msg, duration = 5) => {
    return dispatch => {
        dispatch(setNotification({message: msg, type: type}));
        if(timeoutId) clearNotification();
        timeoutId= setTimeout(()=> dispatch(clearNotification()), duration*1000);
    }
}


export default notifcationSlice.reducer;