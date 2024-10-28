import React from 'react';
import './ReviewPage.css';

const ReviewPage = ({ score, selectedAnswers, quizData }) => {
  return (
    <div className="review-page">
      <h2>Your Score: {score}/{quizData.length}</h2>
      <ul>
        {quizData.map((question, index) => (
          <li key={index}>
            <p>{question.question}</p>
            <p>Your Answer: {selectedAnswers[index]}</p>
            <p style={{ color: selectedAnswers[index] === question.correctAnswer ? 'green' : 'red' }}>
              Correct Answer: {question.correctAnswer}
            </p>
            {selectedAnswers[index] !== question.correctAnswer && (
              <p style={{ color: 'red' }}>Incorrect Answer</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;
