import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../../../Firebase-config/Firebase-config';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'
const Customers = () => {

    const [customers, setOrders] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchCustomers = async () => {

        await getDocs(collection(db, "customers"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(mobiledatadb);
                setLoading(false)
                console.log(customers);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        fetchCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        console.log(customers);
    }, [customers])


    const DeleteItem = async (id) => {
        await deleteDoc(doc(db, "customers", id))
            .then(() => {
                fetchCustomers();
                toast.success('Customer Deleted Successfully', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }


    return (
        <div className='adminMobilesArea'>
            <Tooltip id="my-tooltip" variant="error" />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h5>My Customers</h5>
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
                customers.length === 0 ?
                <div className="emptyDiv">
                    <span className='nomobiles'>Badluck ! You have no customers yet 😟</span>
                </div>
                :
                    <div className="cutomersTable">
                        <table>
                            <tr>
                                <th>Customer Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {
                                !loading &&
                                customers.map((cus, index) => {
                                    return <tr>
                                        <td><span className='serial'>{index + 1}.</span> {cus.order.customername}</td>
                                        <td><a href={`tel:${cus.order.phone}`}>{cus.order.phone}</a></td>
                                        <td><a href={`mailto:${cus.order.email}`}>{cus.order.email}</a></td>
                                        <td>{cus.order.address}</td>
                                        <td><span data-tooltip-id="my-tooltip" data-tooltip-content="Delete Customer" className='deletIcon' onClick={() => DeleteItem(cus.id)}><FiTrash2 /></span> </td>
                                    </tr>

                                })
                            }

                        </table>
                    </div>
            }           
        </div>
    );
};

export default Customers;