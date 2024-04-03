import React from 'react'
import Home from '../pages/Home'
import  Contact from '../pages/Contact'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsDetails from '../pages/Doctors/DoctorsDetails'
import Signup from '../pages/Signup'
import Community from '../pages/Community'

import {Routes, Route} from  "react-router-dom";
import Medicine from '../pages/Medicine'
import Checkup from '../pages/medicalserviecs/Checkup'
const Routers = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/register" element={<Signup/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/services" element={<Services />}/>
      <Route path="/doctors" element={<Doctors />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/doctors/:id" element={<DoctorsDetails/>}/>
      <Route path='/community' element={<Community/>}/>
      <Route path='/medicine' element={<Medicine/>}/>
      <Route path='/checkup' element={<Checkup/>}/>
    </Routes>
    </>
  )
}

export default Routers