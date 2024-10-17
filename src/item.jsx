import React, { useState } from 'react';
// import { Card } from 'antd';
// const { Meta } = Card;
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, Typography,IconButton,CardMedia, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../global';
const pet = ({pet,setPetdata}) => {
 
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = async (petId) => {
    navigate("/editpet")
  };
  
  const handleDelete = async(petId) => {
    
    try {
      const upToken = localStorage.getItem("token")
      const { token } = JSON.parse(upToken);
      console.log(token)
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.delete(`${API}/pets/delete-pet/${petId}`, 
          {
              headers: {
                  "Authorization" : `Bearer ${token}` // Pass token in Authorization header
              }
          });
          console.log(response.data)
      console.log(response.data.message);
        setPetData((prevData)=>prevData.filter((pet)=>pet._id !== petId))
  } catch (error) {
      console.error("Error deleting pet:", error);
  }
  }
  const handleSubmit = () => {
    navigate("/adoptForm")
  };
  return(
    <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="200"
        image={pet.image}
        alt={pet.name}
      />
    <CardContent>
      <Typography variant="h5" component="div">
         Name : {pet.name}
      </Typography>
      <Typography variant="h5" component="div">
         Breed : {pet.breed}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {pet.details}
      </Typography>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        sx={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s',
        }}
      >
        <ExpandMoreIcon />
        {expanded ? <h1></h1>:<h6>More Details</h6>}
      </IconButton>
      {expanded ? (
  <div>
    <h5>{pet.details}</h5>
      <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon />
      </IconButton>,
      <IconButton onClick={()=>handleDelete(pet._id)} aria-label="edit">
          <DeleteIcon />
      </IconButton>
      <Button
      variant="contained" 
      onClick={handleSubmit}
      sx={{ 
        backgroundColor: 'orange', // Set the background color to orange
        color: 'white', // Set the text color to white for contrast
        borderRadius: 2, 
        padding: '10px 20px', 
        fontSize: '16px',
        '&:hover': {
          backgroundColor: '#ff8c00', // Darker shade of orange on hover
        },
      }}
      >
        Adopt Me
      </Button>
  </div>):null}
      
    </CardContent>
  </Card>
  )
};
export default pet;