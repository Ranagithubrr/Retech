import React, { useEffect, useState } from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import MobileImg from '../../../imgs/iphone1.webp';
import { db } from '../../../Firebase-config/Firebase-config';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './Order.css';

const Orders = () => {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchOrders = async () => {

        await getDocs(collection(db, "orders"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(mobiledatadb);
                setLoading(false)
                console.log(orders);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        fetchOrders();
    }, []);
    useEffect(() => {
        console.log(orders);
    }, [orders])

    const DeleteItem = async (id) => {
        await deleteDoc(doc(db, "orders", id))
            .then(() => {
                fetchOrders();
            })
    }
    return (
        <div className='adminMobilesArea'>
            <h5>All Orders</h5>
            {
                loading ? <div className="spinerBox">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div> :
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
                        {
                            orders.map((ord) => {
                                return <tr>
                                    <td><img src={MobileImg} alt="mobileImage" /></td>
                                    <td>{ord.order.customername}</td>
                                    <td>{ord.order.phone}</td>
                                    <td>{ord.order.email}</td>
                                    <td>{ord.order.device}</td>
                                    <td>{ord.order.time}</td>
                                    <td><span className='completeIcon'><FiCheckSquare /></span> <span className='deletIcon' onClick={() => DeleteItem(ord.id)}><FiTrash2 /></span> </td>
                                </tr>
                            })
                        }
                    </table>
            }
            {orders.length === 0 &&
                <div className="emptyDiv">
                    <span className='nomobiles'>Badluck ! You have no orders yet 😟</span>
                </div>
            }
        </div>
    );
};

export default Orders;