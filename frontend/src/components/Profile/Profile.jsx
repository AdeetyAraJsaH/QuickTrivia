import { Avatar, Button } from '@nextui-org/react'
import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/context'
import axios from 'axios'
import TableComponent from './TableComponent'
import cover from './cover1.png'

function Profile() {

    const [quizData, setQuizData] = React.useState(null);
    const {userInfo} = useContext(UserContext);
    const fetchData = async () => {
        await axios.get(`/api/users/profile`)
            .then(res => {
                console.log(res.data);
                setQuizData(res.data.quizData);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="flex w-full">
            <div className="w-full h-full flex flex-col justify-start items-center">
                <div
                    style={{ backdropFilter: blur(5), '--image-url': `url(${cover})` }}
                    className={`w-full border-2 bg-[image:var(--image-url)] bg-cover bg-center`}>
                    <h1 className=' mb-12 ml-2 text-white font-extralight md:text-7xl lg:text-8xl sm:text-5xl'>{userInfo ? userInfo.name : 'test'}</h1>
                    <div className=" w-full">
                        <div className="flex justify-between">
                            <div className=" m-4 rounded-full flex justify-center items-center">
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="sm:w-10 sm:h-10 md:w-16 md:h-16 text-large" />
                            </div>
                            <Button className="mb-4 mr-4 self-end h-9 px-2 text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm ">
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=" flex w-full h-full border justify-center items-center">
                    <TableComponent quizData={quizData} />
                </div>
            </div>
        </div>
    )
}

export default Profile