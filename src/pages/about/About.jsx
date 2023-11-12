import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className='aboutPage'>
           <h2 className='aboutRetech'>About Retech</h2>
           <p>Retech is based on React + Firebase. Its is a simple web application with an admin panel for manage content.</p>
           <h6>Developer : <Link to="https://rana-rr.netlify.app" target='_blank'> Masud Rana </Link></h6>
        </div>
    );
};

export default About;