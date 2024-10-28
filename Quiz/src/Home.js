import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'


const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz'); // Navigate to the Quiz page
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default Home;
