const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  if(message.includes("Wrong")){
  return (
    <div className='error-message'>
      {message}
    </div>
  )}
  return <div className='success-message'>
    {message}
  </div>
}

export default Notification