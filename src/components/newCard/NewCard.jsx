import React from 'react'
import "../card/Card.css";

const NewCard = ({className, children}) => {
  return (
    <div className={`data-card ${className}`}>
        {children}
    </div>
  )
}

export default NewCard