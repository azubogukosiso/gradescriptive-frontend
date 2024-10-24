import { useState } from 'react';
import { useAuthnContext } from "./useAuthnContext";


export const useSignInStudent = () => {
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [regNoError, setRegNoError] = useState(null);

    const { dispatch } = useAuthnContext();

    const signin = async (email, regNo, password) => {
        setEmailError(null);
        setPasswordError(null);
        setRegNoError(null);

        const apiUrl = `${process.env.REACT_APP_API_URL}auth/student`;

        const studentDetails = {
            email, regNo, password
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentDetails),
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json);
            if (json.email) {
                setEmailError(json.email);
            } else if (json.password) {
                setPasswordError(json.password);
            } else if (json.regNo) {
                setRegNoError(json.regNo);
            }
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            return response;
        }
    }

    return { signin, emailError, passwordError, regNoError };
}