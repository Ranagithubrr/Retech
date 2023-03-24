import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Iphone from '../../imgs/iphone1.webp';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './mobile.css';
import { db } from '../../Firebase-config/Firebase-config'
import { collection, getDocs } from 'firebase/firestore';
import { MobileContext } from '../../contexts/MobileContext';

const Mobile = () => {
    const { mobilelists } = useContext(MobileContext);
    const { loading } = useContext(MobileContext);   
    console.log(loading);
    console.log(mobilelists);
    return (
        <div className="row">
            {
                loading ?
                    <div className="spinerBox">
                        <div class="spinner">
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                        </div>
                    </div> : (
                        mobilelists.length === 0 ? <div className="emptyDiv">
                            <span className='nomobiles'>OOPS ! You have no mobiles yet 😟</span>
                            <span className='addamobile'>Add one now
                                <Link to="/add-mobile">
                                    <span className="icon"><AiOutlinePlusCircle /></span>
                                </Link>
                            </span>
                        </div>
                            :
                            mobilelists.map((ele) => {
                                return (
                                    <div className='col-4 mt-4'>
                                        <div className="mobileBox">
                                            <div className="discount">
                                                <span>{ele.mobileDetail.discount ? ele.mobileDetail.discount : 40}% OFF</span>
                                            </div>
                                            <img src={ele.mobileDetail.img[0]} className="img-fluid" alt="mobile" />
                                            <div>
                                                <h6>{ele.mobileDetail.model}</h6>
                                                <span>৳ {ele.mobileDetail.price}</span>
                                            </div>
                                            <Link to={`/mobile/${ele.id}`} className='viewMobile'>View this Mobile</Link>
                                        </div>
                                    </div>
                                );
                            })
                    )
            }
        </div>
    );
};

export default Mobile;