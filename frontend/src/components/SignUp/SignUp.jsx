import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css'
import axios from 'axios'
import UserContext from '../../context/context';

const SignUp = () => {
    const navigate = useNavigate();

    const { setUserInfo } = React.useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
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
        if (password1.length >= 7 && password2.length >= 7) {
            if (password1 === password2) {
                console.log('password validated')
                return true;
            } else {
                setCheckPassword("Password not Matched");
            }
        } else {
            setCheckPassword('check password or password length')
        }
        return false
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("handle submit")
        const user = {};
        if (validateEmail() && validatePassword()) {
            user.name = userName;
            user.email = email;
            user.password = password1;

            await axios.post("/api/users", user)
                .then(res => {
                    console.log(res);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                    setUserInfo(res.data.user);
                    navigate('/');
                })
                .catch(err => {
                    setErrMsg(err.message)
                    setCheckEmail('');
                    setCheckPassword('');
                })

        }
    };

    return (
        <div className="w-auto h-96 m-8 p-2 flex justify-center items-center">
            <div className="h-full w-1/3 min-w-64">
                <div className='relative w-full h-full flex justify-center items-center p-2 rounded-lg bg-opacity-50 bg-gray-900 border-4 border-yellow-400'>
                    <div className="w-full h-full absolute flex flex-col rounded-lg">
                        <form className="w-full h-full flex flex-col items-center"
                            method='POST'>
                            <h2 className="my-4 mb-0 pb-0 text-white">SignUp</h2>
                            <input className={`text-center w-60 h-8 mt-4 rounded-md`} type="text" onChange={e => setUserName(e.target.value)} autoComplete='username' placeholder="Username" />
                            <input className={`text-center w-60 h-8 mt-4 rounded-md`} type="email" onChange={e => setEmail(e.target.value)} autoComplete='email' placeholder="Email" />
                            <p className="mt-0 mb-0 text-red-500 text-sm">{checkEmail}</p>
                            <input className={`text-center w-60 h-8 mt-4 rounded-md ${password1.length < 7 ? "outline-red-400" : "outline-green-400"}`} autoComplete='new-password' type="password" placeholder="Password" onChange={e => {
                                setPassword1(e.target.value);
                                setCheckPassword('')
                            }} />
                            <input className={`text-center w-60 h-8 mt-4 rounded-md ${password2.length < 7 ? "outline-red-400" : "outline-green-400"}`} type="password" autoComplete='new-password' placeholder="Confirm Password" onChange={e => {
                                setPassword2(e.target.value);
                                setCheckPassword('')
                            }} />
                            <p className="mt-1 text-red-500 text-sm">{checkPassword}</p>
                            <button className="w-28 h-8 mt-4 px-1 bg-amber-400 rounded-md hover:bg-amber-500" type="submit" onClick={handleSignUp}>
                                SignUp
                            </button>
                            <p className='mt-4 text-white text-center'>Already have an Email ?</p>
                            <Link to="/SignIn">
                                <div className="text-base text-yellow-400 hover:cursor-pointer hover:underline">SignIn</div>
                            </Link>
                            <p className="mt-1 text-lg text-red-600">{errMsg}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
