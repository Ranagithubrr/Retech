import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Iphone from '../../imgs/iphone1.webp';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './mobile.css';
import { db } from '../../Firebase-config/Firebase-config'
import { collection, getDocs } from 'firebase/firestore';

const Mobile = () => {
    const [mobiles, setMobiles] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchmobiles = async () => {

        await getDocs(collection(db, "mobiles"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMobiles(mobiledatadb);
                setLoading(false)
                console.log(mobiles);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        fetchmobiles();
    }, [])
    useEffect(() => {
        console.log(mobiles);
    }, [mobiles])
    // console.log('id is: ',mobiles[0].id);
    // console.log('id is: ',mobiles[0].mobileDetail);
    // console.log(mobiles.length);
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
                        mobiles.length === 0 ? <div className="emptyDiv">
                            <span className='nomobiles'>OOPS ! You have no mobiles yet 😟</span>
                            <span className='addamobile'>Add one now
                                <Link to="/add-mobile">
                                    <span className="icon"><AiOutlinePlusCircle /></span>
                                </Link>
                            </span>
                        </div>
                            :
                            mobiles.map((ele) => {
                                return (
                                    <div className='col-4 mt-4'>
                                        <div className="mobileBox">
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