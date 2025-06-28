export const setNotificaiton = (dispatch, msg, duration = 5) => {

    dispatch({type: 'SET', payload: msg})
    setTimeout(() => {
        dispatch({type:'CLEAR'})
    }, duration * 1000)
}