import React, { useEffect, useState } from 'react';
import Mobile from '../mobiles/Mobile';
import './dashboard.css';



const Dasboard = () => {

    return (
        <div className='mainDashboard'>
            <div className="filterarea">
                <h4>Filter :</h4>
                <div>
                    <span>Brand</span>
                    <select name="mobiles" id="">
                        <option value="iphone">I Phone</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="samsung">samsung</option>
                        <option value="oppo">oppo</option>
                        <option value="vivo">vivo</option>
                    </select>
                </div>
                <div className="priceBox">
                    <span>Price</span>
                    <select name="prices" id="">
                        <option value="10000"> under ৳10000</option>
                        <option value="10000-15000"> Between ৳10000-৳15000</option>
                        <option value="15000-20000"> Between ৳15000-৳20000</option>
                        <option value="20000-25000"> Between ৳20000-৳25000</option>
                    </select>
                </div>
                <div className="usetime">
                    <span>Uses</span>
                    <select name="usetime" id="">
                        <option value="1m"> under 1 Month</option>
                        <option value="6m"> Between 1-6 Month</option>
                        <option value="6m-1y"> Between 6 Month - 1 Year</option>
                        <option value="1y">1 Year +</option>
                    </select>
                    <button className='filterBtn'>Filter Items</button>
                </div>
            </div>            
                <Mobile />                             
            
        </div>
    );
};

export default Dasboard;