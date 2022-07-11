import React from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../services/AuthUser';
const Dashboard = () => {
    const { user } = AuthUser();
    return (
        <div>
            <h4>Name</h4>
            <p>{user.name}</p>
            <h4>Email</h4>
            <p>{user.email}</p>
            <Link className="nav-link" to={`/edit/${user.id}`}>Edit to  {user.name}</Link>
        </div>

    );
};

export default Dashboard;