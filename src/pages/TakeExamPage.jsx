import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import ExamQuestionComponent from "../components/ExamQuestionComponent";
import { submitAnswers, showSuccessMsg, showErrorMsg } from "../functions";
import { ToastContainer, toast } from "react-toastify";
import { Roller } from "react-awesome-spinners";
import { useAuthnContext } from "../hooks/useAuthnContext";

const TakeExam = () => {
    const { user } = useAuthnContext();

    const { logout } = useLogout();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingFailed, setisLoadingFailed] = useState(false);
    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState("");
    const [examQuestions, setExamQuestions] = useState([]);
    const [studentAnswers, setStudentAnswers] = useState([]);
    const [lecturerID, setLecturerID] = useState("");
    const [tempStorage, setTempStorage] = useState([]);

    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const { id } = useParams();

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}exam/${id}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                setLecturerID(data.lecturerID);
                setExamTitle(data.examTitle);
                setExamDuration(data.examDuration);
                setExamQuestions(data.questions);
                timeCountdown(data.examDuration);
                setIsLoading(false);
            })
            .catch(() => {
                setisLoadingFailed(true);
            });
    }, [])

    const timeCountdown = (duration) => {
        let seconds = duration * 60;

        const countInterval = setInterval(() => {
            if (seconds <= -1) {
                console.log("Time Up!");
                clearInterval(countInterval);
                setStudentAnswers(tempStorage);
                submitAnswers(user.email, lecturerID, examTitle, id, examQuestions, studentAnswers).then(data => {
                    if (data.success) {
                        showSuccessMsg(toast, data.success);
                    } else {
                        // showErrorMsg(toast, data);
                        logout();
                    }
                });
            } else {
                let hourVal = Math.floor(seconds / (60 * 60));
                let minuteVal = Math.floor(seconds / 60);
                let secondVal = seconds % 60;

                let hourValStr = hourVal.toString();
                let minuteValStr = minuteVal.toString();
                let secondValStr = secondVal.toString();

                if (hourValStr.length === 1) {
                    hourValStr = "0" + hourValStr;
                }

                if (minuteValStr.length === 1) {
                    minuteValStr = "0" + minuteValStr;
                }

                if (secondValStr.length === 1) {
                    secondValStr = "0" + secondValStr;
                }

                hourVal === 0 ? setHours("00") : setHours(hourValStr);
                minuteVal === 0 ? setMinutes("00") : setMinutes(minuteValStr);
                secondVal === 0 ? setSeconds("00") : setSeconds(secondValStr);
                seconds--;
            }
        }, 1000);
    }

    return (
        isLoading ? isLoadingFailed ? <main className="my-5 d-flex flex-column align-items-center justify-content-center">
            <h1>🙁</h1>
            <h6 className="fw-bold text-dark">Failed to Load! Check your internet connection.</h6>
        </main> : <main className="my-5 d-flex flex-column align-items-center justify-content-center">
            <Roller color={'#006400'} />
            <h6 className="mt-3 fw-bold text-dark">Loading...</h6>
        </main> :
            <main className="my-5 d-flex flex-column align-items-center justify-content-center">
                <div className="mb-5">
                    <span className="fw-bold">Timer:</span> {hours}:{minutes}:{seconds}
                </div>

                <span className='d-flex justify-content-between w-75 mx-5'>
                    <p><span className="fw-bold">Exam Title:</span> {examTitle}</p>
                    <p><span className="fw-bold">Exam Duration:</span> {examDuration} mins</p>
                </span>

                {
                    examQuestions.map((questionData, index) => (
                        <ExamQuestionComponent key={index} index={index} question={questionData.question} marks={questionData.marks} examQuestions={examQuestions} setStudentAnswers={setStudentAnswers} tempStorage={tempStorage} setTempStorage={setTempStorage} />
                    ))
                }

                <span className="w-75 d-flex justify-content-between">
                    <button className="custom-btn rounded-1 text-decoration-none py-3 text-white w-25 border border-none" onClick={() => {
                        setStudentAnswers(tempStorage);
                        submitAnswers(user.email, lecturerID, examTitle, id, examQuestions, studentAnswers).then(data => {
                            if (data.success) {
                                showSuccessMsg(toast, data.success);
                            } else {
                                showErrorMsg(toast, data);
                            }
                        });
                    }}
                    >Submit</button>
                </span>
                <ToastContainer />
            </main>
    )
}

export default TakeExam