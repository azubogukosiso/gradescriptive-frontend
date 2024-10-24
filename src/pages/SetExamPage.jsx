import { useState } from "react";
import SetQuestionComponent from "../components/SetQuestionComponent";
import { addOrRemoveQuestions, submitQuestions, showSuccessMsg, showErrorMsg } from "../functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthnContext } from "../hooks/useAuthnContext";

const SetExam = () => {
    const { user } = useAuthnContext();

    const [examTitle, setExamTitle] = useState("");
    const [examDuration, setExamDuration] = useState(0);
    const [questions, setQuestions] = useState([{ question: '', answer: '', marks: 0, keywords: '' }]);

    return (
        <main className="my-5 d-flex flex-column align-items-center justify-content-center">
            <span className="w-75 d-flex justify-content-between">
                <div>
                    <label>Exam Title:
                        <input required className='w-100 p-1' type="text" value={examTitle} onChange={(e) => setExamTitle(e.target.value)} name="exam-title" />
                    </label>
                </div>

                <div>
                    <label>Exam Duration (in mins):
                        <input required className='w-100 p-1' type="number" value={examDuration} onChange={(e) => setExamDuration(e.target.value)} name="exam-duration" />
                    </label>
                </div>
            </span>

            {
                questions.map((questionData, index) => (
                    <SetQuestionComponent key={index} questionData={questionData} index={index} questions={questions} setQuestions={setQuestions} addOrRemoveQuestions={addOrRemoveQuestions} />
                ))
            }

            <span className="w-75 d-flex justify-content-between">
                <button className="custom-btn rounded-1 text-decoration-none py-3 text-white w-25 border border-none" onClick={() => addOrRemoveQuestions("add", undefined, questions, setQuestions)}>Add a Question</button>

                <button className="custom-btn rounded-1 text-decoration-none py-3 text-white w-25 border border-none" onClick={() => {
                    submitQuestions(user.lecturerID, questions, examTitle, examDuration).then(data => {
                        data.success ? showSuccessMsg(toast, data.success) : showErrorMsg(toast, data);
                    });
                }
                }>Submit Questions</button>
            </span>
            <ToastContainer />
        </main>
    )
}

export default SetExam
