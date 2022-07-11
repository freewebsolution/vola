import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import AuthUser from '../services/AuthUser';
import Edit from '../components/Edit';
function Auth() {
    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (!token !== undefined) {
            logout();
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"><i className="fa-solid fa-film" style={{ color: "green" }}></i> Movie</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <span role='button' className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>
                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route exact path='/edit/:id' element={<Edit />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;