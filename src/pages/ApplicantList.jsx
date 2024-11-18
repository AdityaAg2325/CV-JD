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
import { listing, downloadReport } from "../service/service";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import DateRangePicker from "../components/datepicker/DatePicker";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

function CustomTable({ row }) {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameFilter, setNameFilter] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("");
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(7, "day")]);
  const [showTable, setShowTable] = useState(false);

  const navigate = useNavigate();
  const handleReportClick = async () => {
    try {
      const response = await downloadReport(row.id);
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL);
    } catch (error) {
      toast.error("Error downloading report");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
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
      toast.success("Data fetched successfully!");
      setRows(transformedRows);
      setShowTable(true);
    } catch (err) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
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
    <>
    {loading && <Loader />}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={cssAtsHome.atsParent}>
        <Navbar />
        <div className={listCss.atsContainer}>
          <div className={listCss.goBackParent}>
          <div className={listCss.goBack} onClick={() => navigate(-1)}>{'<-'} Go Back</div></div>
          <div className={cssAtsHome.heading}>Applicant History</div>
          <div className={listCss.uppercontainer}>
            <div className={listCss.dateFilterParent}>
              <div className={listCss.selectDateRange}>Select Date Range: </div>
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
            </div>
            <Button
              className="fetchButton"
              variant="contained"
              onClick={() => fetchData()} 
            >
              ENTER
            </Button>
          </div>
          {showTable && (
            <div
              className="tableWrapper"
              style={{ width: "90%", margin: "0 auto" }}
            >
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
                      <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                        S.No
                      </TableCell>
                      <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                        Name
                      </TableCell>
                      <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                        Job Description
                      </TableCell>
                      <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                        Decision
                      </TableCell>
                      <TableCell sx={{ color: "#243c76", fontWeight: "bold" }}>
                        Report
                      </TableCell>
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
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {row.decision}
                          </TableCell>
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
    </>
  );
}

export default CustomTable;
