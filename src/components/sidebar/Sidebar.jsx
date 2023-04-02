import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import { RxDashboard } from 'react-icons/rx';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlinePlayArrow } from 'react-icons/md';
import { CiMobile4 } from 'react-icons/ci';
import { GrFormClose } from 'react-icons/gr';
import { GoSignOut } from 'react-icons//go';
import { MdAddCircleOutline } from 'react-icons/md';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { AuthContext } from '../../contexts/AuthContexts';
import { MobileContext } from '../../contexts/MobileContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase-config/Firebase-config';
import { SidebarContext } from '../../contexts/SidebarContext';


const Sidebar = () => {
    const { mobilelists, setFilteredMobiles } = useContext(MobileContext);  
    const {sidebar, setSidebar,setFilter, setShowClearFilter} = useContext(SidebarContext);  
    let filteredItems = [];
    const filterItems = (brand) => {
        setSidebar('');
        setFilter('');
        setShowClearFilter(true)
        mobilelists.map((ele) => {
            if (ele.mobileDetail.brand === brand) {
                console.log(ele);
                if (ele.mobileDetail.status === 'active') {
                    filteredItems.push(ele);
                }
            };
        });
        setFilteredMobiles(filteredItems)
    }
    const { currentUser } = useContext(AuthContext);
    const signOutClicked = () => {
        signOut(auth).then(() => {
            // console.log('signed out');
        }).catch((error) => {
            // console.log('an error');
        });
    }
    const NavItemsClicked =() =>{
        setSidebar('');    
    }

    // console.log(sidebar);
    return (
        <div className={`sidebar ${sidebar}`}>
            <span className='closeIcon' onClick={()=>setSidebar('')}><GrFormClose /></span>
            {
                !currentUser ?
                    <div className="userView">
                        <h4>Categories</h4>
                        <div className="mobileBrands">
                            <span onClick={() => filterItems('iphone')}><MdOutlinePlayArrow /> I-Phone (3)</span>
                            <span onClick={() => filterItems('xiaomi')}><MdOutlinePlayArrow /> Xiaomi (10)</span>
                            <span onClick={() => filterItems('samsung')}><MdOutlinePlayArrow /> Samsung (7)</span>
                            <span onClick={() => filterItems('oppo')}><MdOutlinePlayArrow /> Oppo (5)</span>
                            <span onClick={() => filterItems('vivo')}><MdOutlinePlayArrow /> Vivo (9)</span>
                            <span onClick={() => filterItems('realme')}><MdOutlinePlayArrow /> Realme (3)</span>
                            <span onClick={() => filterItems('symphony')}><MdOutlinePlayArrow /> Symphony (4)</span>
                            <span onClick={() => filterItems('techno')}><MdOutlinePlayArrow /> Tecno (2)</span>
                            <span onClick={() => filterItems('itel')}><MdOutlinePlayArrow /> itel (2)</span>
                            <span onClick={() => filterItems('infinix')}><MdOutlinePlayArrow /> Infinix(1)</span>
                            <span onClick={() => filterItems('walton')}><MdOutlinePlayArrow /> Walton (6)</span>
                            <span onClick={() => filterItems('oneplus')}><MdOutlinePlayArrow /> OnePlus(1)</span>
                            <span onClick={() => filterItems('motorola')}><MdOutlinePlayArrow /> Motorola(0)</span>
                            <span onClick={() => filterItems('nokia')}><MdOutlinePlayArrow /> Nokia (0)</span>
                        </div>
                    </div>
                    :
                    <div className="adminView">
                        <h4>Admin Panel</h4>
                        <ul>
                            <li onClick={NavItemsClicked}><Link to="/"><span><AiOutlineHome /></span> Home</Link></li>
                            <li onClick={NavItemsClicked}><Link to="/dashboard"><span><RxDashboard /></span>  Dashboard</Link></li>
                            <li onClick={NavItemsClicked}><Link to="/mobiles"><span><CiMobile4 /></span> Mobiles</Link></li>
                            <li onClick={NavItemsClicked}><Link to="/add-mobile"><span><MdAddCircleOutline /></span> Add Mobile</Link></li>
                            <li onClick={NavItemsClicked}><Link to="/orders"><span><AiOutlineShoppingCart /></span> Orders</Link></li>
                            <li onClick={NavItemsClicked}><Link to="/customers"><span><HiOutlineUserGroup /></span> My Customers</Link></li>
                            <li className='signOutBtn' onClick={signOutClicked}><span className='icon'><GoSignOut /></span><span className='signouttext'> Sign Out </span></li>
                        </ul>
                    </div>
            }
        </div>
    );
};

export default Sidebar;