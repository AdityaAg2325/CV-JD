import React from 'react'
import "./Card.css"
import Button from '../button/Button'

const Card = ({logo, text}) => {
  return (
    <div className="data-card">
      <div className="data-details">
        <img src={logo} alt='logo' className="data-photo"></img>
      </div>
      <div className="upload-text">{text}</div>
      <Button type="submit" className="login-btn upload">
            Upload
          </Button>
    </div>
  )
}

export default Card