import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const { logout } = useLogout();

    return (
        <main className="d-flex flex-column align-items-center justify-content-center">
            <NavLink className="custom-btn rounded-1 text-decoration-none px-5 py-3 text-white" to='/lecturer/set-exam'>Set Exams</NavLink>
            <span className="my-4"></span>
            <NavLink className="custom-btn rounded-1 text-decoration-none px-5 py-3 text-white" to='/lecturer/results'>View Results</NavLink>
            <span className="my-4"></span>
            <button className="custom-btn rounded-1 text-decoration-none px-5 py-3 text-white" onClick={() => {
                logout();
                navigate('/')
            }}>Log Out</button>
        </main>
    )
}

export default Home