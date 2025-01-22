import { useState, useEffect } from 'react';

import auth from '../utils/auth.js';

const Dashboard = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user projects
        if (auth.loggedIn()) {
            const user = auth.getProfile();
        } else {
            const user = null;
        } else {
            setUser(null);
        }
    }, []);
    // Display user projects

    const userProjects = () => {
        // Get user projects
        // Display user projects
    }

    const communityProjects = () => {
        // Get community projects
        // Display community projects
    }

    if (localStorage.getItem('token')) {
        // Get user from token
        // Set user
        const user = 'user';
    }

    if (user) {
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>Welcome {user}!</h1>
                <div>
                    {userProjects}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>Please <Link to="/signUp">Sign Up</Link> or <Link to="/login">Login</Link>.</h2>
                <div>
                    {communityProjects}
                </div>
            </div>
        );
    }
}

export default Dashboard;