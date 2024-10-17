import React from 'react'
import Card from '../card/Card'
import cvlogo from './../../assets/cv.png'

const UploadCV = () => {
  return (
    <div>
        <Card logo={cvlogo} text='Upload Resume(s)'/>
    </div>
  )
}

export default UploadCV