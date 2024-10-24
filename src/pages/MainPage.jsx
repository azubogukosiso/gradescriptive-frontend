import { NavLink } from "react-router-dom";

import "../styles/Home.css";

const MainPage = () => {

    return (
        <main className="d-flex flex-column align-items-center justify-content-center">
            <NavLink className="custom-btn rounded-1 text-decoration-none px-5 py-3 text-white" to='/signin/lecturer'>Sign in as a Lecturer</NavLink>
            <span className="my-4"></span>
            <NavLink className="custom-btn rounded-1 text-decoration-none px-5 py-3 text-white" to='/signin'>Sign in as a Student</NavLink>
        </main>
    )
}

export default MainPage