import React, { useState } from 'react';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase-config/Firebase-config';

const Login = () => {
    const [inputtype, setInputType] = useState('password');
    const [icon, setIcon] = useState('hide');
    const Iconclicked = () => {
        inputtype === 'password' ? setInputType('text') : setInputType('password');
        icon === 'hide' ? setIcon('show') : setIcon('hide');
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const LogINClicked = async ()  => {
        try{
            await signInWithEmailAndPassword(auth,email,password);
            alert('success')
        }
        catch(err){
            console.log(err);
            // alert('failed')
        }
    }
    return (
        <div className='adminLogin'>
            <div className="loginArea">
                <div className="rightArea">
                    <h4>Admin Log in</h4>
                    <div className="inputBoxes">
                        <div className="inputs">
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <input type={inputtype} className='passwordInput' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.password)} />
                            <span className='hideSeeIcon' onClick={Iconclicked}>{icon === 'hide' ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                        </div>

                        <button onClick={LogINClicked}>Log in</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;