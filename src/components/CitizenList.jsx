import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@mui/material';
import '../styles/CitizenList.css';

function CitizenList() {
  const citizens = useSelector((state) => state.citizen.citizens);

  if (!citizens.length) {
    return <Typography variant="h6">No citizens found. Please add one.</Typography>;
  }

  return (
    <Box className="citizen-list">
      {citizens.map((citizen) => (
        <Card key={citizen.id} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography variant="h6">{citizen.name}</Typography>
            <Typography>Age: {citizen.age}</Typography>
            <Typography>City: {citizen.city}</Typography>
            <Typography>Note: {citizen.someNote}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default CitizenList;
