import axios from 'axios';
import '../components.css';
import React, { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom';
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

function ForgotPassword() {
    const [formdata, setFormData] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formdata.email) {
                return alert("Enter Email");
             }
             if (!/\S+@\S+\.\S+/.test(formdata.email)) {
                alert("Invalid email format");
                return;
              }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/forgot-pass`, formdata);
            const responseData = response.data;
            if (responseData.message === "User with this emailis no registered") {
                alert(responseData.message);
            }
            if(response.status === 200)
            {  
                alert("email send to you");
                navigate('/login');
            }
            else{
                alert(response.data);
            }
            
        } catch (error) {
            console.log("error forgot password", error);
        }
    }
    return (
        <MDBContainer>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <p className="text-white-50 mb-3">Please enter your email!</p>

                            <MDBInput aria-required wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="email" onChange={handleChange} label='Email address' id='formControlLg' type='email' size="lg" />
                            <MDBBtn outline type="submit" onClick={handleSubmit} className='mx-1 px-5 forsub-btn' color='white' size='lg'>
                                Send
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

export default ForgotPassword