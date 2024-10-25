import React, { useState } from "react";
import "./Card.css";
import Button from "../button/Button";

const Card = ({ logo, text, onUpload, allowMultiple = false }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFiles(files);  
      console.log("Selected files:", files);
      console.log("selectedFiles:", selectedFiles);
    }
  };

  const handleUpload = () => {
    console.log(selectedFiles);
    
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
    }
  };

  return (
    <div className="data-card">
      <div className="data-details">
        <img src={logo} alt="logo" className="data-photo" />
      </div>
      <div className="upload-text">{text}</div>
      <div className="button-container">
        <Button type="button" className="login-btn upload">
          <label
            htmlFor="file-upload"
            style={{ cursor: "pointer", padding: "10px" }}
          >
            Select File
          </label>
        </Button>
        <Button type="button" className="login-btn upload" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        multiple={allowMultiple}
        style={{ display: "none" }} 
      />
    </div>
  );
};

export default Card;
