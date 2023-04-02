import React, { useEffect, useState } from 'react';
import './adminmobiles.css';
import MobileImg from '../../../imgs/iphone1.webp';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../Firebase-config/Firebase-config';
import { toast, ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';

const Adminmobiles = () => {

    const [mobiles, setMobiles] = useState({});
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(true);

    const fetchmobiles = async () => {
        await getDocs(collection(db, "mobiles"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMobiles(mobiledatadb);
                setLoading(true)
                // console.log(mobiles);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        fetchmobiles();
    }, [])
    useEffect(() => {
        // console.log(mobiles);
    }, [mobiles])

    const DeleteItem = async (id) => {
        await deleteDoc(doc(db, "mobiles", id))
            .then(() => {
                fetchmobiles();
                toast.success('Mobile Deleted Successfully', {
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
            <Tooltip id="my-tooltip2" variant="error" />
            <Tooltip id="my-tooltip3" />
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
            <h5>All Mobiles Listed</h5>


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
                    mobiles.length === 0 ?
                        <div className="emptyDiv">
                            <span className='nomobiles'>OOPS ! No mobiles added yet 😟</span>
                        </div>
                        :
                        <div className="adminmobileDiv">
                            <div className="mobileTable">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th></th>
                                        <th>Mobile Name</th>
                                        <th>Status</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        mobiles.map((mob, index) => {
                                            return <tr key={mob.id}>
                                                <td> <span className='serial'>{index + 1}.</span> <img src={MobileImg} alt="mobileImage" /></td>
                                                <td>{mob.mobileDetail.model}</td>
                                                <td><div className='activeStatus'> {mob.mobileDetail.status === 'active' ? <div className='activeIcon'></div> : <div className='pauseIcon'></div>} {mob.mobileDetail.status}</div></td>
                                                <td>2</td>
                                                <td>{mob.mobileDetail.price}</td>
                                                <td><Link to={`/update-mobile/${mob.id}`} data-tooltip-id="my-tooltip3" data-tooltip-content="Edit Mobile"><FiEdit /></Link> <span className='deletIcon' data-tooltip-id="my-tooltip2" data-tooltip-content="Delete Mobile" onClick={() => DeleteItem(mob.id)}><FiTrash2 /></span> </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
            }



        </div>

    );

};

export default Adminmobiles;