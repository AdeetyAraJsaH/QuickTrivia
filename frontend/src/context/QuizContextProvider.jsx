import React, { useContext, useState } from 'react'
import UserContext, { QuizContext } from './context';
import getQuestions, { Questions } from '../components/Quiz/getQuiz';

function QuizContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const { isLogin } = useContext(UserContext)
  const fetchData = async () => {
    try {
      if (!isLogin) {
        await getQuestions();
        setQuestions(Questions.length > 0 ? Questions : null)
      } else {
        await getQuestions({ amount, category, difficulty });
        setQuestions(Questions.length > 0 ? Questions : null)
      }
      setHidden(!hidden);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <QuizContext.Provider value={{ questions, setQuestions, hidden, setHidden, setAmount, setCategory, setDifficulty, amount, category, difficulty, fetchData, categoryName, setCategoryName }}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizContextProvider