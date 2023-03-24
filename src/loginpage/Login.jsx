import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase-config/Firebase-config';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();      
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [icon, setIcon] = useState('hide');
    const [inputtype, setInputType] = useState('password');
    const Iconclicked = () => {
        inputtype === 'password' ? setInputType('text') : setInputType('password');
        icon === 'hide' ? setIcon('show') : setIcon('hide');
    }

    const signinClicked = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate('/')
                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='adminLogin'>
            <div className="loginArea">               
                <div className='rightArea'>
                    <h4>Admin Log in</h4>
                    <div className="inputBoxes">
                        <div className="inputs">
                            <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <input type={inputtype} placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                            <span className='hideSeeIcon' onClick={Iconclicked}>{icon === 'hide' ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                        </div>
                        <button onClick={signinClicked}>sign in</button>
                    </div>
                </div>
            </div>
        </div>       
    );
}

export default Login;
