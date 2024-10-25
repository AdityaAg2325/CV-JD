import React, { useState, useEffect } from "react";
import "../card/Card.css"
import './Upload.css'
import jdlogo from './../../assets/job-description.png';
import { uploadJd } from "../../service/service";
import NewCard from "../newCard/NewCard";
import Button from "../button/Button";
import FileUpload from "../fileUpload/FileUpload";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const UploadJD = ({setLoading, jdFile, setJdFile}) => {

  const [error, setError] = useState('')
  const [success, setSuccess] = useState("")

  const handleJdUpload = (file) => {
    console.log(file);
    setJdFile(file[0])
  }

  useEffect(() => {
    if(!jdFile){
      setError("Please Upload a Job Description!")
      setSuccess('')
    } else {
      setError("")
      setSuccess('JD Selected!')
    }
  }, [jdFile])

  const handleUpload = async () => {
    console.log(jdFile);
    if(jdFile){
    
    try {
      setLoading(true)
      const data = await uploadJd(jdFile);
      toast.success("JD uploaded successfully!")
      
    } catch (error) {
      toast.error("Error in uploading JD!")
    } finally {
      setLoading(false)
    }
  } else {
    toast.error("Please select a file to upload!")
  }
  }

  return (
    <div className="upload-container">
    <NewCard>
      <div className="data-details">
        <img src={jdlogo} alt="logo" className="data-photo" />
      </div>
      <div className="upload-text">Upload job description</div>
      <div className="button-container">
        <FileUpload value={jdFile} onChange={handleJdUpload} id={'upload-jd'} />
        <Button type="button" className="login-btn upload" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </NewCard>
    {error && (
      <div className="error-conatiner upload-error">
      <Typography color="error" variant="body2">
        {error}
      </Typography></div>
    )}
    {success && (
        <div className="error-conatiner upload-error">
          <Typography color="success" variant="body2">
            {success}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default UploadJD;
