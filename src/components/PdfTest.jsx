import React from 'react'
import { Document, Page } from 'react-pdf';
import Button from "./button/Button";

const PdfTest = () => {
  return (
    <div>
        <button onClick={() => window.open('https://drive.google.com/file/d/1bLfO9Y6XJXahArqeOxySfONnWbq0TW3Y/view?usp=drive_link', '_blank')}>Open PDF</button>
    </div>
  )
}
export default PdfTest;
