import React, { useContext } from "react";
import { Link } from "react-router-dom";
import '../../App.css'
import ImageComponent from "../Imagecomponent";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
// import UserContext from "../../context/context";


export default function Home() {
    // const { isLogin } = useContext(UserContext)
    return (
        <>
            <div className="w-full">
                <h1 className="text-4xl text-center p-4 m-4 ">
                    <span className="text-orange-800 text-5xl">W</span>
                    elcome to <span className="underline decoration-orange-800 shadows-into-light-regular text-orange-800 text-center text-4xl sm:text-5xl py-10 font-bold"> QuickTrivia</span>
                </h1>
                <h2 className="text-3xl text-center p-4 m-4">,the ultimate destination for quiz enthusiasts!</h2>
            </div>
            <div className="flex md:h-64 flex-col md:flex-row">
                <div className="w-full md:w-2/3 flex flex-col">
                    <h2 className="text-xl p-4 text-left">
                        <span className=" font-bold text-orange-700">For the Curious Minds:</span> Dive into our Demo Quizzes and get a taste of the fun! Just click and start playing.
                    </h2>
                    <h2 className="text-xl p-4">
                        <span className=" font-bold text-orange-700">For the Quiz Aficionados:</span> Must register for a wide range of genres, from history to technology, arts to science, and everything in between. Select your preferred difficulty level and decide how many questions you want to tackle.

                    </h2>
                </div>
                <div className="w-full md:w-1/3">
                    <h1 className="text-2xl p-2">Features</h1>
                    <Accordion>
                        <AccordionItem key="1" title="Personalized Genres" aria-label="Accordion 1">
                            <h3>Select your favorite genres and we’ll curate quizzes just for you.</h3>
                        </AccordionItem>
                        <AccordionItem key="2" title="Choose Your Challenge" aria-label="Accordion 2">
                            <h3>Easy, medium, or hard - you set the bar for your quiz experience.</h3>
                        </AccordionItem>
                        <AccordionItem key="3" title="Question Flexibility" aria-label="Accordion 3">
                            <h3>Decide how long you want to play with options ranging from quick 5-question quizzes to the ultimate 50-question marathon.</h3>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <Button className="w-fit p-4 text-white font-bold text-xl bg-orange-700 rounded-lg hover:opacity-75">
                    <Link to="/Quiz">Play Now</Link>
                </Button>
                <h3 className="text-2xl p-4 font-bold text-orange-700 text-center"> Your quiz, your rules!</h3>
                <ImageComponent className="p-4 sm:w-96 w-56" src="https://i.ibb.co/2M7rtLk/Remote1.png" alt="image1" />
                <h1 className="shadows-into-light-regular text-center text-3xl lg:text-5xl sm:text-3xl md:text-4xl py-10 font-bold">Quick Trivia</h1>
            </div>
        </>
    );
}
