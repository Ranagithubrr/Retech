import React, { useEffect, useState } from 'react';
import './detailmobile.css';
import { useParams } from 'react-router-dom';
import mobilePic from '../../imgs/iphone1.webp';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase-config/Firebase-config.js';
import loadingImg from '../../imgs/loading.gif';
import { toast, ToastContainer } from 'react-toastify';
import { validate } from 'email-validator';

const Detailmobile = () => {
    const { id } = useParams();
    const [mobile, setMobile] = useState({});
    const [loading, setLoading] = useState(true);
    const [mainImgState, setMainImgState] = useState(0);

    // order info

    const loadMobileData = async () => {

        const docRef = doc(db, "mobiles", id);
        const docSnap = await getDoc(docRef);
        try {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setMobile(docSnap.data().mobileDetail);
                setLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        catch (e) {
            console.log('error');
        }
    }
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const orderDate = `${day}/${month}/${year}`

    const [order, setOrder] = useState({
        device: '',
        customername: '',
        email: '',
        phone: '',
        address: '',
        price: null,
        time: orderDate
    });
    const [orderplaced, setOrderPlaced] = useState(false);
    const [orderloading, setOrderLoading] = useState(false);
    const [orderloadingclass, setOrderLoadingclass] = useState('');

    // send order data to db
    const sendDataToDB = async () => {
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                order
            });
            const docReftwo = await addDoc(collection(db, "customers"), {
                order
            });

            console.log("Document written with ID: ", docRef.id);
            setOrderPlaced(true)
            console.log(order);
            setOrderLoading(false);
            setOrderLoadingclass('')
        } catch (e) {
            console.error("Error adding document: ", e);
            setOrderLoadingclass('')
        }

    }




    const placeOrder = () => {
        if (
            order.customername === ''
            || order.phone === ''
            || order.address === ''
        ) {
            toast.warn('Fill all the fields', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (order.phone.length < 11 || order.phone.length > 11) {
            // window.alert('mobile must be 11 carecter');
            toast.warn('mobile must be 11 carecter', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else if (order.phone.charAt(0) != 0 || order.phone.charAt(1) != 1) {
            toast.warn('invalid mobile', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(order.phone.charAt(0));
            console.log(order.phone.charAt(1));
        }
        else if (order.email.length !== 0) {
            let isvalid = (validate(order.email));
            if (!isvalid) {
                console.log('email is not valid');
                toast.warn('invalid email', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                setOrderLoading(true);
                setOrderLoadingclass('loadingOrder')
                sendDataToDB();
                console.log('order placed successfully with validated email');
            }
        }
        else {
            setOrderLoading(true);
            setOrderLoadingclass('loadingOrder')
            sendDataToDB();
            console.log('order placed with out email');
        }
    }
    useEffect(() => {
        loadMobileData();
    }, []);
    useEffect(() => {
        console.log(mobile);
        setOrder({ ...order, device: mobile.model + ' - ' + mobile.ram + '/' + mobile.rom, price: mobile.price });
    }, [mobile]);

    return (
        <div className='detailMobileArea'>
            <ToastContainer
                position="top-center"
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
            {
                loading ? <div className="spinerBox">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </div>
                    :
                    <div className='row'>
                        <div className="col-6">
                            <div className="photoBox">
                                <div className="mainPhoto">
                                    {
                                        !loading && <img src={mobile.img[mainImgState]} className="img-fluid" alt="" />
                                    }

                                </div>
                                <div className="otherPhotos">
                                    {
                                        !loading && mobile.img.map((ele, index) => {
                                            return <div><img src={ele} alt="" onClick={() => setMainImgState(index)} className="img-fluid" /></div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="detailsBox">
                                <h5>Detail</h5>
                                <p>{mobile.description}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="rightDetailBox">
                                <h4 className='phoneName'>{mobile.model}</h4>
                                <h5 className='availablity'>Availability: <span>2 In Stock</span></h5>
                                <span className='detailspans'>Condition: {mobile.condition}</span>
                                <span className='detailspans'>Cash On Delivery: Yes</span>
                                <span className='detailspans'>Uses: {mobile.userange}</span>
                                <span className='detailspans'>Price: ৳<span>{mobile.price} </span>BDT Only</span>
                                <span className='detailspans'>Storage: {mobile.rom} GB</span>
                                <span className='detailspans'>Ram: {mobile.ram} GB</span>
                                <span className='detailspans'>Front-Camera: {mobile.frontCamera} MP</span>
                                <span className='detailspans'>Rear-Camera: {mobile.rearCamera} MP</span>
                                <span className='detailspans'>Finger-print: {mobile.fingerprint}</span>

                                <button type="button" class="orderBtn" data-toggle="modal" data-target="#exampleModalCenter">
                                    Order it Now
                                </button>

                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 class="modal-title" id="exampleModalLongTitle">Order it Now</h6>
                                                <h6><small>Always Cash On Delivery😍</small></h6>
                                                <button type="button" class="btn close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                {
                                                    !orderplaced ? <div className="orderbox">
                                                        <h5>{mobile.model}</h5>
                                                        <span>{`${mobile.ram} / ${mobile.rom}`}</span>
                                                        <input type="text" placeholder='Your Name' className='form-control mt-3' value={order.customername} onChange={(e) => setOrder({ ...order, customername: e.target.value })} />
                                                        <input type="email" placeholder='Your Email (optional)' className='form-control mt-3' value={order.email} onChange={(e) => setOrder({ ...order, email: e.target.value })} />
                                                        <input type="text" placeholder='Your Address (Location)' className='form-control mt-3' value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} />
                                                        <input type="number" placeholder='Your Phone Number' className='form-control mt-3' value={order.phone} onChange={(e) => setOrder({ ...order, phone: e.target.value })} />
                                                        <span><small> ** We will connect to this phone number **</small></span>
                                                    </div> : <div className="thankyou-box">
                                                        <span></span>
                                                        <span className='orderplaced'>✅ Order Placed</span>
                                                        <p className='thank'>😍Thank you😍</p>
                                                        <p className='connectSoon'>we've received your order, will connect you very soon</p>
                                                    </div>
                                                }


                                            </div>
                                            <div class="modal-footer">
                                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                                {
                                                    !orderplaced ?
                                                        (<button type="button" class={`orderBtn ${orderloadingclass}`} onClick={placeOrder} >
                                                            {
                                                                orderloading && <div class="sk-chase">
                                                                    <div class="sk-chase-dot"></div>
                                                                    <div class="sk-chase-dot"></div>
                                                                    <div class="sk-chase-dot"></div>
                                                                    <div class="sk-chase-dot"></div>
                                                                    <div class="sk-chase-dot"></div>
                                                                    <div class="sk-chase-dot"></div>
                                                                </div>
                                                            }

                                                            {
                                                                orderloading ? <span>
                                                                    Processing Order
                                                                </span> : <spa> Place Order</spa>
                                                            }


                                                        </button>)
                                                        :
                                                        (<button type="button" class="orderBtn" data-dismiss="modal">Close</button>)
                                                }
                                                {/* <button type="button" class="orderBtn" onClick={placeOrder}>Place Order</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Detailmobile;