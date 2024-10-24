import React, { useState } from 'react';
import { useSignInStudent } from "../hooks/useSignInStudent";
import { NavLink, useNavigate } from "react-router-dom";

import '../styles/SignUp.css';

const SignInPageStudent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');

    const { signin, emailError, passwordError, regNoError } = useSignInStudent();


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await signin(email, regNo, password);
        response.ok ? navigate('/student') : null;
    }

    return (
        <main className='form-div'>
            <form onSubmit={submitHandler} className='rounded p-4 p-md-5 w-75 my-5'>
                <h2 className='text-center fw-bold'>Sign In</h2>
                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input required className='form-control border border-dark' id='email' type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>

                {
                    emailError && <div>{emailError}</div>
                }

                <div className='form-group mt-3'>
                    <label htmlFor="regNo">Reg No:</label>
                    <input required className='form-control border border-dark' id='regNo' type="text" onChange={(e) => setRegNo(e.target.value)} />
                </div>

                {
                    regNoError && <div>{regNoError}</div>
                }

                <div className='form-group mt-3'>
                    <label htmlFor="password">Password:</label>
                    <input required className='form-control border border-dark' id='password' type="text" onChange={(e) => setPassword(e.target.value)} />
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

export default SignInPageStudent;