import React from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import MobileImg from '../../../imgs/iphone1.webp';
const Customers = () => {
    return (
        <div className='adminMobilesArea'>
            <h5>My Customers</h5>
            <table>
                <tr>                    
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Order Placed</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>John Doe</td>
                    <td>01737822156</td>
                    <td>hello@gmail.com</td>
                    <td>Rangpur, Bangladesh</td>
                    <td>15/12/2023</td>
                    <td><span className='deletIcon'><FiTrash2 /></span> </td>
                </tr>                                                                     
            </table>
        </div>
    );
};

export default Customers;