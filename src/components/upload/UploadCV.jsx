import React, { useState, useEffect } from "react";
import cvlogo from "./../../assets/cv.png";
import { uploadCv } from "../../service/service";
import NewCard from "../newCard/NewCard";
import Button from "../button/Button";
import FileUpload from "../fileUpload/FileUpload";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";


const UploadCV = ({setLoading, cvFile, setCvFile}) => {
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const handleCvUpload = (file) => {
    console.log(file);
    setCvFile(file);
    console.log(cvFile);
  };

  useEffect(() => {
    if (cvFile.length === 0) {
      setError("Please Upload atleast one resume!");
      setSuccess('')
    } else {
      setError("");
      setSuccess(`${cvFile.length} files selected!`)
    }
  }, [cvFile]);

  const handleUpload = async () => {
    if (cvFile.length > 0) {
    try {
      setLoading(true)
      const data = await uploadCv(cvFile);
      console.log(data);
      toast.success("CV uploaded successfully")
    } catch (error) {
      toast.error(`Error uploading CV}`)
    } finally {
      setLoading(false)
    }
  } else {
    toast.error("Please select a file to upload!")
  }
  };

  return (
    <div className="upload-container">
      <NewCard>
        <div className="data-details">
          <img src={cvlogo} alt="logo" className="data-photo" />
        </div>
        <div className="upload-text">Upload Resume(s)</div>
        <div className="button-container">
          <FileUpload
            value={cvFile}
            onChange={handleCvUpload}
            id={"upload-cv"}
            multiple = {true}
          />
          <Button
            type="button"
            className="login-btn upload"
            onClick={handleUpload}
            
          >
            Upload
          </Button>
        </div>
      </NewCard>
      {error && (
        <div className="error-conatiner upload-error">
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </div>
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

export default UploadCV;
