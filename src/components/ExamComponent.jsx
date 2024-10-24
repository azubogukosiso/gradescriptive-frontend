import { NavLink } from "react-router-dom";
import "../styles/Home.css";

const ExamComponent = ({ exam }) => {
    return (
        <div className="card w-100 mb-3" style={{ width: "20rem" }}>
            <div className="card-body">
                <h5 className='card-title'>{exam.examTitle}</h5>
                <p className='card-text'>Exam Duration: {exam.examDuration} mins</p>
                <NavLink to={"/student/" + exam._id}>
                    <button className="custom-btn rounded-1 text-decoration-none text-white border border-none px-4 py-2">Take Exam</button>
                </NavLink>
            </div>
        </div>
    )
}

export default ExamComponent