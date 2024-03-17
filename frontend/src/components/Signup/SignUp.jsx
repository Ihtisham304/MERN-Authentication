import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import '../components.css';
const SignUp = () => {
  const [formdata, setFormData] = useState({});
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
      ;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return alert("UserName Email and Password is required");
    }
    if (!/^[a-zA-Z_]+$/.test(formdata.username)) {
      alert("Username can only contain letters and/or underscores");
      return
    }
    if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      alert("Invalid email format");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, formdata)
      const responseData = response.data;

      if (responseData.message === "user already exists") {
        alert("User with this email is already exits");
      }
      else if (responseData.status === 200) {
        navigate('/login');
        alert("SignUp Successfully")
      }

    } catch (error) {
      console.log("erroe while signup", error);
    }
  }
  return (

    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2">Sign Up</h2>
              <p className="text-white-50 mb-3">Please enter your email and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="username" onChange={handleChange} label='User Name' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="email" onChange={handleChange} label='Email address' id='formControlLg' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="password" onChange={handleChange} label='Password' id='formControlLg' type='password' size="lg" />
              <MDBBtn outline type="submit" onClick={handleSubmit} className='mx-1 px-5 forsub-btn' color='white' size='lg'>
                SignUp
              </MDBBtn>
              <div>
                <p className="mb-0">Already have an account? <Link to={"/login"} class="text-white-50 fw-bold">Login</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>

    // <div>
    //   <h3>SignUp</h3>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="username">username</label>
    //     <input type="text" placeholder="UserName" name="username" onChange={handleChange}/>
    //     <label htmlFor="email">Email</label>
    //     <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
    //     <label htmlFor="password">Password</label>
    //     <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
    //     <button type="submit">SignUp</button>
    //     <p>already have account? <Link to={'/login'}>Login</Link></p>
    //   </form>
    // </div>
  )
}

export default SignUp