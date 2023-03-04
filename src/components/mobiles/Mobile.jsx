import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Iphone from '../../imgs/iphone1.webp';
import './mobile.css';
import { db } from '../../Firebase-config/Firebase-config'
import { collection, getDocs } from 'firebase/firestore';

const Mobile = () => {
    const [mobiles, setMobiles] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchPost = async () => {

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
        fetchPost();
    }, [])
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
                        mobiles.map((ele) => {
                            return (
                                <div className='col-4 mt-4'>
                                    <div className="mobileBox">
                                        <img src={'https://www.mobiledokan.com/wp-content/uploads/2022/03/Xiaomi-Redmi-Note-11.jpg'} className="img-fluid" alt="mobile" />
                                        <h6>{ele.mobileDetail.model}</h6>
                                        <span>৳ {ele.mobileDetail.price}</span>
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