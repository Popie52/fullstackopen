import PropTypes from 'prop-types'

const Notification = ({notiType, msg}) => {
    if(msg === null) return null
    const cssStyle = {
        color: notiType === 'error'? 'red' : 'green',
        padding: 10,
        border: '2px solid',
        borderRadius: 2,
        backgroundColor: 'lightgrey',
        borderColor: notiType === 'error'? 'red': 'green',
        marginBottom: 10
    }

    return(
        <div style={cssStyle}>
            {msg}
        </div>
    )
}

Notification.propTypes = {
    notiType: PropTypes.string.isRequired,
    msg: PropTypes.string
}

export default Notification;