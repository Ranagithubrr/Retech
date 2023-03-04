import React, { useEffect, useState } from 'react';
import './detailmobile.css';
import { useParams } from 'react-router-dom';
import mobilePic from '../../imgs/iphone1.webp';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase-config/Firebase-config.js';

const Detailmobile = () => {
    const { id } = useParams();
    const [mobile,setMobile] = useState({})
    const loadMobileData = async () => {

        const docRef = doc(db, "mobiles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setMobile(docSnap.data().mobileDetail)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        loadMobileData();
    }, []);
    console.log(mobile.model);
    return (        
            <div className='row detailMobileArea'>
                <div className="col-6">
                    <div className="photoBox">
                        <div className="mainPhoto">
                            <img src={mobilePic} className="img-fluid" alt="" />
                        </div>
                        <div className="otherPhotos">
                            <img src={mobilePic} className="img-fluid" alt="" />
                            <img src={mobilePic} className="img-fluid" alt="" />
                            <img src={mobilePic} className="img-fluid" alt="" />
                            <img src={mobilePic} className="img-fluid" alt="" />
                            <img src={mobilePic} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="detailsBox">
                        <h5>Detail</h5>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad unde reiciendis quo nam culpa, incidunt libero commodi! Rerum, reiciendis sequi, suscipit quos vitae iusriam, aliqulam animi, minima, suscipit temporibus soluta repellendus. Reprehenderit impedit ipsum laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum minima maxime officia
                            autem laborum architecto numquam accusamus necessitatibus? Illo consequuntur laboriosam quaerat nam quis aliquid, ad alias magnam eaque tenetur, tempore repellendus nihil architecto,
                            aperiam consectetur rem dolore commodi voluptatibus quod quidem! Reiciendis accusamus eveniet dolor quidem fugiat
                            alias blanditiis molestias incidunt eius veritatis nisi cum eaque, dicta tenetur inventore voluptatibus provident porro! Obcaecati praesentium quas, inventore optio impedit tempora voluptatum eaque odio magnam nesciunt quis placeat qui. Aspernatur accusantium ducimus eaque id alias libero expedita aperiam in. Et, ullam temporibus sequi atque in reiciendis? Dolore voluptatem necessitatibus quis ipsam.</p>
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
                                        <div className="orderbox">
                                            <h5>Redmi Note 11</h5>
                                            <span>6/128</span>
                                            <input type="text" placeholder='Your Name' className='form-control mt-3' />
                                            <input type="email" placeholder='Your Email (optional)' className='form-control mt-3' />
                                            <input type="text" placeholder='Your Address (Location)' className='form-control mt-3' />
                                            <input type="phone" placeholder='Your Phone Number' className='form-control mt-3' />
                                            <span><small> ** We will connect to this phone number **</small></span>
                                        </div>
                                        {/* <div className="thankyou-box">
                                    <span></span>
                                    <span className='orderplaced'>✅ Order Placed</span>
                                    <p className='thank'>😍Thank you😍</p>
                                    <p className='connectSoon'>we've received your order, will connect you very soon</p>
                                </div> */}
                                    </div>
                                    <div class="modal-footer">
                                        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                        <button type="button" class="orderBtn">Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
    );
};

export default Detailmobile;