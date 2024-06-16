import { Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Chip } from "@nextui-org/react";
import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/context'
import axios from 'axios'
import TableComponent from './TableComponent'
import cover from './cover1.png'
import UpdateForm from "./UpdateForm";
import ProfilePicture from "./ProfilePicture";

function Profile() {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const [username, setUsername] = React.useState(userInfo.name);
    const [email, setEmail] = React.useState(userInfo.email);
    const [desc, setDesc] = React.useState(userInfo.desc ? userInfo.desc : '');
    const { isOpen: isFirstModalOpen, onOpen: onFirstModalOpen, onOpenChange: onFirstModalChange } = useDisclosure();
    const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onOpenChange: onSecondModalChange } = useDisclosure();
    const [quizData, setQuizData] = React.useState(null);
    const [alert, setAlert] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);

    useEffect(() => {
        if (alert) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000); // 3 seconds
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const validateEmail = () => {
        const emailRegex = new RegExp("[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com|test.com)")
        // /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            // setErrMsg("");
            console.log('email validated')
            return true;
        } else {
            console.log('Invalid Email')
        }
        return false;
    };

    const fetchData = async () => {
        await axios.get(`${process.env.SERVER_PORT}/api/users/profile`)
            .then(res => {
                console.log(res.data);
                setAvatar(res.data.user.avatar)
                setQuizData(res.data.quizData);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSubmit = async () => {
        if (validateEmail()) {
            await axios.put(`${process.env.SERVER_PORT}api/users/profile`, { name: username, email: email, description: desc })
                .then(res => {
                    console.log(res);
                    setUserInfo(res.data.user);
                    setAlert({
                        message: res.data.message,
                        status: 'success'
                    })
                })
                .catch(err => {
                    console.log(err.response.data.message);
                    setAlert({
                        message: err.response.data.message,
                        status: 'danger'
                    })
                });
        }
    }

    useEffect(() => {
        setAlert(null);
        setShowAlert(false);
        setUsername(userInfo.name);
        setEmail(userInfo.email);
        setDesc(userInfo.desc);
        fetchData();
    }, [userInfo])
    return (
        <div className="flex w-full">
            <Chip className={`${!showAlert ? 'opacity-0' : 'opacity-100'} z-10 fixed top-20 right-4 transition-opacity duration-1000`}
                color={alert ? alert.status : 'default'}>
                {alert ? alert.message : ""}
            </Chip>

            <div className="w-full h-full flex flex-col justify-start items-center">
                <div
                    style={{ backdropFilter: blur(5), '--image-url': `url(${cover})` }}
                    className={`w-full border-2 bg-[image:var(--image-url)] bg-cover bg-center`}>
                    <h1 className=' mb-12 ml-2 text-white font-extralight md:text-7xl lg:text-8xl sm:text-5xl'>{userInfo ? userInfo.name : 'test'}</h1>
                    <div className=" w-full">
                        <div className="flex justify-between">
                            <div className=" m-4 rounded-full flex justify-center items-center">
                                <Avatar src={avatar ? avatar : "https://i.pravatar.cc/150?u=a04258114e29026708c"} className="sm:w-10 sm:h-10 md:w-24 md:h-24 text-large" onClick={onFirstModalOpen} />
                                <Modal isOpen={isFirstModalOpen} onOpenChange={onFirstModalChange}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Uptate Profile Picture</ModalHeader>
                                                <ModalBody>
                                                    <ProfilePicture avatar={avatar} />
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger" variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            </div>
                            <Button className="mb-4 mr-4 self-end h-9 px-2 text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm "
                                onPress={onSecondModalOpen}>
                                Edit Profile
                            </Button>
                            <Modal isOpen={isSecondModalOpen} onOpenChange={onSecondModalChange}>
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader className="flex flex-col gap-1">Uptate Profile</ModalHeader>
                                            <ModalBody>
                                                <UpdateForm username={username} email={email} desc={desc} setUsername={setUsername} setEmail={setEmail} setDesc={setDesc} />
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button className="text-white bg-orange-700 font-bold" onPress={async () => {
                                                    await handleSubmit();
                                                    onClose();
                                                }}>
                                                    Update
                                                </Button>
                                                <Button color="danger" variant="light" onPress={onClose}>
                                                    Close
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>
                            </Modal>
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