import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../../../Firebase-config/Firebase-config';
import MobileImg from '../../../imgs/iphone1.webp';
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
                    customers.map((cus) => {
                        return <tr>
                            <td>{cus.order.customername}</td>
                            <td>{cus.order.device}</td>
                            <td>{cus.order.email}</td>
                            <td>{cus.order.address}</td>
                            <td><span className='deletIcon' onClick={() => DeleteItem(cus.id)}><FiTrash2 /></span> </td>
                        </tr>
                    })
                }

            </table>
            {customers.length === 0 &&
                <div className="emptyDiv">
                    <span className='nomobiles'>OOPS ! You have no Customers yet 😟</span>
                </div>
            }
        </div>
    );
};

export default Customers;