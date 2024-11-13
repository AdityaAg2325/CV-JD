import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../components/button/Button";
import TablePagination from "@mui/material/TablePagination";
import Navbar from "../components/navbar/Navbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import cssAtsHome from "./AtsHome.module.css";
import listCss from "./ApplicantList.module.css";
import { listing } from "../service/service"; // Assuming you have this service for fetching data
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import DateRangePicker from "../components/datepicker/DatePicker";

function CustomTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameFilter, setNameFilter] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(7, "day")]);
  const [showTable, setShowTable] = useState(false);

  const fetchData = async () => {
    try {
      const [startDate, endDate] = dateRange;
      const data = await listing(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      );

      const transformedRows = Object.keys(data.Basic_Info).map((key) => ({
        cv: data.Basic_Info[key].CV,
        jd: data.Basic_Info[key]["Job Description"],
        decision: data.Basic_Info[key].Decision,
        pdfPath: data.Details[key] ? data.Details[key].PDF_PATH : null,
      }));

      setRows(transformedRows);
      setShowTable(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    const matchesNameOrJD =
      row.cv.toLowerCase().includes(nameFilter.toLowerCase()) ||
      row.jd.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDecision = decisionFilter
      ? row.decision === decisionFilter
      : true;
    return matchesNameOrJD && matchesDecision;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={cssAtsHome.atsParent}>
        <Navbar />
        <div className={listCss.atsContainer}>
          <div className={cssAtsHome.heading}>Applicant History</div>
          <div className={listCss.uppercontainer}>
            <div className="datepickercss">
            <DateRangePicker 
              value={dateRange}
              onChange={(newValue) => {
                if (newValue) {
                  setDateRange(newValue);
                }
              }}
            />
            </div>
            <Button
              className="fetchButton"
              variant="contained"
              onClick={() => fetchData()} // Set showTable to trigger fetchData
            >
              ENTER
            </Button>
          </div>
          {showTable && (
            <div className="tableWrapper" style={{ width: "90%", margin: "0 auto" }}>
              <TableContainer
                component={Paper}
                className={cssAtsHome.atsContainer}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                  }}
                >
                  <TextField
                    label="Search by Name or JD"
                    variant="outlined"
                    size="small"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    style={{
                      marginRight: "1rem",
                      width: "25%",
                    }}
                  />
                  <Select
                    variant="outlined"
                    size="small"
                    value={decisionFilter}
                    onChange={(e) => setDecisionFilter(e.target.value)}
                    displayEmpty
                    style={{ marginRight: "1rem", minWidth: "120px" }}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Selected">Selected</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </div>
                <Table
                  sx={{ "& .MuiTableCell-root": { textAlign: "center" } }}
                  aria-label="custom table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Job Description</TableCell>
                      <TableCell>Decision</TableCell>
                      <TableCell>Report</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>{row.cv}</TableCell>
                          <TableCell>{row.jd}</TableCell>
                          <TableCell>{row.decision}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = row.pdfPath;
                                link.download = row.pdfPath.split("/").pop(); // Extract the file name from the URL
                                link.click();
                              }}
                            >
                              Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default CustomTable;
