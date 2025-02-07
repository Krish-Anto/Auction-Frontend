import React, { useEffect, useState } from 'react';
import axios from "axios"
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { message } from 'antd';
import { API } from '../global';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePet } from './CreateSlice/petSlice';


const EditForm = () => {

  const { petId } = useParams(); // Get petId from the route params
  const dispatch = useDispatch();
  const navigate = useNavigate();
const location =useLocation();

const petpass = location.state?.pet;

  const pet = useSelector((state)=>
  state.pets.pets.find((pet) =>pet.id === petId)
  )
  

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    gender:  '',
    details:  '',
  });

  useEffect(()=>{
    const petData = petpass || pet;
    if(petData){
      setFormData({
        name: petData.name || '',
        breed: petData.breed || '',
        gender: petData.gender || '',
        details: petData.details || '',
      })
    }
  },[petpass,pet]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const token = localStorage.getItem('token');
      const edit = await axios.put(`${API}/pets/edit-pet/${petId}`,formData,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      if(edit.status === 201 || edit.status === 200 || edit.data.success){
        dispatch(updatePet({petId,formData}))
        message.success("Form Submitted Successfully")
      console.log('Adoption Form Data:', formData);
    // Reset form
    setFormData({
      name: '',
      breed: '',
      gender: '',
      details: '',
    });
    navigate('/home',{state : {refresh : true}});
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
              label="Breed"
              variant="outlined"
              type="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details"
              variant="outlined"
              name="details"
              value={formData.details}
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
              Submit 
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditForm;
