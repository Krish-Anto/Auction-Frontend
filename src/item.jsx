import React, { useState } from 'react';
// import { Card } from 'antd';
// const { Meta } = Card;
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, Typography,IconButton,CardMedia, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
const Item = ({item}) => {
 
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    alert("Edit button clicked!");
  };
  const handleDelete = () => {
    alert("Edit button clicked!");
  };
  const handleSubmit = () => {
    navigate("/adoptForm")
  };
  return(
    <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.name}
      />
    <CardContent>
      <Typography variant="h5" component="div">
         Name : {item.name}
      </Typography>
      <Typography variant="h5" component="div">
         Breed : {item.breed}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {item.details}
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
    <h5>{item.details}</h5>
      <IconButton onClick={handleEdit} aria-label="edit">
          <EditIcon />
      </IconButton>,
      <IconButton onClick={handleDelete} aria-label="edit">
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
export default Item;