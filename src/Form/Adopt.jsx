import React, { useState } from 'react';
import axios from "axios"
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { API } from '../../global';
import { message } from 'antd';


const AdoptPetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = {
    //   name: formData.name,
    //   email: formData.email,
    //   phone: formData.phone,
    //   details: formData.details
    // };
    try{
      const token = localStorage.getItem('token');
      const Adopter = await axios.post(`${API}/adoptForm/submit`,formData,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      if(Adopter.data.success){
        message.success("Form Submitted Successfully")
      console.log('Adoption Form Data:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
      }else{
        message.error("Failed to submit form.");
      }
    }
    catch(error){
        console.error("Error Submission Failed", error)
        message.error("Form Submission Failed");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Adopt a Pet
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AdoptPetForm;
