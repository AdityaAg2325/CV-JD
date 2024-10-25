import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

// {
//   "Basic_Info": {
//       "8": {
//           "CV": "cv.pdf",
//           "Job Description": "jd_data_enginerr.pdf",
//           "Total Score": 80,
//           "Decision": "Selected",
//           "Threshold_Score": 80
//       }
//   },
//   "Details": {
//       "8": {
//           "Skill Match": 80,
//           "Experience Match": 75,
//           "Anomalies": -10,
//           "Relevance": 85,
//           "PDF_PATH": "Reports\\cv_report.pdf"
//       }
//   }
// }