import React from "react";
import cssAtsHome from "./AtsHome.module.css";
import Button from "../components/button/Button";
import UploadCV from "../components/upload/UploadCV";
import Table from "../components/table/Table";
import InputSlider from "../components/inputSlider/InputSlider";
import Input from "../components/input/Input";
import UploadJD from "../components/upload/UploadJD";

const AtsHome = () => {
  return (
    <div className={cssAtsHome.atsParent}>
      <div className={cssAtsHome.navbar}>Navbar</div>
      <div className={cssAtsHome.atsContainer}>
        <div className={cssAtsHome.heading}>RESUME MATCHER</div>
        <div className={cssAtsHome.uploadParent}>
          <UploadCV />
          <UploadJD />
        </div>
        <div className={cssAtsHome.parametersParent}>
          <div className={cssAtsHome.parameters}>
            Please Enter Wightage Parameters
          </div>
        </div>
        <Input />
        <div className={cssAtsHome.sliderParent}>
          <div className={cssAtsHome.threshold}>
            Please Select Threshold Value
          </div>
          <div className={cssAtsHome.slider}>
            <InputSlider />
            <Button type="submit" className="login-btn match">
              Start Matching
            </Button>
          </div>
        </div>
        <div className={cssAtsHome.result}>Generated Results</div>
        <Table />
        <div className={cssAtsHome.buttonGroup}>
          <Button type="submit" className="login-btn match view">
            View All Rejected Candidates
          </Button>
          <Button type="submit" className="login-btn match view">
            View All Selected Candidates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AtsHome;
