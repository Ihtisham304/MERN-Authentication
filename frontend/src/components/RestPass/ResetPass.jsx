import axios from 'axios';
import '../components.css';
import React, { useState } from 'react'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom';
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

function ResetPass() {
    const [formdata, setFormData] = useState({});
    const navigate = useNavigate();
    const {token} = useParams();
    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
         if (!formdata.password) {
            return alert("please enter new password")
         }
        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/resetpass/${token}`, formdata);
             if(response.status === 200)
            {
                alert("Password Has changed")
                navigate("/login");
            }
        
        } catch (error) {
            console.log("error reset password", error.message);
        }
    }
    return (
        <MDBContainer>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <p className="text-white-50 mb-3">Please enter your new password!</p>

                            <MDBInput aria-required wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' name="password" onChange={handleChange} label='New Password'  type='password' size="lg" />
                            <MDBBtn outline type="submit" onClick={handleSubmit} className='mx-1 px-5 forsub-btn' color='white' size='lg'>
                                Send
                            </MDBBtn>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    )
}

export default ResetPass;