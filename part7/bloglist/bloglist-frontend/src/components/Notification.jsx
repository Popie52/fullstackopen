import { useSelector } from 'react-redux';

const Notification = () => {

    const {type, message} = useSelector(state => state.notification);

    if(message === '') return null
    const cssStyle = {
        color: type === 'error'? 'red' : 'green',
        padding: 10,
        border: '2px solid',
        borderRadius: 2,
        backgroundColor: 'lightgrey',
        borderColor: type === 'error'? 'red': 'green',
        marginBottom: 10
    }

    return(
        <div style={cssStyle} className={type}>
            {message}
        </div>
    )
}

export default Notification;