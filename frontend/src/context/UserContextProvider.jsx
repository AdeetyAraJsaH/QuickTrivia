import React, { useState } from 'react'
import UserContext from './context'

const UserContextProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState(() => {
        let user = null;
        if (localStorage.getItem('userInfo')) {
            const userstring = localStorage.getItem('userInfo');
            user = JSON.parse(userstring);
        }
        return user;
    });
    const [isLogin, setIsLogin] = useState(false);
    React.useEffect(() => {

        if (userInfo) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [userInfo])

    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider