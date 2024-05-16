import React from "react";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import ModalComponent from "./ModalComponent";
import UserContext, { QuizContext } from "../../context/context";

export default function Result({ result }) {
  const { isLogin } = React.useContext(UserContext);
  const { questions, setQuestions, fetchData, setHidden } = React.useContext(QuizContext);
  const index = Math.floor((result.score / result.totalscore) * 5);
  const remarks = ["You gonnna need some practice Bud !!!", "Not Bad, try again.", "You are really GOOD at this.", "Excellent Bud!", "Outstanding"]
  const colors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-blue-500"]

  const handleSubmit = async () => {
    // e.preventDefault();
    setHidden(true)
    if (questions.length !== 0) {
      setQuestions([]);
    }
    await fetchData();
  };

  return (
    <div className="md:w-full gap-2 grid grid-cols-12 grid-rows-1 px-8">
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-center">
          <h4 className="text-black/65 font-medium text-xl text-center">You got <span className={`text-5xl font-semibold ${colors[index]}`}>{result.score}</span> out of<span className={`text-4xl font-semibold ${colors[index]}`}> {result.totalscore}</span> </h4>
        </CardHeader>
        <div className="flex h-full w-full justify-center items-center">
          <h4 className={`px-2 font-medium text-3xl text-center ${colors[index]}`}>{remarks[index]}</h4>
        </div>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-center">
          <>
            {isLogin ?
              <ModalComponent text={'Play Again'} /> :
              <Button className="text-white bg-orange-700 font-bold" onPress={handleSubmit}>Play Again</Button>
            }
          </>

        </CardFooter>
      </Card>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <h4 className="text-black/65 font-medium text-large">Checkout your accuracy.</h4>
        </CardHeader>
        <div className="flex h-full w-full justify-center items-center">
          <h4 className={`text-black/75 px-2 font-medium text-3xl text-center`}>You are <span className={`${colors[index]}`}>{result.accuracy}%</span> accurate this time.</h4>
        </div>
      </Card>
      <Card isFooterBlurred className="h-[300px] col-span-12 sm:col-span-4">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          {/* <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p> */}
          {/* <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4> */}
        </CardHeader>
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              {/* <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">Get a good night's sleep.</p> */}
            </div>
          </div>
          <Button radius="full" size="sm">Get App</Button>
        </CardFooter>
      </Card>
    </div>

  );
}