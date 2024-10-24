import { useState, useEffect } from "react";
import ExamComponent from "../components/ExamComponent";
import { Roller } from "react-awesome-spinners";

const MainPageStudent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFailed, setisLoadingFailed] = useState(false);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}exam`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                setIsLoading(false);
                setExams(data);
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
                        exams.map((exam, index) => (
                            <ExamComponent key={index} exam={exam} />
                        ))
                    }
                </div>
            </main>
    )
}

export default MainPageStudent