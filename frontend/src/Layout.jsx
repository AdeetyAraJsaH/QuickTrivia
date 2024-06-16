import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from './context/context'

function Layout() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const Navigate = useNavigate()

    const checkSession = async () => {
        if (localStorage.getItem('userInfo')) {
            await axios.get(`${process.env.SERVER_PORT}/api/users/profile`)
                .then(res => {
                    setUserInfo(res.data.user)
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                    localStorage.removeItem('userInfo')
                    Navigate('/')
                })
        }
    }

    useEffect(() => {
        const sessionCheckInterval = setInterval(checkSession, 60 * 1000); //Checks every minute that session expired or not
        return () => clearInterval(sessionCheckInterval);
    }, []);

    return (
        <>
            <Header />
            <main className="flex flex-col flex-grow h-full justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout