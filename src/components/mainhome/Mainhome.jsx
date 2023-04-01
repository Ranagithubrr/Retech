import React from 'react';
import { Outlet } from 'react-router-dom';
import Dasboard from '../dashboard/Dasboard';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

const Mainhome = () => {
    return (
        <div>
            <Navbar />
            <div className="mainArea">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default Mainhome;