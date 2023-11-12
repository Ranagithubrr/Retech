import React, { useCallback, useEffect, useState } from 'react';
import './Addmobile.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../../Firebase-config/Firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addmobile = () => {    
    const [loading, setLoading] = useState(false)
    const [loadingClass, setLoadingClass] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);
    const [mobileDetail, setMobileDetail] = useState({
        brand: '',
        model: '',
        userange: '',
        price: '',
        ram: 4,
        rom: 16,
        frontCamera: '',
        rearCamera: '',
        condition: '',
        fingerprint: '',
        status: '',
        img: '',
        discount: 10,
        description: '',
    });

    const [images, setImages] = useState(null);

    const maxImages = 5;

    const sendDataToDB = useCallback(async () => {
        try {
            const docRef = await addDoc(collection(db, "mobiles"), {
                mobileDetail
            });
            console.log("Document written with ID: ", docRef.id);
            console.log(mobileDetail);
            setLoadingClass('');
            setLoading(false);
            toast.success('Item Added Successfully', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setMobileDetail({
                brand: '',
                model: '',
                userange: '',
                price: '',
                ram: 4,
                rom: 16,
                frontCamera: '',
                rearCamera: '',
                condition: '',
                fingerprint: '',
                status: '',
                img: '',
                discount: 10,
                description: '',
            });
            setImages(null)
        } catch (e) {
            console.error("Error adding document: ", e);
            setLoading(false);
        }

    },[mobileDetail]);

    useEffect(() => {
        if (imageUploaded) {
            if (mobileDetail.img.length !== 0 || mobileDetail.img !== '') {
                sendDataToDB();
                setImageUploaded(false)
            } else {
                window.alert('select at least one Image')
            }
        }
    }, [mobileDetail,imageUploaded,sendDataToDB]);

    const Submitclicked = async (e) => {
        console.log(mobileDetail);
        if (
            mobileDetail.brand === ''
            || mobileDetail.model === ''
            || mobileDetail.userange === ''
            || mobileDetail.price.toString === ''
            || mobileDetail.ram === ''
            || mobileDetail.rom === ''
            || mobileDetail.frontCamera === ''
            || mobileDetail.condition === ''
            || mobileDetail.fingerprint === ''
            || mobileDetail.status === ''
            || mobileDetail.description === ''

        ) {
            toast.error('Fill All The Fields', {
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
        else if (images === null || images === undefined) {
            // console.log('not selected');
            // window.alert('add at least one image')
            toast.error('Add at least one image', {
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
        else {
            setLoadingClass('loading');
            setLoading(true)
            e.preventDefault();
            console.log(images);


            // Upload each image in the array to storage and get download URL
            const promises = [];
            const downloadURLs = [];
            for (let i = 0; i < images.length && i < maxImages; i++) {
                const image = images[i];
                const storageRef = ref(storage, `images/${image.name}${v4()}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                const promise = new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload ${i + 1} is ` + progress + '% done');
                        },
                        (error) => {
                            console.log(`Error in Upload ${i + 1}`);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    if (downloadURL) {
                                        downloadURLs.push(downloadURL);
                                    }
                                    resolve(downloadURL);
                                })
                        }
                    );
                });
                promises.push(promise);
            }

            // Wait for all uploads to finish and update the mobileDetail with the download URLs
            Promise.all(promises).then(() => {
                setMobileDetail({ ...mobileDetail, img: downloadURLs });
                setImageUploaded(true);
            });
        }
    };
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
            <h5>Add mobile</h5>
            {/* <button onClick={buttonClicked}>click me</button> */}
            <div className="row">
                <div className="col-12 col-lg-6">
                    <select name="mobilename" id="" className='form-control' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, brand: e.target.value })
                    }}
                    value={mobileDetail.brand}
                    >
                        <option >Brand</option>
                        <option value="iphone">I-Phone</option>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="samsung">Samsung</option>
                        <option value="oppo">Oppo</option>
                        <option value="realme">Realme</option>
                        <option value="symphoney">symphoney</option>
                        <option value="techno">Techno</option>
                        <option value="itel">Itel</option>
                        <option value="infinix">Infinix</option>
                        <option value="walton">Walton</option>
                        <option value="motorola">Motorola</option>
                        <option value="nokia">Nokia</option>
                        <option value="oneplus">Oneplus</option>
                    </select>
                    <select name="userange" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, userange: e.target.value })
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
                        setMobileDetail({ ...mobileDetail, ram: e.target.value })
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
                        setMobileDetail({ ...mobileDetail, frontCamera: e.target.value })
                    }} 
                    value={mobileDetail.frontCamera}
                    />
                    <select name="condition" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, condition: e.target.value })
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
                        setMobileDetail({ ...mobileDetail, description: e.target.value })
                    }} value={mobileDetail.description}></textarea>
                </div>
                <div className="col-12 col-lg-6 mt-3 mt-md-0">
                    <input type="text" className='form-control' placeholder='Model (It will be shown up Everywhere)' onChange={(e) => setMobileDetail({ ...mobileDetail, model: e.target.value })} value={mobileDetail.model}/>
                    <input type="number" name='price' placeholder='Price' className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, price: e.target.value })
                    }} value={mobileDetail.price}/>
                    <select name="rom" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, rom: e.target.value })
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
                        setMobileDetail({ ...mobileDetail, rearCamera: e.target.value })
                    }} value={mobileDetail.rearCamera}/>
                    <select name="fingerprint" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, fingerprint: e.target.value })
                    }} value={mobileDetail.fingerprint}>
                        <option >Fingerprint</option>
                        <option value="No Fingerprint">No Fingerprint</option>
                        <option value="On the Back">On the Back</option>
                        <option value="Slide Mounted">Slide Mounted</option>
                        <option value="In Display">In Display</option>
                    </select>
                    <select name="userange" id="discount" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, status: e.target.value })
                    }} value={mobileDetail.status}>
                        <option>Status</option>
                        <option value="active">Active</option>
                        <option value="paused">Pause</option>
                    </select>
                    <select name="discount" id="discount" className='form-control mt-3'
                        onChange={(e) => setMobileDetail({ ...mobileDetail, discount: e.target.value })}
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
                    <div className="imgUploadBox">
                        <label htmlFor="fileInput">
                            <span className="inputImagesIcon"><AiOutlinePlusCircle /></span>
                        </label>
                        <input type="file" id='fileInput' multiple onChange={(e) => setImages(e.target.files)}/>
                        <span className='selectFiveText'>Select Up to 5 images</span>
                    </div>
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
                            loading ? <span>Please Wait</span> : <span>Add this Mobile</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Addmobile;
