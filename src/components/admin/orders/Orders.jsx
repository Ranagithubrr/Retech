import React from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import MobileImg from '../../../imgs/iphone1.webp';

const Orders = () => {
    return (
        <div className='adminMobilesArea'>
            <h5>All Orders</h5>
            <table>
                <tr>
                    <th></th>
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Device Choosen</th>
                    <th>Order Placed</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td>15/12/2023</td>
                    <td><span className='completeIcon'><FiCheckSquare /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td>15/12/2023</td>
                    <td><span className='completeIcon'><FiCheckSquare /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>Redmi note 11</td>
                    <td>hellojohn122@gmail.com</td>
                    <td>15000</td>
                    <td>15/12/2023</td>
                    <td><span className='completeIcon'><FiCheckSquare /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
                <tr>
                    <td><img src={MobileImg} alt="mobileImage" /></td>
                    <td>Redmi note 11</td>
                    <td>active</td>
                    <td>2</td>
                    <td>15000</td>
                    <td>15/12/2023</td>
                    <td><span className='completeIcon'><FiCheckSquare /></span> <span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                            
            </table>
        </div>
    );
};

export default Orders;