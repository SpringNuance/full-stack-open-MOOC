import React from 'react'

const Notifications = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('!')) {
        return (
            <div className="error">
              {message}
            </div>
          )
    } else {
        return (
            <div className="success">
              {message}
            </div>
          )
    }
  
    
  }

export default Notifications