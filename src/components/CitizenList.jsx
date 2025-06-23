import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import '../styles/CitizenList.css';

function CitizenList() {
  const citizens = useSelector((state) => state.citizen.citizens);

  if (!citizens.length) {
    return <Typography variant="h6" align="center">No citizens found. Please add one.</Typography>;
  }

  return (
    <div className="citizen-grid">
      {citizens.map((citizen) => (
        <div key={citizen.id} className="citizen-card">
          <Card className="mui-card">
            <CardContent className="card-content">
              <Typography variant="h6" gutterBottom>{citizen.name}</Typography>
              <Typography gutterBottom>Age: {citizen.age}</Typography>
              <Typography gutterBottom>City:{citizen.city}</Typography>
              <Typography>Note: {citizen.someNote}</Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CitizenList;
