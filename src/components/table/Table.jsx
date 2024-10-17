import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Table.css'

function createData(
  name,
  position,
  threshold,
  totalScore,
  decision,
  skillsMatch,
  experienceMatch,
  anomalies,
  relevanceScore
) {
  return {
    name,
    position,
    threshold,
    totalScore,
    decision,
    skillsMatch,
    experienceMatch,
    anomalies,
    relevanceScore
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <TableCell>{row.decision}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} sx={{ backgroundColor: '#eeeeee9c'}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1}}>
              <Typography sx={{ color: '#e74860', fontWeight: 'bold' }} variant="h6" gutterBottom component="div">
                Detailed Information
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead >
                  <TableRow>
                    <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Skills Match</TableCell>
                    <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Experience Match</TableCell>
                    <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Anomalies</TableCell>
                    <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Relevance Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.skillsMatch}</TableCell>
                    <TableCell>{row.experienceMatch}</TableCell>
                    <TableCell>{row.anomalies}</TableCell>
                    <TableCell>{row.relevanceScore}</TableCell>
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

const rows = [
  createData(
    "John Doe", 
    "Frontend Developer", 
    70,
    91, 
    "Selected", 
    85, 
    90, 
    "None", 
    88
  ),
  createData(
    "Jane Smith", 
    "Backend Developer", 
    75,
    87, 
    "Selected", 
    80, 
    85, 
    "Minor gap in career", 
    83
  ),
  createData(
    "Michael Johnson", 
    "Full Stack Developer", 
    70,
    60, 
    "Rejected", 
    75, 
    70, 
    "Switching between jobs frequently", 
    78
  ),
  createData(
    "Emily Davis", 
    "UI/UX Designer", 
    65,
    96, 
    "Selected", 
    95, 
    92, 
    "None", 
    94
  ),
  createData(
    "Chris Wilson", 
    "DevOps Engineer", 
    75,
    90, 
    "Rejected", 
    85, 
    88, 
    "None", 
    86
  )
];

export default function CollapsibleTable() {
  return (
    <div className="table-container">
    <TableContainer className='table-parent' component={Paper}  sx={{
          borderRadius: '10px', 
          border: '0.5px solid #243d764d'
        }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Details</TableCell>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Applicant's Name</TableCell>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Position Applied</TableCell>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Threshold Used</TableCell>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Total Score</TableCell>
            <TableCell sx={{ color: '#243c76', fontWeight: 'bold' }}>Decision</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
