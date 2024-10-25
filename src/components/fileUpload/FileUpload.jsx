import React, { useState } from 'react'
import Button from '../button/Button'

import './FileUpload.css'

const FileUpload = ({multiple=false, className, onChange, id}) => {

  return (
    <Button className={'select-btn'}>
        <label htmlFor={id} style={{cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.75rem'}}>
            Select file
        </label>
        <input 
            id={id}
            type='file' 
            multiple={multiple}
            className={`${className}`}
            name='file-upload'
            onChange={(e) => onChange(e.target.files)}
            style={{ display: 'none', width: '10rem'}} 
        />
    </Button>
  )
}

export default FileUpload