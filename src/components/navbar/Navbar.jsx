import React from 'react';
import logo from '../../imgs/Retech-removebg-preview.png';
import './Navbar.css';
import {FiPhoneCall} from 'react-icons/fi'

const Navbar = () => {
    return (
        <div className='navbarArea'>
            <nav>
                <div className="row">
                    <div className="col-3">
                        <a href="#">
                            <img src={logo} alt="logo" className='img-fluid logoimg' />
                        </a>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">More</a></li>
                        </ul>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <a href="tel:01773229167" className='callNow'><span><FiPhoneCall /></span> Call Us Now : +880172727277</a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;