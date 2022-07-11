import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';

function Guest() {

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"><i className="fa-solid fa-film" style={{ color: "green" }}></i> Movie</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Routes>
            </div>
        </>
    );
}

export default Guest;