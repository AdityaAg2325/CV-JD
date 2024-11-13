import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Table.css";
import { downloadReport } from "../../service/service";
import { toast } from "react-toastify";

function createData(id, basicInfo, details) {
  return {
    id: basicInfo["Id"],
    name: basicInfo["CV"],
    position: basicInfo["Job Description"],
    threshold: basicInfo["Threshold_Score"],
    totalScore: basicInfo["Total Score"],
    decision: basicInfo["Decision"],
    skillsMatch: details["Skill Match"],
    experienceMatch: details["Experience Match"],
    anomalies: details["Anomalies"],
    relevanceScore: details["Relevance"],
    report: details["PDF_PATH"],
  };
}

function Row(props) {
  const { row, setLoading } = props;
  const [open, setOpen] = useState(false);

  const handleReportClick = async () => {
    try {
      setLoading(true);
      const response = await downloadReport(row.id);
      const fileURL = URL.createObjectURL(response);
      console.log(fileURL);
      window.open(fileURL);
    } catch (error) {
      toast.error('Error downloading report');
    } finally {
      setLoading(false);
    } 
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.position}</TableCell>
        <TableCell>{row.threshold}</TableCell>
        <TableCell>{row.totalScore}</TableCell>
        <TableCell sx={{ fontWeight: "bold" }}>{row.decision}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          sx={{ backgroundColor: "#eeeeee9c" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{ color: "#e74860", fontWeight: "bold" }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Detailed Information
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                      Skills Match
                    </TableCell>
                    <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                      Experience Match
                    </TableCell>
                    <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                      Anomalies
                    </TableCell>
                    <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                      Relevance Score
                    </TableCell>
                    <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                      Detailed Report
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.skillsMatch}</TableCell>
                    <TableCell>{row.experienceMatch}</TableCell>
                    <TableCell>{row.anomalies}</TableCell>
                    <TableCell>{row.relevanceScore}</TableCell>
                    <TableCell>
                      <button
                        onClick={handleReportClick}
                        style={{
                          color: "#243c76",
                          background: "none",
                          border: "none",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        View PDF
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function processResponse(response) {
  const rows = [];
  for (const key in response.Basic_Info) {
    if (
      response.Basic_Info.hasOwnProperty(key) &&
      response.Details.hasOwnProperty(key)
    ) {
      rows.push(
        createData(key, response.Basic_Info[key], response.Details[key])
      );
    }
  }
  return rows;
}

export default function CollapsibleTable({ data, setLoading }) {
  const rows = processResponse(data);

  return (
    <div className="table-container">
      <TableContainer
        className="table-parent"
        component={Paper}
        sx={{
          borderRadius: "10px",
          border: "0.5px solid #243d764d",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Details
              </TableCell>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Applicant's Name
              </TableCell>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Position Applied
              </TableCell>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Threshold Used
              </TableCell>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Total Score
              </TableCell>
              <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                Decision
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} setLoading={setLoading}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
