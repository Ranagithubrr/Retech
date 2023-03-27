import React, { useContext } from 'react';
import logo from '../../imgs/Retech-removebg-preview.png';
import './Navbar.css';
import { FiPhoneCall } from 'react-icons/fi';
import { FaMobileAlt } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { GoSignOut } from 'react-icons//go';
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase-config/Firebase-config';
import { AuthContext } from '../../contexts/AuthContexts';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { MobileContext } from '../../contexts/MobileContext';
import { useState } from 'react';


const Navbar = () => {

    let hotdealList;
    const { mobilelists } = useContext(MobileContext);
    if (mobilelists.length >= 3) {
        hotdealList = mobilelists.slice(0, 3)
    }    
    if (mobilelists.length >= 5) {
        hotdealList = mobilelists.slice(1, 5)
    }    
    if (mobilelists.length >= 10) {
        hotdealList = mobilelists.slice(5, 9)
    }    
    if (mobilelists.length >= 15) {
        hotdealList = mobilelists.slice(7, 11)
    }    
    if (mobilelists.length >= 35) {
        hotdealList = mobilelists.slice(15, 20)
    }    
    console.log(hotdealList);

    const signOutClicked = () => {
        signOut(auth).then(() => {
            console.log('signed out');
        }).catch((error) => {
            console.log('an error');
        });
    }
    const { currentUser } = useContext(AuthContext);
    return (
        <div className='navbarArea'>
            <nav>
                <div className="row">
                    <div className="col-12">
                        <div className="hotDeals"><span><ImFire /></span>Hot Deals</div>
                        <Marquee className='hotDealItems'>
                            {
                               hotdealList && hotdealList.map((ele)=>{
                                    return <span><FaMobileAlt /> {ele.mobileDetail.model}</span>
                                })
                            }
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