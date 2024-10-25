import React, { useState } from "react";
import "./Navbar.css";
import NT from "../../assets/NucleusTeq Logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={NT} alt="Logo" />
      </div>
    </div>
  );
}

export default Navbar;