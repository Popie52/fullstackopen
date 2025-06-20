const Notification = ({type, msg}) => {
    if(msg == null) return null;

    return(
        <div>
        <p className={type}>{msg}</p>
        </div>
    )
}

export default Notification