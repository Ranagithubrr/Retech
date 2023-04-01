import React from 'react';

const Contact = () => {
    return (
        <div className='aboutPage'>
           
            <form action="https://formsubmit.co/mr6430119@gmail.com" method="POST">
                <div className="row w-100 w-md-50 m-auto">
                <h5>Contact Us</h5>
                    <div className="col-12">
                        <input name='name' type="text" placeholder='Your Name' className='form-control mt-4 bg-light' required/>
                        <input name='email' type="email" placeholder='Your Email' className='form-control mt-4 bg-light' required/>
                        <input name='phone' type="tel" placeholder='Your Phone' className='form-control mt-4 bg-light' required/>
                        <textarea name='message' type="text" placeholder='Your Message' className='form-control mt-4 bg-light' rows="4" required/>
                        <button type='submit' className='btn btn-primary mt-3'>Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Contact;