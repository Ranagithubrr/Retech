import React from 'react';
import './About.css';
import Majed from '../../imgs/mazed-transformed.png'
import Suzzad from '../../imgs/suzad2.jpg';
import { Link } from 'react-router-dom';
import {FiUser} from 'react-icons/fi';
import {ImUserTie} from 'react-icons/im';
import {MdCall,MdMail} from 'react-icons/md';

const About = () => {
    return (
        <div className='aboutPage'>
            <h6 className='ps-2 px-md-5'>CEO & Founders</h6>
           <div className="row ">
                <div className="col-12 col-md-6">
                    <div className='members'>
                        <div className="top">
                                <img src={Suzzad} alt="suzzadImg" className='img-fluid'/>
                        </div>
                        <div className="bottom">
                                <h5><span className='icons'><FiUser /></span> Suzzad Alam</h5>
                                <Link to="#"><span className='icons'><ImUserTie /></span>CEO and Founder</Link>
                                <Link to="call:01773265165"><span className='icons'><MdCall /></span>01773332626</Link>
                                <Link to="mailto:suzzadalam@gmail.com"><span className='icons'><MdMail /></span>suzzadalam122@gmail.com</Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 py-5 py-md-0">
                    <div className='members'>
                        <div className="top">
                                <img src={Majed} alt="suzzadImg" className='img-fluid'/>
                        </div>
                        <div className="bottom">
                                <h5><span><FiUser /></span> Mazedul Islam</h5>
                                <Link to="#"><span><ImUserTie /></span>CEO and Founder</Link>
                                <Link to="call:01773265165"><span><MdCall /></span>01773332626</Link>
                                <Link to="mailto:suzzadalam@gmail.com"><span><MdMail /></span>suzzadalam122@gmail.com</Link>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default About;