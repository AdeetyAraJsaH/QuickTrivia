import React, { useContext, useState } from "react";
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userContext from "../../context/context";
import DropDown from './DropDown.svg'
import Profile from './Profile.svg'
import config from "../../config/config";
export default function Header() {
    const navigate = useNavigate()
    const { isLogin, setUserInfo } = useContext(userContext);
    const [showNav, setShowNav] = useState(false);
    const [showUserNav, setShowUserNav] = useState(false);
    const toggleUserNav = () => {
        setShowUserNav(!showUserNav)
    }
    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const handleLogout = async () => {
        await axios.post(`${config.SERVER_URL}api/users/logout`)
            .then(res => {
                console.log(res)
                setUserInfo(null);
                localStorage.removeItem('userInfo')
                navigate('/');
            })
            .catch(err => console.log(err))
    }
    console.log(isLogin);

    return (
        <header className="shadow sticky z-50 top-0 flex justify-between items-center bg-white border-gray-200">
            <button
                className="md:hidden text-gray-300 hover:text-white"
                onClick={toggleNav}
            >
                <img src={DropDown} className="logo" alt="Options" />
            </button>
            <div className={`absolute top-10 left-1 bg-white border border-gray-300 p-2 ${showNav ? "flex-col" : "hidden"}`}
                onClick={toggleNav}
            >

                <ul className="list-none">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                            }
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex items-center">
                <Link to="/">
                    <h1 className="text-2xl font-semibold py-2 px-2">Quick<span className="text-[#de9432]">Trivia</span></h1>
                </Link>
            </div>
            <nav className={`hidden md:flex space-x-4`}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `${isActive ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 hover:text-orange-700`
                    }
                >
                    Contact
                </NavLink>
            </nav>
            {isLogin ?
                <div>
                    <div className=" cursor-pointer rounded-full m-2 overflow-hidden p-1 border-2 border-zinc-400"
                        onClick={toggleUserNav}>
                        <img src={Profile} className="logo" alt="Options" />
                    </div>
                    <div className={`absolute top-13 right-1 bg-white border border-gray-300 p-2 ${showUserNav ? "flex flex-col justify-between" : "hidden"}`}>
                        <ul className="list-none"
                            onClick={toggleUserNav}>
                            <li className="m-2">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `${isActive ? "text-orange-700" : "text-gray-700"}border-gray-100 hover:bg-gray-50 hover:text-orange-700 text-center`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="p-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm focus:outline-none">
                                    Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div> :
                <div className="flex items-center space-x-1 px-2">
                    <Link
                        to="/SignIn"
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    >
                        SignIn
                    </Link>
                </div>}
        </header>
    );
}