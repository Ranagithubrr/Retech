import React, { useEffect, useState } from 'react';
import './Addmobile.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../Firebase-config/Firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid'

const Addmobile = () => {
    const [imglink, setimglink] = useState('')
    const [imageUploaded, setImageUploaded] = useState(false);
    const [mobileDetail, setMobileDetail] = useState({
        brand: '',
        model: '',
        userange: '',
        price: null,
        ram: null,
        rom: null,
        frontCamera: null,
        rearCamera: null,
        condition: '',
        fingerprint: '',
        status: '',
        img: '',
        description: '',
    });

    const [images, setImages] = useState(null);
    const sendDataToDB = async () => {
        try {
            const docRef = await addDoc(collection(db, "mobiles"), {
                mobileDetail
            });
            console.log("Document written with ID: ", docRef.id);
            console.log(mobileDetail); // move console.log here
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    useEffect(() => {
        if (imageUploaded) {
            sendDataToDB();
        }
    }, [mobileDetail]);


    const Submitclicked = async (e) => {
        e.preventDefault();
        console.log(images);


        if (images === null || images === undefined) {
            console.log('not selected');
        }
        const storageRef = ref(storage, `images/${images.name}${v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, images);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },

            (error) => {
                console.log('there is an error');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        if (downloadURL) {
                            setMobileDetail({ ...mobileDetail, img: downloadURL });
                            setImageUploaded(true); // set imageUploaded to true
                        }
                    })
            }
        );
    }

    return (
        <div className='addmobileArea'>
            <h5>Add mobile</h5>
            {/* <button onClick={buttonClicked}>click me</button> */}
            <div className="row">
                <div className="col-6">
                    <select name="mobilename" id="" className='form-control' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, brand: e.target.value })
                    }}>
                        <option value="xiaomi">Xiaomi</option>
                        <option value="iphone">I-Phone</option>
                        <option value="samsung">Samsung</option>
                        <option value="oppo">Oppo</option>
                    </select>
                    <select name="userange" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, userange: e.target.value })
                    }}>
                        <option value="1 Month Only">Under 1 Month</option>
                        <option value="Between 1-6 Month Only">Between 1 - 6 Month</option>
                        <option value="Between 6-12 Month Only">Between 6 - 12 Month</option>
                        <option value="Over 1 Year Only">Over 1 Year</option>
                    </select>
                    <select name="ram" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, ram: e.target.value })
                    }}>
                        <option value="xiaomi">Ram (Default 4 GB)</option>
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
                    }} />
                    <select name="condition" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, condition: e.target.value })
                    }}>
                        <option value="xiaomi">Condition</option>
                        <option value="New">New</option>
                        <option value="Almost New">Almost New</option>
                        <option value="Nearly New">Nearly New</option>
                        <option value="Average Good">Average Good</option>
                        <option value="Usable">Usable</option>
                        <option value="Bad Condition">Bad Condition</option>
                    </select>
                    <textarea name="description" id="" cols="30" rows="10" placeholder='Description' className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, description: e.target.value })
                    }}></textarea>
                </div>
                <div className="col-6">
                    <input type="text" name='model' placeholder='Model' className='form-control' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, model: e.target.value })
                    }} />
                    <input type="number" name='price' placeholder='Price' className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, price: e.target.value })
                    }} />
                    <select name="rom" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, rom: e.target.value })
                    }}>
                        <option value="xiaomi">Rom (Default 16 GB)</option>
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
                    }} />
                    <select name="fingerprint" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, fingerprint: e.target.value })
                    }}>
                        <option value="undefined">Fingerprint</option>
                        <option value="No Fingerprint">No Fingerprint</option>
                        <option value="On the Back">On the Back</option>
                        <option value="Slide Mounted">Slide Mounted</option>
                        <option value="In Display">In Display</option>
                    </select>
                    <select name="userange" id="" className='form-control mt-3' onChange={(e) => {
                        setMobileDetail({ ...mobileDetail, status: e.target.value })
                    }}>
                        <option value="undefined">Status</option>
                        <option value="active">Active</option>
                        <option value="paused">Pause</option>
                    </select>
                    <label htmlFor="fileInput">
                        <span className="inputImagesIcon"><AiOutlinePlusCircle /></span>
                    </label>
                    <input type="file" id='fileInput' multiple onChange={(e) => setImages(e.target.files[0])} />

                    <button className='addmobileBtn' onClick={Submitclicked}>Add this Mobile</button>
                </div>
            </div>
        </div>
    );
};

export default Addmobile;