import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./Input.css";

const Input = ({skills, setSkills, relevance, setRelevance, experience, setExperience}) => {
  const [error, setError] = useState("");

  const handleChange = (setter, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    
    const numValue = numericValue === "0" ? numericValue : numericValue.replace(/^0+/, "");
    
    setter(Number(numValue));
  };


  const total = skills + experience + relevance;

  useEffect(() => {
    if (total !== 100) {
      setError("The sum of skills, experience, and relevance must be 100.");
    } else {
      setError("");
    }
  }, [skills, experience, relevance, total]);

  return (
    <Box
      className="input-parent"
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div className="text-input-container">
      <div className="textfield-parent">
        <TextField
          id="skills-input "
          label="Skills"
          variant="standard"
          type="text"
          value={skills}
          onChange={(e) => handleChange(setSkills, e.target.value)}
          InputLabelProps={{
            sx: {
              fontSize: '1.2rem',
            },
          }}
        />
      </div>
      <div className="textfield-parent">
        <TextField
          id="experience-input"
          label="Experience"
          variant="standard"
          type="text"
          value={experience}
          onChange={(e) => handleChange(setExperience, e.target.value)}
          InputLabelProps={{
            sx: {
              fontSize: '1.2rem',
            },
          }}
        />
      </div>
      <div className="textfield-parent">
        <TextField
          id="relevance-input"
          label="Relevance"
          variant="standard"
          type="text"
          value={relevance}
          onChange={(e) => handleChange(setRelevance, e.target.value)}
          InputLabelProps={{
            sx: {
              fontSize: '1.2rem',
            },
          }}
        />
      </div></div>

      {error && (
        <div className="error-conatiner">
        <Typography color="error" variant="body2">
          {error}
        </Typography></div>
      )}
    </Box>
  );
};

export default Input;
