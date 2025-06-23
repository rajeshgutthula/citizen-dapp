import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import '../styles/CitizenList.css';

function CitizenList() {
  const citizens = useSelector((state) => state.citizen.citizens);

  if (!citizens.length) {
    return <Typography variant="h6" align="center">No citizens found. Please add one.</Typography>;
  }

  return (
    <TableContainer component={Paper} className="citizen-table">
      <Table aria-label="citizen table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Note</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citizens.map((citizen) => (
            <TableRow key={citizen.id}>
              <TableCell>{citizen.name}</TableCell>
              <TableCell>{citizen.age}</TableCell>
              <TableCell>{citizen.city}</TableCell>
              <TableCell>{citizen.someNote}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CitizenList;
