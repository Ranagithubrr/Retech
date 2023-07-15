import React, { useEffect, useState, useRef } from 'react';
import { FiCheckSquare, FiTrash2 } from 'react-icons/fi';
import { MdCall, MdPictureAsPdf } from 'react-icons/md';
import MobileImg from '../../../imgs/iphone1.webp';
import { db } from '../../../Firebase-config/Firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Logo from '../../../imgs/Retech-removebg-preview.png';
import './Order.css';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const Orders = () => {
    const [orders, setOrders] = useState({});
    const [completedOrders, setCompletedOrders] = useState({});
    const [loading, setLoading] = useState(true);
    const [completedloading, setCompletedLoading] = useState(true);
    const componentRef = useRef();

    // Fetching General Orders
    const fetchOrders = async () => {
        await getDocs(collection(db, "orders"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(mobiledatadb);
                setLoading(false)
                // console.log(orders);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    // Fetching Completed Orders
    const fetchCompletedOrders = async () => {
        await getDocs(collection(db, "completedorders"))
            .then((querySnapshot) => {
                const completedmobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCompletedOrders(completedmobiledatadb);
                setCompletedLoading(false)
                // console.log(completedOrders);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    useEffect(() => {
        fetchCompletedOrders();
    }, []);



    // Deleting Order

    const DeleteItem = async (id) => {
        await deleteDoc(doc(db, "orders", id))
            .then(() => {
                fetchOrders();
                toast.success('Order Deleted Successfully', {
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
    };

    // sending completed orders to DB and deleting that order from orders

    const completeOrder = async (ord) => {
        let completeOrderData = ord.order;
        try {
            const docRef = await addDoc(collection(db, "completedorders"), {
                completeOrderData
            });
            console.log("Complete order added: ", docRef.id);
            fetchCompletedOrders();
            toast.success('Order Marked as Complete', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        await deleteDoc(doc(db, "orders", ord.id))
            .then(() => {
                fetchOrders();
            });
    }


    // INVOICE GENERATE FUNCTIONS 
    const [invoiceData, setInvoiceData] = useState({
        orderid: '',
        name: '',
        device: '',
        price: '',
        time: '',
    })
    const InvoiceClicked = (ord) => {
        setInvoiceData({ ...invoiceData, orderid: ord.id, name: ord.completeOrderData.customername, device: ord.completeOrderData.device, price: ord.completeOrderData.price, time: ord.completeOrderData.time });
        // console.log(ord.id);
        // console.log(ord.completeOrderData);        
    }
    return (
        <div className='adminMobilesArea'>
            <Tooltip id="my-tooltip" variant="success" />
            <Tooltip id="my-tooltip2" variant="error" />
            <Tooltip id="my-tooltip3" />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">New Orders</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Completed Orders</button>
            </div>
            <nav>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
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
                            orders.length === 0 ?
                                <div className="emptyDiv">
                                    <span className='nomobiles'>Badluck ! You have no new orders yet 😟</span>
                                </div>
                                :
                                <table className='mobileTable newOrderTable'>
                                    <tbody>
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
                                        orders.map((ord, index) => {
                                            return <tr>
                                                <td><span className='serial'>{index + 1}. </span><img src={MobileImg} alt="mobileImage" /></td>
                                                <td>{ord.order.customername}</td>
                                                <td>{ord.order.phone}</td>
                                                <td>{ord.order.email != '' ? ord.order.email : '(email not provided)'}</td>
                                                <td>{ord.order.device}</td>
                                                <td>{ord.order.time}</td>
                                                <td> <span class="d-inline-block" data-tooltip-id="my-tooltip" data-tooltip-content="Mark Order as Complete"><span className='completeIcon' onClick={() => completeOrder(ord)}><FiCheckSquare /></span></span> <span class="d-inline-block" data-tooltip-id="my-tooltip2" data-tooltip-content="Delete Order"> <span className='deletIcon' onClick={() => DeleteItem(ord.id)}><FiTrash2 /></span> </span> </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                    }
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    {
                        completedloading ? <div className="spinerBox">
                            {/* <div class="spinner">
                                <div class="rect1"></div>
                                <div class="rect2"></div>
                                <div class="rect3"></div>
                                <div class="rect4"></div>
                                <div class="rect5"></div>
                            </div> */}
                            loading . . . . .
                        </div> :
                            completedOrders.length === 0 ?
                                <div className="emptyDiv">
                                    <span className='nomobiles'>Badluck ! You haven't completed any orders yet 😟</span>
                                </div>
                                :
                                <table className='completedorderdiv'>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th>Customer Name</th>
                                            <th>Order ID</th>
                                            <th>Device Choosen</th>
                                            <th>Order Placed</th>
                                            <th>Invoice</th>
                                        </tr>
                                        {
                                            completedOrders.map((ord, index) => {
                                                return <tr key={ord.id}>
                                                    <td><span className='serial'>{index + 1}.</span> <img src={MobileImg} alt="mobileImage" /></td>
                                                    <td>{ord.completeOrderData.customername}</td>
                                                    <td>{ord.id}</td>
                                                    <td>{ord.completeOrderData.device}</td>
                                                    <td>{ord.completeOrderData.time}</td>
                                                    <td><span className='deletIcon' onClick={() => InvoiceClicked(ord)} data-toggle="modal" data-target=".bd-example-modal-lg" data-tooltip-id="my-tooltip3" data-tooltip-content="Print Invoice"><MdPictureAsPdf /></span> </td>

                                                    {/* modal start */}
                                                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-lg">
                                                            <div class="modal-content">
                                                                <div className='printBtnBox'>
                                                                    <ReactToPrint trigger={() => <button>Print Invoice</button>} content={() => componentRef.current}>

                                                                    </ReactToPrint>

                                                                </div>
                                                                <button type='button' className='btn close closeButton' data-dismiss="modal" aria-label='Close'>
                                                                    <span aria-hidden='true'>x</span>
                                                                </button>
                                                                <div className="orderReceipt" ref={componentRef}>
                                                                    <div className="top">
                                                                        <div>
                                                                            <img src={Logo} className="img-fluid logo" alt="logo here" />
                                                                        </div>
                                                                        <div>
                                                                            <span className='orderreceipt'>Order Receipt</span>
                                                                        </div>
                                                                        <div>
                                                                            <h5>Rangpur,Bangladesh</h5>
                                                                            <p><span><MdCall /></span>01773229167</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="middle">
                                                                        <div>
                                                                            <h5>Dear, {invoiceData.name}</h5>
                                                                            <p>Your order has been confirmed. Your order id is <span> #{invoiceData.orderid} </span>. And this is your order invoice. <br /> Thank you for staying with us!</p>
                                                                        </div>
                                                                        <div className="mobileInfo">
                                                                            <div>
                                                                                <img src={MobileImg} alt="mobilleImg" className='img-fluid' />
                                                                                <div>
                                                                                    <h4>{invoiceData.device} </h4>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                Qty 1 <span>৳{invoiceData.price}.00/-</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="orderInfoArea">
                                                                            <div className="orderInfo">
                                                                                <div>
                                                                                    <span>Order Id</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>#{invoiceData.orderid}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="orderInfo">
                                                                                <div>
                                                                                    <span>Order Date</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>{invoiceData.time}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="orderInfo">
                                                                                <div>
                                                                                    <span>Subtotal</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>৳{invoiceData.price}.00</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="orderInfo">
                                                                                <div>
                                                                                    <span>Tax</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>00</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="orderInfo delivery">
                                                                                <div>
                                                                                    <span>Delivery Charge</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>00</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="total">
                                                                                <div>
                                                                                    <span>Total</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span>৳{invoiceData.price}.00/-</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bottom">
                                                                        <div>
                                                                            <span>Seller's Signature</span>
                                                                        </div>
                                                                        <div>
                                                                            <span>Buyer's Signature</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* modal ends */}
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                    }
                </div>
            </div>

        </div>
    );
};

export default Orders;