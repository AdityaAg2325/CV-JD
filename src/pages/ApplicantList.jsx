import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../components/button/Button';
import TablePagination from '@mui/material/TablePagination';
import Navbar from '../components/navbar/Navbar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';  
import cssAtsHome from "./AtsHome.module.css";

function createData(id, name, jd, decision) {
  return { id, name, jd, decision };
}

const rows = [
  createData(1, 'John Doe', 'Data Analyst', 'Approved'),
  createData(2, 'Jane Smith', 'Jave Developer', 'Pending'),
  createData(3, 'Alice Johnson', 'DevOps Engineer', 'Rejected'),
  createData(4, 'Michael Brown', 'Python Engineer', 'Approved'),
  createData(5, 'Laura Wilson', 'Python Engineer', 'Pending'),
  createData(6, 'John Doe', 'Python Engineer', 'Approved'),
  createData(7, 'Harsh Smith', 'Python Engineer', 'Pending'),
  createData(8, 'Alice Johnson', 'Python Engineer', 'Rejected'),
  createData(9, 'Michael Brown', 'Python Engineer', 'Approved'),
  createData(10, 'Laura Wilson', 'Python Engineer', 'Pending'),
];

function CustomTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameFilter, setNameFilter] = useState('');
  const [decisionFilter, setDecisionFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const filteredRows = rows
    .filter(row => row.name.toLowerCase().trim().includes(nameFilter.toLowerCase()))
    .filter(row => (decisionFilter ? row.decision === decisionFilter : true));

  return (
    <>
      <div className={cssAtsHome.atsParent}>
      <Navbar />
        <div className="tableWrapper">
        <TableContainer component={Paper} className={cssAtsHome.atsContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              style={{ marginRight: '1rem' }}
            />
         <Select 
            variant="outlined"
            size="small"
            value={decisionFilter}
            onChange={(e) => setDecisionFilter(e.target.value)}
            displayEmpty
            style={{ marginRight: '1rem', minWidth: '120px' }}
          >
            <MenuItem value="">
            <em>All</em>
            </MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
              
          </div>
          <Table sx={{ minWidth: 1200 }} aria-label="custom table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>JD</TableCell>
                <TableCell>Decision</TableCell>
                <TableCell>Report</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.jd}</TableCell>
                  <TableCell>{row.decision}</TableCell>
                  <TableCell>
                    <Button variant="contained" size="small">
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      </div>
    </>
  );
}

export default CustomTable;
