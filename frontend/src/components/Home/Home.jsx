import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
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
      console.log(res);
    } catch (error) {
      alert("unathorized");
    }
  }


  return (
    <div>
      <button onClick={authorisation} style={{ color: "red" }}> Dashboard</button>
    </div>
  )
}

export default Home