import { useState } from 'react';
import { useAuthnContext } from "./useAuthnContext";


export const useSignInLecturer = () => {
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [staffIDError, setStaffIDError] = useState(null);

    const { dispatch } = useAuthnContext();

    const signin = async (email, staffID, password) => {
        setEmailError(null);
        setPasswordError(null);
        setStaffIDError(null);

        const apiUrl = `${process.env.REACT_APP_API_URL}auth/lecturer`;

        const lecturerDetails = {
            email, staffID, password
        }

        console.log(JSON.stringify(lecturerDetails));

        const response = await fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturerDetails),
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json);
            if (json.email) {
                setEmailError(json.email);
            } else if (json.password) {
                setPasswordError(json.password);
            } else if (json.staffID) {
                setStaffIDError(json.staffID);
            }
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            return response;
        }
    }

    return { signin, emailError, passwordError, staffIDError };
}