const Notification = ({ message, level }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={`notification ${level}`} >
            {message}
        </div >
    )
}

export default Notification;