import React, { useContext } from 'react'
import { Button } from '@nextui-org/react';
import QuizBody from './QuizBody';
import { QuizContext } from '../../context/context';
function PublicQuiz() {
    const { questions, hidden, setHidden, fetchData } = useContext(QuizContext);
    return (
        <>
            {!hidden ?
                <div className={` h-screen w-full flex justify-center items-center ${hidden ? "hidden" : ""}`}>
                    <Button className="p-4 text-white font-semibold bg-amber-500" onPress={() => {
                        setHidden(!hidden)
                        fetchData()
                    }}>
                        Play Quiz
                    </Button>
                </div>
                :
                <>
                    {questions.length > 0 ?
                        <QuizBody /> :
                        <div className='flex h-full w-full justify-center items-center'>
                            <div className='loader m-4'></div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default PublicQuiz