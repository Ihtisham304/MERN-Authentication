import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
     authorisation();
  },[])
  const authorisation = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/verify`);
      if (res.data.status === 404) {
        navigate('/');
        alert("login First");
      }
      
      else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`);
      if (response.status === 200) {
        alert("logout success");
        navigate('/login')
      }
    } catch (error) {
      console.log("logout error", error);
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard;