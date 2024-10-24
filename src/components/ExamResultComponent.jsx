import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";
import { showSuccessMsg } from "../functions";

const ExamResultComponent = ({ result }) => {

    const sendEmail = (examTitle, studentEmail, examResult) => {
        const apiUrl = `${process.env.REACT_APP_API_URL}exam/email`;

        const emailDetails = { examTitle, studentEmail, examResult };

        fetch(apiUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailDetails),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                showSuccessMsg(toast, data.msg);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="card w-100 mb-3" style={{ width: "20rem" }}>
                <div className="card-body">
                    <h5 className='card-title'>{result.examTitle}</h5>
                    <p>Student Email: {result.studentEmail}</p>
                    <p>Student Result: {result.examResult}</p>
                    <button className="custom-btn rounded-1 text-decoration-none text-white border border-none px-4 py-2" onClick={() => sendEmail(result.examTitle, result.studentEmail, result.examResult)}>Send to student email</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ExamResultComponent