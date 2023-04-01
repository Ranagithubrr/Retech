import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { MobileContext } from '../../../contexts/MobileContext';
import { db } from '../../../Firebase-config/Firebase-config';
import CountUp from 'react-countup';
import './AdminDashboard.css';
const Admindash = () => {
    // total mobile
    const { mobilelists } = useContext(MobileContext)
    console.log(mobilelists);

    // total customer
    const [customers, setCustomers] = useState({});
    const fetchCustomers = async () => {
        await getDocs(collection(db, "customers"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCustomers(mobiledatadb);;
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchCustomers();
    }, []);
    // total order 
    const [orders, setOrders] = useState({});
    const fetchOrders = async () => {
        await getDocs(collection(db, "orders"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(mobiledatadb);
                console.log(orders);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    // Total Revenue Calculating
    let totalRevenue = 0;

    // completed total order
    const [loading, setLoading] = useState(true);
    const [completedOrders, setCompletedOrders] = useState({});
    !loading && console.log(completedOrders);
    !loading && completedOrders.map((ord) => {
        return totalRevenue = totalRevenue + parseInt(ord.completeOrderData.price)
    })
    console.log(totalRevenue);

    const fetchCompletedOrders = async () => {
        await getDocs(collection(db, "completedorders"))
            .then((querySnapshot) => {
                const completedmobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCompletedOrders(completedmobiledatadb);
                setLoading(false)
                console.log(completedOrders);
            })
            .catch((err) => {
                console.log(err);
            })
    };
    useEffect(() => {
        fetchCompletedOrders();
    }, []);

    return (
        <div className='adminDashboard'>              
            <div className="row">
                <div className="col-12 col-lg-4">
                    <div className='adminBoxes totalMobile'>
                        <span>{mobilelists.length ? <CountUp end={mobilelists.length} duration={2.75} /> : 0}</span>
                        <span></span>
                        <h4>Total Listed Mobile</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-8 mt-3 mt-md-0">
                    <div className='adminBoxes totalRevenue'>
                        <span>{<CountUp end={totalRevenue} duration={5} />}৳</span>
                        <h4>Total Revenue</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mt-3">
                    <div className='adminBoxes totalCustomer'>
                        <span>{customers.length ? <CountUp end={customers.length} duration={2.75} /> : 0}</span>
                        <h4>Total Customer</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mt-3">
                    <div className='adminBoxes pendingOrder'>
                        <span>{orders.length ? <CountUp end={orders.length} duration={2.75} /> : 0}</span>
                        <h4>Pending Order</h4>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mt-3">
                    <div className='adminBoxes completedOrder'>
                        <span>{completedOrders.length ? <CountUp end={completedOrders.length} duration={2.75} /> : 0}</span>
                        <h4>Completed Order</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admindash;