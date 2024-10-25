import React from 'react'
import loader from "../../assets/load.svg"
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader-container'>
        <img src={loader} alt="Loading..." />
    </div>
  )
}

export default Loader