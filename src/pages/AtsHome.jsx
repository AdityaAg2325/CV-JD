import React, { useEffect, useState } from "react";
import cssAtsHome from "./AtsHome.module.css";
import Button from "../components/button/Button";
import UploadCV from "../components/upload/UploadCV";
import Table from "../components/table/Table";
import InputSlider from "../components/inputSlider/InputSlider";
import Input from "../components/input/Input";
import UploadJD from "../components/upload/UploadJD";
import { generateReport } from "../service/service";
import Loader from "../components/loader/Loader";
import Navbar from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AtsHome = () => {
  const [threshold, setThreshold] = useState(70);
  const [experience, setExperience] = useState(33);
  const [skills, setSkills] = useState(34);
  const [relevance, setRelevance] = useState(33);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState();
  const [cvFile, setCvFile] = useState([]);
  const [jdFile, setJdFile] = useState(null);

  const handleMatch = async () => {
    if (cvFile.length > 0 && jdFile) {
      try {
        setLoading(true);
        const data = await generateReport(
          skills,
          experience,
          relevance,
          threshold
        );
        toast.success("Report generated successfully!");
        setReportData(data);
      } catch (error) {
        toast.error("Error in generating reports!");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Select the required files!");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={cssAtsHome.atsParent}>
        <Navbar />
        <div className={cssAtsHome.atsContainer}>
          <div className={cssAtsHome.heading}>RESUME SCREENER</div>
          <div className={cssAtsHome.uploadParent}>
            <UploadCV
              setLoading={setLoading}
              cvFile={cvFile}
              setCvFile={setCvFile}
            />
            <UploadJD
              setLoading={setLoading}
              jdFile={jdFile}
              setJdFile={setJdFile}
            />
          </div>
          <div className={cssAtsHome.parametersParent}>
            <div className={cssAtsHome.parameters}>
              Please Enter Wightage Parameters
            </div>
          </div>
          <Input
            experience={experience}
            setExperience={setExperience}
            skills={skills}
            setSkills={setSkills}
            relevance={relevance}
            setRelevance={setRelevance}
          />
          <div className={cssAtsHome.sliderParent}>
            <div className={cssAtsHome.threshold}>
              Please Select Threshold Value
            </div>
            <div className={cssAtsHome.slider}>
              <InputSlider threshold={threshold} setThreshold={setThreshold} />
              <Button
                type="submit"
                className="login-btn match"
                onClick={handleMatch}
              >
                Start Matching
              </Button>
            </div>
          </div>
          {reportData && <div className={cssAtsHome.result}>Generated Results</div>}
          {reportData && <Table data={reportData} setLoading={setLoading} />}
          <div className={cssAtsHome.buttonGroup}>
            <Link to="/ats-listing">
              <Button className="login-btn match view">View History</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtsHome;
