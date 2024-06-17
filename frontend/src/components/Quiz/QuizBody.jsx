import { Button, ScrollShadow } from '@nextui-org/react'
import React, { useContext } from 'react'
import axios from 'axios'
import UserContext, { QuizContext } from '../../context/context'
import Result from './Result'
import config from '../../config/config'

function QuizBody() {
    // const navigate = useNavigate();
    const [hideResult, setHideResult] = React.useState(true);
    const { isLogin, userInfo } = useContext(UserContext);
    const { questions, categoryName, difficulty, amount } = useContext(QuizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [result, setResult] = React.useState(null);
    const currentQuestion = questions[currentQuestionIndex];

    React.useEffect(() => {
        setSelectedOption('');
        setCurrentQuestionIndex(0);
    }, [])

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        currentQuestion.isAnswered = true;
        currentQuestion.selectedOption = option;
    };

    const handleNextQuestion = () => {
        // Move to the next question
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            if (currentQuestion.isAnswered) {
                setSelectedOption(currentQuestion.selectedOption);
            }
            setSelectedOption('');
        }
    };

    const handlePrevQuestion = () => {
        // Move to the next question
        if (currentQuestionIndex - 1 >= 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedOption('');
        }
    };

    const evaluate = async () => {
        let attempted = 0;
        let score = 0;
        questions.map(question => {
            if (question.isAnswered) {
                attempted += 1;
                if (question.answer === question.selectedOption)
                    score += 1;
            }
        });

        const result = {
            totalscore: questions.length,
            score: score,
            attempted: attempted,
            accuracy: attempted ? Math.floor((score / attempted) * 100) : 0,
            right: score,
            wrong: questions.length - score
        }
        setResult(result);
        return result;
    }
    const handleSubmit = async () => {
        const Result = await evaluate();
        console.log(userInfo);
        if (isLogin) {
            const usersQuizData = {
                createdAt: new Date().toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                details: {
                    amount,
                    categoryName: categoryName ? categoryName : 'General Science',
                    difficulty: difficulty ? difficulty : 'easy'
                },
                email: userInfo['email'],
                questions,
                Result
            }
            console.log(usersQuizData);
            await axios.post(`${config.SERVER_URL}/api/users/quiz`, { ...usersQuizData })
            setHideResult(false)
        } else {
            setHideResult(false)
        }
    }

    return (
        <>
            <div className='flex flex-col'>


                <div className="flex flex-col items-start md:flex-row h-full">
                    {/* First Block */}
                    <div className="basis-4/5 p-4 rounded-md w-full md:w-2/3 lg:w-3/5 h-full justify-between">
                        <div className="text-yellow-400 text-lg font-semibold pl-4 mb-2">Question : {currentQuestionIndex + 1}</div>
                        <div className="text-lg font-semibold pl-4 mb-2"> {currentQuestion.question}</div>
                        <div className="flex flex-col space-y-4 p-4 overflow-auto">
                            {currentQuestion.options.map((option, index) => (
                                <label key={index} className={`flex items-center space-x-2 min-h-4 cursor-pointer border-2 p-2 rounded-md ${hideResult ? "border-gray-500" : `${currentQuestion.isAnswered ? `${currentQuestion.selectedOption === option ? `${option === currentQuestion.answer ? "border-green-500" : "border-red-500"}` : `${currentQuestion.answer === option ? "border-green-500" : ""}`}` : `${currentQuestion.answer === option ? "border-green-500" : ""}`}`} hover:bg-slate-200 max-w-2xl`}>
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={currentQuestion.selectedOption === option}
                                        onChange={() => { handleOptionSelect(option) }}
                                        className="form-radio"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className='flex justify-center align-middle py-2'>
                            <Button className="mx-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                                Clear
                            </Button>
                            <Button className="mx-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handlePrevQuestion}>
                                {"<<".toString()} Prev
                            </Button>
                            <Button className="mx-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleNextQuestion}>
                                Next {">>".toString()}
                            </Button>
                            <Button className="mx-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                                Mark
                            </Button>
                        </div>
                    </div>
                    {/* Second Block */}
                    <div className="basis-1/5 flex flex-col w-full h-full p-2 md:w-1/3 lg:w-2/5 border-l-1">
                        <h2 className="text-xl font-semibold text-center">Question Palette</h2>
                        <ScrollShadow hideScrollBar >
                            <div className="flex md:h-72 flex-wrap justify-center pb-4 max-h-full">
                                {/* Display square elements */}
                                {questions.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={e => {
                                            // console.log(e.target.dataset.value)
                                            setCurrentQuestionIndex(parseInt(e.target.dataset.value))
                                        }}
                                        data-value={index}
                                        className={`w-10 h-10 rounded-full mx-3 my-2 pt-2 cursor-pointer text-center ${index == currentQuestionIndex ? 'bg-blue-500' : 'bg-gray-300'
                                            }`}>
                                        {index + 1}
                                    </div>
                                ))}
                            </div>

                        </ScrollShadow>
                        <div className={`${hideResult ? "" : "hidden"} flex justify-center align-middle my-8`}>
                            <Button className={`mx-2 self-center bg-blue-500 text-white px-4 py-2 rounded-md hide`}
                                onPress={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div >
                </div >
                {hideResult ? "" : <Result result={result} />}
            </div>
        </>
    )
}

export default QuizBody