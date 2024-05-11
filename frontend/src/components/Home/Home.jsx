import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../../App.css'
import ImageComponent from "../Imagecomponent";
// import UserContext from "../../context/context";


export default function Home() {
    // const { isLogin } = useContext(UserContext)
    return (
        <div className="mx-auto w-full max-w-7xl">

            <div className="flex my-10 px-4 py-3 justify-center">

                <Link
                    className="inline-flex text-white items-center px-4 py-3 font-bold text-xl bg-orange-700 rounded-lg hover:opacity-75 justify-center"
                    to="/Quiz"
                >
                    Play Now
                </Link>

            </div>
            <div className="grid  place-items-center sm:mt-20">
                <ImageComponent className="sm:w-96 w-48" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image1" />
            </div>
            <h1 className="shadows-into-light-regular text-center text-2xl sm:text-5xl py-10 font-bold">Quick Trivia</h1>
        </div>
    );
}
