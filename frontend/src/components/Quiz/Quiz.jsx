import React, {useContext } from 'react';
import '../../App.css'
import UserContext from '../../context/context';
import UserQuiz from './UserQuiz';
import PublicQuiz from './PublicQuiz';
import QuizContextProvider from '../../context/QuizContextProvider';

const Quiz = () => {
  const { isLogin } = useContext(UserContext);
  return (
    <QuizContextProvider>
      <div className="w-full h-screen">
        {isLogin ? <UserQuiz /> : <PublicQuiz />}
      </div>
    </QuizContextProvider>
  );
};

export default Quiz;