import React, { useEffect, useState } from "react"
import { API } from "../global"
import axios from "axios"
import Item from "./item"
import Nav from "./Nav"


function Home() {

const [petData,setPetData] = useState([])
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
},[])

  return (
    <div >
      <Nav/>
      <div className="displayPet">
      {petData.map((item)=>{
        return(
          console.log(item),
        <Item className='item' key={item._id} item={item}/>
        )
      }
      )}
    </div>
    </div>
  )
}

export default Home