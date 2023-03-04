import React from 'react';
import './adminmobiles.css';
import MobileImg from '../../../imgs/iphone1.webp';
import {FiEdit, FiTrash2} from 'react-icons/fi'

const Adminmobiles = () => {
    return (
        <div className='adminMobilesArea'>
            <h5>All Mobiles Listed</h5>
            <table>
                <tr>
                    <th></th>
                    <th>Mobile Name</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td><span><FiEdit /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td><span><FiEdit /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td><span><FiEdit /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td><span><FiEdit /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
            </table>
        </div>
    );
};

export default Adminmobiles;