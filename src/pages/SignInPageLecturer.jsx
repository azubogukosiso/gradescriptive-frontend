import React, { useState } from 'react'
import { useSignInLecturer } from '../hooks/useSignInLecturer';
import { NavLink, useNavigate } from "react-router-dom";

import '../styles/SignUp.css';

const SignInPageLecturer = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [staffID, setStaffID] = useState('');
    const [password, setPassword] = useState('');

    const { signin, emailError, passwordError, staffIDError } = useSignInLecturer();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, staffID, password);
        const response = await signin(email, staffID, password);
        response.ok ? navigate('/lecturer') : null;
    }

    return (
        <main className='form-div'>
            <form onSubmit={submitHandler} className='rounded p-4 p-md-5 w-75 my-5'>
                <h2 className='text-center fw-bold'>Sign In - Lecturer</h2>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input required className='form-control border border-dark' id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                {
                    emailError && <div>{emailError}</div>
                }

                <div className='form-group mt-3'>
                    <label htmlFor="staffID">Staff ID:</label>
                    <input required className='form-control border border-dark' id='staffID' type="text" value={staffID} onChange={(e) => setStaffID(e.target.value)} />
                </div>

                {
                    staffIDError && <div>{staffIDError}</div>
                }

                <div className='form-group mt-3'>
                    <label htmlFor="password">Password:</label>
                    <input required className='form-control border border-dark' id='password' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {
                    passwordError && <div>{passwordError}</div>
                }

                <button className='border-none px-3 py-2 rounded-1 w-100 custom-btn text-white my-3'>Sign In</button>

                <NavLink to='/' className='text-dark'>Back to Home Page</NavLink>
            </form>
        </main>
    )
}

export default SignInPageLecturer;