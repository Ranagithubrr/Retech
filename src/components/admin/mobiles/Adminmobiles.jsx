import React, { useEffect, useState } from 'react';
import './adminmobiles.css';
import MobileImg from '../../../imgs/iphone1.webp';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../Firebase-config/Firebase-config';
import { toast, ToastContainer } from 'react-toastify';

const Adminmobiles = () => {

    const [mobiles, setMobiles] = useState({});
    const [loading, setLoading] = useState(true)

    const fetchmobiles = async () => {

        await getDocs(collection(db, "mobiles"))
            .then((querySnapshot) => {
                const mobiledatadb = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMobiles(mobiledatadb);
                setLoading(false)
                console.log(mobiles);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        fetchmobiles();
    }, [])
    useEffect(() => {
        console.log(mobiles);
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
            <table>
                <tr>
                    <th></th>
                    <th>Mobile Name</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                {
                    !loading && mobiles.map((mob) => {
                        return <tr>
                            <td><img src={MobileImg} alt="mobileImage" /></td>
                            <td>{mob.mobileDetail.model}</td>
                            <td>{mob.mobileDetail.status}</td>
                            <td>2</td>
                            <td>{mob.mobileDetail.price}</td>
                            <td><span><FiEdit /></span> <span className='deletIcon' onClick={() => DeleteItem(mob.id)}><FiTrash2 /></span> </td>
                        </tr>
                    })
                }
            </table>
            {mobiles.length === 0 &&
                <div className="emptyDiv">
                    <span className='nomobiles'>OOPS ! No mobiles added yet 😟</span>
                </div>
            }
        </div>

    );

};

export default Adminmobiles;