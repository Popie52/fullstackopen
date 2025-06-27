import { useSelector } from "react-redux"

const Notification = () => {
  const notifica= useSelector(state => state.notification)

  if (!notifica) {
    return null; 
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notifica}
    </div>
  )
}

export default Notification