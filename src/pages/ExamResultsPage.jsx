import { useState, useEffect } from 'react';
import ExamResultComponent from '../components/ExamResultComponent';
import { useAuthnContext } from "../hooks/useAuthnContext";
import { Roller } from "react-awesome-spinners";

const ExamResultsPage = () => {
    const { user } = useAuthnContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFailed, setisLoadingFailed] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}exam/results`;
        const lecturerID = user.lecturerID;

        const lecturerID_JSON = { lecturerID }; // CONVERT TO JSON

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturerID_JSON),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setResults(data);
                setIsLoading(false);
            })
            .catch(() => {
                setisLoadingFailed(true);
            });
    }, []);

    return (
        isLoading ? isLoadingFailed ? <main className="my-5 d-flex flex-column align-items-center justify-content-center">
            <h1>🙁</h1>
            <h6 className="fw-bold text-dark">Failed to Load! Check your internet connection.</h6>
        </main> : <main className="my-5 d-flex flex-column align-items-center justify-content-center">
            <Roller color={'#006400'} />
            <h6 className="mt-3 fw-bold text-dark">Loading...</h6>
        </main> :
            <main className="my-5 d-flex justify-content-center align-items-center">
                <div className="w-75 mx-5">
                    {
                        results.map((result, index) => (
                            <ExamResultComponent key={index} result={result} />
                        ))
                    }
                </div>
            </main>
    )
}

export default ExamResultsPage