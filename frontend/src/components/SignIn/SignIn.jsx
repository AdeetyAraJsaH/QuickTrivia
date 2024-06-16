import React, { useContext, useState } from 'react';
import axios from 'axios'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/context';

const SignIn = () => {
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState();
    const [checkEmail, setCheckEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const validateEmail = () => {
        const emailRegex = new RegExp("[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com|test.com)")
        // /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            setErrMsg("");
            console.log('email validated')
            return true;
        } else {
            setCheckEmail('Invalid Email')
        }
        return false;
    };

    const validatePassword = () => {
        if (password.length >= 7) {
            console.log('password validated')
            return true;
        } else {
            setCheckPassword('check password or password length.')
        }
        return false
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = {};
        if (validateEmail() && validatePassword()) {
            user.email = email;
            user.password = password;
            console.log("handle submit")
            await axios.post(`${process.env.SERVER_PORT}/api/users/auth`, user)
                .then(res => {
                    // console.log(res);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                    setUserInfo(res.data.user);
                    navigate('/');
                })
                .catch(err => {
                    // console.log(err);
                    setErrMsg(err.response.data.message ? err.response.data.message : err.message);
                })
        }
    };

    return (
        <div className="w-auto h-96 m-8 p-2 flex justify-center items-center">
            <div className='h-full w-1/3 min-w-64'>
                <div className='relative w-full h-full flex justify-center items-center p-2 rounded-lg bg-opacity-50 bg-gray-900 border-4 border-yellow-400'>
                    <div className="w-full h-full absolute flex flex-col backface-hidden rounded-lg">
                        <form className="w-full h-full flex flex-col items-center" method='POST'>
                            <h2 className='my-4 mb-0 pb-0 text-white'>SignIn</h2>
                            <input className={`text-center w-60 h-8 mt-4 rounded-md`} type="email" onChange={e => setEmail(e.target.value)} autoComplete='email' placeholder="Email" />
                            <p className="mt-0 mb-0 text-red-500 text-sm">{checkEmail}</p>
                            <input className={`text-center w-60 h-8 mt-4 rounded-md ${password.length < 7 ? "outline-red-400" : "outline-green-400"}`} autoComplete='new-password' type="password" placeholder="Password" onChange={e => {
                                setPassword(e.target.value);
                                setCheckPassword('')
                            }} />
                            <p className="mt-1 text-red-500 text-sm">{checkPassword}</p>
                            <button className="w-28 h-8 mt-8 px-2 bg-amber-400 rounded-md hover:bg-amber-500" type="submit" onClick={handleSignIn}>
                                SignIn
                            </button>
                            <a className="text-sm mt-4 text-yellow-400 hover:underline" id="forgot-password" href="#">
                                Forgot Password ?
                            </a>
                            <p className='mt-4 text-white text-center'>Don't have any account?</p>
                            <Link to="/SignUp">
                                <div className='text-base text-yellow-400 hover:cursor-pointer hover:underline'>
                                    SignUp
                                </div>
                            </Link>
                            <p className={`mt-1 text-white text-center ${errMsg.length > 11 ? "text-sm" : "text-lg"}`}>{errMsg ? <span>⚠️</span> : ""}{errMsg}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
