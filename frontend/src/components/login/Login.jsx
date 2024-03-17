import React from 'react'
import '../components.css';
import { useState } from 'react';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function FormD() {
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  }
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      alert("Email and password cannot be empty");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      alert("Invalid email format");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, formdata);
      const responseData = response.data;
    if (responseData.message === "Sign Up First") {
      alert("Email is not registered. Sign up first");
    } else if (responseData.message === "invalid password") {
      alert("Invalid password");
    } else if (responseData.status) {
      // If login is successful, redirect or perform any other action
      navigate('/');
      alert("Login Success");
    }
    } catch (error) {
      console.log("error login api calling frontend", error);
    }
  }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-3">Please enter your email and password!</p>

              <MDBInput aria-required wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="email" onChange={handleChange} label='Email address' type='email' size="lg" />
              <MDBInput aria-required wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="password" onChange={handleChange} label='Password' type='password' size="lg" />

              <p className="small mb-2 pb-lg-2"><Link class="text-white-50" to="/forgotpass">Forgot password?</Link></p>
              <MDBBtn outline type="submit" onClick={handleSubmit} className='mx-1 px-5 forsub-btn' color='white' size='lg'>
                Login
              </MDBBtn>
              <div>
                <p className="mb-0">Don't have an account? <Link to={"/signup"} class="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  )
}

export default FormD