import React, { useEffect, useState } from "react"
import { API } from "../global"
import axios from "axios"
import Item from "./item"
import Nav from "./Nav"
import { useLocation } from "react-router-dom"



function Home() {

const [petData,setPetData] = useState([])
const location = useLocation()
const storedData = localStorage.getItem("token");
if (!storedData) {
  console.error("No user data found in localStorage");
  return;
}
const parsedData = storedData ? JSON.parse(storedData) : null;
// const petId = parsedData ? parsedData.petId : null;
// if (!petId) {
//   console.error("No petId found in localStorage");
//   return;
// }
const token = parsedData ? parsedData.token : null;
useEffect(()=>{
  const fetchdata = async ()=>{
    
    try{
      const res = await axios.get(`${API}/pets/get-pets`,{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
       });
       console.log(res.data);
        setPetData(res.data);
        
    }catch(error){
      console.error({ error: error.message });
      
    }
  };
    fetchdata();
  
},[location.state])
  return (
    <div >
      <Nav/>
      <div className="displayPet">
      {petData.map((pet)=>{
        return(
          console.log(pet),
        <Item className='item' key={pet._id} pet={pet} setPetdata={setPetData} petData ={petData}/>
        )
      }
      )}
    </div>   
    </div>
  )
}

export default Home