import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addCitizen } from '../redux/citizenSlice';
import '../styles/AddCitizen.css';
import Loader from './Loader';
import { toast } from 'react-toastify';

function AddCitizen() {
  const [form, setForm] = useState({ name: '', age: '', city: '', someNote: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.name || !form.city || !form.someNote || isNaN(form.age)) {
      toast.error('❗ Please fill out all fields correctly.');
      return;
    }

    try {
      setLoading(true); // ✅ Show loader
      await dispatch(
        addCitizen({
          name: form.name,
          age: Number(form.age),
          city: form.city,
          someNote: form.someNote,
        })
      ).unwrap();

      // toast.success('✅ Citizen added successfully!');
      setForm({ name: '', age: '', city: '', someNote: '' });
    } catch (err) {
      console.error('Add Citizen Error:', err);
      toast.error('🚫 Failed to add citizen.');
    } finally {
      setLoading(false); // ✅ Hide loader
    }
  };

  return (
    <>
      <Box className="add-citizen-form">
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          label="Note"
          name="someNote"
          value={form.someNote}
          onChange={handleChange}
          disabled={loading}
        />
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Citizen'}
        </Button>
      </Box>

      <Loader open={loading} />
    </>
  );
}

export default AddCitizen;
