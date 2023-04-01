import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../Firebase-config/Firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMobile = () => {
    const navigate = useNavigate();


    const { id } = useParams();
    // console.log('id is:', id);
    const [imglink, setimglink] = useState('');
    const [loading, setLoading] = useState(false)
    const [loadingClass, setLoadingClass] = useState('');
    const [mobile, setMobile] = useState({});


    const [mobileDetail, setUpdatedData] = useState({
        brand: '',
        model: '',
        userange: '',
        price: null,
        ram: 4,
        rom: 16,
        frontCamera: null,
        rearCamera: null,
        condition: '',
        fingerprint: '',
        status: '',
        img: '',
        discount: 10,
        description: '',
    });

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
    };

    useEffect(() => {
        loadMobileData();
    }, []);
    useEffect(() => {
        console.log(loading);
    }, [loading]);
    useEffect(() => {
        if (!loading) {
            setUpdatedData({
                brand: mobile.brand,
                model: mobile.model,
                userange: mobile.userange,
                price: mobile.price,
                ram: mobile.ram,
                rom: mobile.rom,
                frontCamera: mobile.frontCamera,
                rearCamera: mobile.rearCamera,
                condition: mobile.condition,
                fingerprint: mobile.fingerprint,
                status: mobile.status,
                img: mobile.img,
                discount: mobile.discount,
                description: mobile.description,
            });
            console.log(mobile);
            console.log(mobileDetail);
        }
    }, [mobile]);

    const Submitclicked = async (e) => {
        if (
            mobile.brand === mobileDetail.brand &&
            mobile.model === mobileDetail.model &&
            mobile.userange === mobileDetail.userange &&
            mobile.price === mobileDetail.price &&
            mobile.ram === mobileDetail.ram &&
            mobile.rom === mobileDetail.rom &&
            mobile.frontCamera === mobileDetail.frontCamera &&
            mobile.rearCamera === mobileDetail.rearCamera &&
            mobile.condition === mobileDetail.condition &&
            mobile.fingerprint === mobileDetail.fingerprint &&
            mobile.status === mobileDetail.status &&
            mobile.img === mobileDetail.img &&
            mobile.discount === mobileDetail.discount &&
            mobile.description === mobileDetail.description
        ) {
            toast.error('Nothing Changed', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }
        else {
            try {
                console.log(mobileDetail.discount);
                const mobref = doc(db, 'mobiles', id);

                updateDoc(mobref, { mobileDetail });
                toast.success('Data Updated Successfully', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                
            }
            catch (err) {
                console.log(err);
            }
        }
    };
    // !loading && console.log(mobileDetail.model);
    return (
        <div className='addmobileArea'>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h5>Update mobile</h5>
            {/* <button onClick={buttonClicked}>click me</button> */}
            <div className="row">
                <div className="col-12 col-lg-6">
                    <select name="mobilename" id="" className='form-control' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, brand: e.target.value })
                    }}
                        value={mobileDetail.brand}
                    >
                        <option >Brand</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="iphone">I-Phone</option>
                        <option value="samsung">Samsung</option>
                        <option value="oppo">Oppo</option>
                    </select>
                    <select name="userange" id="" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, userange: e.target.value })
                    }}
                        value={mobileDetail.userange}
                    >
                        <option >Usage</option>
                        <option value="1 Month Only">Under 1 Month</option>
                        <option value="Between 1-6 Month Only">Between 1 - 6 Month</option>
                        <option value="Between 6-12 Month Only">Between 6 - 12 Month</option>
                        <option value="Over 1 Year Only">Over 1 Year</option>
                    </select>
                    <select name="ram" id="" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, ram: e.target.value })
                    }}
                        value={mobileDetail.ram}
                    >
                        <option value="4">Ram (Default 4 GB)</option>
                        <option value="1">1 GB</option>
                        <option value="2">2 GB</option>
                        <option value="3">3 GB</option>
                        <option value="4">4 GB</option>
                        <option value="6">6 GB</option>
                        <option value="8">8 GB</option>
                        <option value="12">12 GB</option>
                        <option value="16">16 GB</option>
                    </select>
                    <input type="number" name='frontcamera' placeholder='Front Camera (MP)' className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, frontCamera: e.target.value })
                    }}
                        value={mobileDetail.frontCamera}
                    />
                    <select name="condition" id="" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, condition: e.target.value })
                    }}
                        value={mobileDetail.condition}
                    >
                        <option>Condition</option>
                        <option value="New">New</option>
                        <option value="Almost New">Almost New</option>
                        <option value="Nearly New">Nearly New</option>
                        <option value="Average Good">Average Good</option>
                        <option value="Usable">Usable</option>
                        <option value="Bad Condition">Bad Condition</option>
                    </select>
                    <textarea name="description" id="" cols="30" rows="10" placeholder='Description' className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, description: e.target.value })
                    }} value={mobileDetail.description}></textarea>
                </div>
                <div className="col-12 col-lg-6 mt-3 mt-md-0">
                    <input type="text" className='form-control' placeholder='Model (It will be shown up Everywhere)' onChange={(e) => setUpdatedData({ ...mobileDetail, model: e.target.value })} value={mobileDetail.model} />
                    <input type="number" name='price' placeholder='Price' className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, price: e.target.value })
                    }} value={mobileDetail.price} />
                    <select name="rom" id="" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, rom: e.target.value })
                    }} value={mobileDetail.rom}>
                        <option value="16">Rom (Default 16 GB)</option>
                        <option value="4">4 GB</option>
                        <option value="8">8 GB</option>
                        <option value="16">16 GB</option>
                        <option value="32">32 GB</option>
                        <option value="64">64 GB</option>
                        <option value="128">128 GB</option>
                        <option value="256">256 GB</option>
                        <option value="512">512 GB</option>
                        <option value="1024">1024 GB</option>
                    </select>
                    <input type="number" name='rearcamera' placeholder='Rear Camera (MP)' className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, rearCamera: e.target.value })
                    }} value={mobileDetail.rearCamera} />
                    <select name="fingerprint" id="" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, fingerprint: e.target.value })
                    }} value={mobileDetail.fingerprint}>
                        <option >Fingerprint</option>
                        <option value="No Fingerprint">No Fingerprint</option>
                        <option value="On the Back">On the Back</option>
                        <option value="Slide Mounted">Slide Mounted</option>
                        <option value="In Display">In Display</option>
                    </select>
                    <select name="userange" id="discount" className='form-control mt-3' onChange={(e) => {
                        setUpdatedData({ ...mobileDetail, status: e.target.value })
                    }} value={mobileDetail.status}>
                        <option>Status</option>
                        <option value="active">Active</option>
                        <option value="paused">Pause</option>
                    </select>
                    <select name="discount" id="discount" className='form-control mt-3'
                        onChange={(e) => setUpdatedData({ ...mobileDetail, discount: e.target.value })}
                        value={mobileDetail.discount}
                    >
                        <option value="20">Discount (Default 20%)</option>
                        <option value="20">20%</option>
                        <option value="25">25%</option>
                        <option value="30">30%</option>
                        <option value="35">35%</option>
                        <option value="40">40%</option>
                        <option value="45">45%</option>
                        <option value="50">50%</option>
                        <option value="55">55%</option>
                        <option value="60">60%</option>
                        <option value="65">65%</option>
                        <option value="70">70%</option>
                        <option value="75">75%</option>
                        <option value="80">80%</option>
                        <option value="85">85%</option>
                        <option value="90">90%</option>
                    </select>
                    <button className={`addmobileBtn ${loadingClass}`} onClick={Submitclicked}>
                        {
                            loading && <div class="sk-chase">
                                <div class="sk-chase-dot"></div>
                                <div class="sk-chase-dot"></div>
                                <div class="sk-chase-dot"></div>
                                <div class="sk-chase-dot"></div>
                                <div class="sk-chase-dot"></div>
                                <div class="sk-chase-dot"></div>
                            </div>
                        }
                        {
                            loading ? <span>Please Wait</span> : <span>Update Mobile</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateMobile;
