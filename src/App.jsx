import './App.css'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './Signup'
import AddPet from './AddPet'
import AdoptPetForm from './Form/Adopt'
import EditForm from './EditPet'


function App() {
  
  return (
    <div className="App" >
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/addpets' element={<AddPet/>} />
      <Route path='/adoptForm' element={<AdoptPetForm/>} />
      <Route path='/editpet' element={<EditForm/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
