import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Iphone from '../../imgs/iphone1.webp';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './mobile.css';
import { db } from '../../Firebase-config/Firebase-config'
import { collection, getDocs } from 'firebase/firestore';
import { MobileContext } from '../../contexts/MobileContext';
import { AuthContext } from '../../contexts/AuthContexts';

const Mobile = () => {
    const { mobilelists, filteredmobilelists } = useContext(MobileContext);
    const { currentUser } = useContext(AuthContext)
    const { loading } = useContext(MobileContext);
    console.log(loading);
    // console.log(mobilelists);
    return (
    //    <div className="row">
    //         {
    //             loading ? <div className="spinerBox">
    //                 <div classname="spinner">
    //                     <div classname="rect1"></div>
    //                     <div classname="rect2"></div>
    //                     <div classname="rect3"></div>
    //                     <div classname="rect4"></div>
    //                     <div classname="rect5"></div>
    //                 </div>
    //             </div> : (
    //                 mobilelists.length === 0 ? (
    //                     currentUser ? <div className="emptyDiv">
    //                         <span className='nomobiles'>OOPS ! You have no mobiles yet 😟</span>
    //                         <span className='addamobile'>Add one now
    //                             <Link to="/add-mobile">
    //                                 <span className="icon"><AiOutlinePlusCircle /></span>
    //                             </Link>
    //                         </span>
    //                     </div> : <div className="emptyDiv">
    //                         <span className='nomobiles'>OOPS ! There is no mobiles yet 😟</span>
    //                     </div>
    //                 )
    //                     :
    //                     (
    //                         filteredmobilelists.length === 0 ? <div className="emptyDiv">
    //                             <span className='nomobiles'>OOPS ! No Match 😟</span>
    //                         </div> : filteredmobilelists.map((ele) => {
    //                             if (ele.mobileDetail.status !== 'paused') {
    //                                 return (
    //                                     <div className='col-6 col-lg-4 mt-4'>
    //                                         <div className="mobileBox">
    //                                             <div className="discount">
    //                                                 <span>{ele.mobileDetail.discount ? ele.mobileDetail.discount : 40}% OFF</span>
    //                                             </div>
    //                                             <img src={ele.mobileDetail.img[0]} className="img-fluid" alt="mobile" />
    //                                             <div>
    //                                                 <h6>{ele.mobileDetail.model}</h6>
    //                                                 <span>৳ {ele.mobileDetail.price}</span>
    //                                             </div>
    //                                             <Link to={`/mobile/${ele.id}`} className='viewMobile'>View this Mobile</Link>
    //                                         </div>
    //                                     </div>
    //                                 );
    //                             }

    //                         })
    //                     )

    //             )
    //         }
    //     </div>   
    <div className="row">
        {
            loading ? <div className="spinerBox">
                            <div classname="spinner">
                                <div classname="rect1"></div>
                                <div classname="rect2"></div>
                                <div classname="rect3"></div>
                                <div classname="rect4"></div>
                                <div classname="rect5"></div>
                            </div>
                            <span>loading but not working</span>
                        </div>  :
            <div>loaded</div>
        }
    </div>  
          
    );
};

export default Mobile;






{/* <div className="emptyDiv">
    <span className='nomobiles'>OOPS ! You have no mobiles yet 😟</span>
    <span className='addamobile'>Add one now
        <Link to="/add-mobile">
            <span className="icon"><AiOutlinePlusCircle /></span>
        </Link>
    </span>
</div> */}