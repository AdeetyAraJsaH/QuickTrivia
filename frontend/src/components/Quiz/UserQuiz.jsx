import React from 'react'
import ModalComponent from './ModalComponent';
import QuizBody from './QuizBody';
import { QuizContext } from '../../context/context';
function UserQuiz() {
    const { questions, hidden } = React.useContext(QuizContext);
    return (
        <>
            {!hidden ?
                <div className={` h-screen w-full flex justify-center items-center ${hidden ? "hidden" : ""}`}>
                    <ModalComponent text={'Play Quiz'} />
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

export default UserQuiz