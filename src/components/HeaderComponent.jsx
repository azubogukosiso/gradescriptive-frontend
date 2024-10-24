import { useAuthnContext } from "../hooks/useAuthnContext";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import "../styles/Home.css";

const Header = () => {
    const navigate = useNavigate();

    const { user } = useAuthnContext()

    const { logout } = useLogout();

    return (
        <header>
            <div className='text-center my-4'>
                <div>
                    <h2 className="fw-bold">Gradescriptive</h2>
                    {user && (<span> {user.email} </span>)}
                </div>
                {
                    user ? user.userRole === 'student' ? (
                        <button className="custom-btn py-2 px-3 text-white mt-3 rounded-1" onClick={() => {
                            logout();
                            navigate('/')
                        }}>Log Out</button>
                    ) : null : null
                }
            </div>
            <hr className='mx-5' />
        </header>
    )
}

export default Header