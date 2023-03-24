import React, { useContext } from 'react';
import logo from '../../imgs/Retech-removebg-preview.png';
import './Navbar.css';
import {FiPhoneCall} from 'react-icons/fi';
import {GoSignOut} from 'react-icons//go';
import {signOut} from 'firebase/auth'
import {auth} from '../../Firebase-config/Firebase-config';
import { AuthContext } from '../../contexts/AuthContexts';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";


const Navbar = (props) => {
    const signOutClicked = () =>{
        signOut(auth).then(() => {
            console.log('signed out');
          }).catch((error) => {
            console.log('an error');
          });
    }
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='navbarArea'>
            <nav>
                <div className="row">
                    <div className="col-12">
                        <Marquee>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, unde? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus, consequatur?
                        </Marquee>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <Link to="/">
                            <img src={logo} alt="logo" className='img-fluid logoimg' />
                        </Link>
                    </div>
                    <div className="col-5 d-flex align-items-center">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/more">More</Link></li>
                        </ul>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                        <a href="tel:01773229167" className='callNow'><span><FiPhoneCall /></span> Call Us Now : +880172727277</a>
                        {
                            currentUser && <button className='signOutBtn' onClick={signOutClicked}>Sign Out <GoSignOut /></button>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;