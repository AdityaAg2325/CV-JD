import React, { useState } from "react";
import "./Navbar.css";
import NT from "../../assets/NucleusTeq Logo.png";
import userLogo from "../../assets/user.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NT} alt="Logo" />
      </div>
      <div className="navbar-user">
        <img src={userLogo} alt="User" />
      </div>
    </div>
  );
}

export default Navbar;