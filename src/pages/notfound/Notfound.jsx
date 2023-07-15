import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
            <h1 className='display-1 fw-bold'>404</h1>
            <h2>OOPS ! ! !</h2>
            <span className='display-6 fw-semibold'> Page Not Found</span>
            <span>Go to <Link to='/' className='text-decoration-none'>Home</Link></span>
        </div>
    );
};

export default Notfound;