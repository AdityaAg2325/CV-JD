import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./Input.css";

const Input = () => {
  const [skills, setSkills] = useState(34);
  const [experience, setExperience] = useState(33);
  const [relevance, setRelevance] = useState(33);
  const [error, setError] = useState("");

  const handleChange = (setter, value) => {
    const numValue = Number(value);
    if (numValue >= 0) {
      setter(numValue);
    }
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
          type="number"
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
          type="number"
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
          type="number"
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
