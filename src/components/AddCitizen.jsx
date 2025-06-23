import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCitizen } from '../redux/citizenSlice';
import '../styles/AddCitizen.css';
import Loader from './Loader';

function AddCitizen() {
  const [form, setForm] = useState({ name: '', age: '', city: '', someNote: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
  if (!form.name || !form.city || !form.someNote || isNaN(form.age)) {
    toast.error('Please fill out all fields correctly.');
    return;
  }

  dispatch(addCitizen({
    name: form.name,
    age: Number(form.age),
    city: form.city,
    someNote: form.someNote,
  }));

  setForm({ name: '', age: '', city: '', someNote: '' });
};

  return (
    <>
      <Box className="add-citizen-form">
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Age" name="age" value={form.age} onChange={handleChange} />
        <TextField label="City" name="city" value={form.city} onChange={handleChange} />
        <TextField label="Note" name="someNote" value={form.someNote} onChange={handleChange} />
        <Button variant="contained" onClick={handleAdd}>Add Citizen</Button>
      </Box>
      <Loader open={loading} />
    </>
  );
}

export default AddCitizen;
