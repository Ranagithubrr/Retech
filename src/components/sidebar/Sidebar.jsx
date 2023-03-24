import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { CiMobile4 } from 'react-icons/ci';
import { MdAddCircleOutline } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { AuthContext } from '../../contexts/AuthContexts';

const Sidebar = () => {
    const {currentUser} = useContext(AuthContext);
    return (
        <div className='sidebar'>
            {
                !currentUser ?
                    <div className="userView">
                        <h4>Categories</h4>
                        <div className="mobileBrands">
                            <span>I-Phone (3)</span>
                            <span>Xiaomi (10)</span>
                            <span>Samsung (7)</span>
                            <span>Oppo (5)</span>
                            <span>Vivo (9)</span>
                            <span>Realme (3)</span>
                            <span>Symphony (4)</span>
                            <span>Tecno (2)</span>
                            <span>itel (2)</span>
                            <span>Infinix(1)</span>
                            <span>Walton (6)</span>
                            <span>OnePlus(1)</span>
                            <span>Motorola(0)</span>
                            <span>Nokia (0)</span>
                        </div>
                    </div>
                    :
                    <div className="adminView">
                        <h4>Admin Panel</h4>
                        <ul>
                            <li><Link to="/"><span><AiOutlineHome /></span> Home</Link></li>
                            <li><Link to="/dashboard"><span><RxDashboard /></span>  Dashboard</Link></li>
                            <li><Link to="/mobiles"><span><CiMobile4 /></span> Mobiles</Link></li>
                            <li><Link to="/add-mobile"><span><MdAddCircleOutline /></span> Add Mobile</Link></li>
                            <li><Link to="/orders"><span><AiOutlineShoppingCart /></span> Orders</Link></li>
                            <li><Link to="/customers"><span><HiOutlineUserGroup /></span> My Customers</Link></li>
                        </ul>
                    </div>
            }
        </div>
    );
};

export default Sidebar;