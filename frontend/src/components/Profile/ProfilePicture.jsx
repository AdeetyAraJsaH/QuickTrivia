import { Avatar, Button } from '@nextui-org/react';
import axios from 'axios'
import React from 'react'
import config from '../../config/config';

function ProfilePicture({avatar}) {

    let file = null;
    const [fileName, setFileName] = React.useState('No file chosen, yet.');
    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        file = event.target.files[0];
        console.log(file)
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen, yet.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profileImage',fileInputRef.current.files[0] );
        await axios.post(`${config.SERVER_URL}/api/users/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error('Error uploading image:', err);
            });
    };

    return (
        <form onSubmit={handleSubmit} method='POST' encType='multipart/form-data' className='flex flex-col justify-center items-center gap-4'>
            <Avatar src={avatar ? avatar : "https://i.pravatar.cc/150?u=a04258114e29026708c"} className="sm:w-10 sm:h-10 md:w-24 md:h-24 text-large" />
            <div className='space-x-4'>
                <input
                    name='profileImage'
                    type="file"
                    accept='.jpg, .jpeg, .png'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Button onClick={handleButtonClick}>Choose a file</Button>
                <span>{fileName}</span>
            </div>
            <Button className='text-white bg-orange-700 font-bold' type="submit">Upload</Button>
        </form>
    );
}

export default ProfilePicture