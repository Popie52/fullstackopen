import { useReducer, createContext, useContext } from "react";

const notiReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}


const NotificationContext = createContext()

export const useNotificationValue = () => {
  const value = useContext(NotificationContext);
  return value[0]
} 

export const useNotificationDispatch = () => {
    const value = useContext(NotificationContext);
    return value[1];
}

export const NotificationContextProvider = (props) => {
    const [msg, setMsg] = useReducer(notiReducer, '');
    return (
        <NotificationContext.Provider value ={[msg, setMsg]}>
            {props.children}
        </NotificationContext.Provider>
    )
}


export default NotificationContext;