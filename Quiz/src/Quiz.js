// Quiz.js
import React, { useState, useEffect, useCallback } from 'react';
import ReviewPage from './ReviewPage';

const quizData = [
  {
    question: "What does CPU stand for?",
    choices: ["Central Processing Unit", "Computer Performance Unit", "Control Program Unit", "Central Program Unit"],
    correctAnswer: "Central Processing Unit",
  },
  {
    question: "Which company developed the Java programming language?",
    choices: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    correctAnswer: "Sun Microsystems",
  },
  {
    question: "What is the full form of HTTP?",
    choices: ["Hyper Text Transmission Protocol", "Hyperlink Transfer Text Protocol", "Hyper Text Transfer Protocol", "Hyperlink Transmission Protocol"],
    correctAnswer: "Hyper Text Transfer Protocol",
  },
  {
    question: "Which programming language is primarily used for iOS app development?",
    choices: ["Python", "JavaScript", "Swift", "Ruby"],
    correctAnswer: "Swift",
  },
  {
    question: "Which of the following is a NoSQL database?",
    choices: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: "MongoDB",
  },
  {
    question: "Which company is the creator of Git?",
    choices: ["Google", "Microsoft", "Apple", "Linus Torvalds"],
    correctAnswer: "Linus Torvalds",
  },
  {
    question: "Which of these is a CSS framework?",
    choices: ["Angular", "Django", "Bootstrap", "Node.js"],
    correctAnswer: "Bootstrap",
  },
  {
    question: "What does SQL stand for?",
    choices: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "System Query Language"],
    correctAnswer: "Structured Query Language",
  },
  {
    question: "Which protocol is used to secure web communication?",
    choices: ["FTP", "HTTP", "HTTPS", "SMTP"],
    correctAnswer: "HTTPS",
  },
  {
    question: "Which of the following is used for containerization?",
    choices: ["Kubernetes", "Docker", "Jenkins", "Ansible"],
    correctAnswer: "Docker",
  }
];

const Quiz = () => {
  const [quiz, setQuiz] = useState(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quizData.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const shuffledQuiz = [...quizData];
    shuffleArray(shuffledQuiz);
    setQuiz(shuffledQuiz);
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleNextQuestion = useCallback(() => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimeLeft(30);
    } else {
      const finalScore = selectedAnswers.reduce((acc, answer, index) => {
        return answer === quiz[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(finalScore);
      setShowScore(true);
    }
  }, [currentQuestionIndex, quiz, selectedAnswers]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleNextQuestion]);

  const handleAnswerOptionClick = (choice) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = choice;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <div className="app">
      <h1 className="quiz-title">React Quiz App</h1>
      {showScore ? (
        <ReviewPage score={score} selectedAnswers={selectedAnswers} quizData={quiz} />
      ) : (
        <div className="quiz-section">
          <div className="timer-section">
            <p className="timer">Time Left: {timeLeft} seconds</p>
          </div>
          <div className="question-section">
            <h2 className="question-count">
              Question {currentQuestionIndex + 1}/{quiz.length}
            </h2>
            <p className="question-text">
              {quiz[currentQuestionIndex].question}
            </p>
          </div>
          <div className="answer-section">
            {quiz[currentQuestionIndex].choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleAnswerOptionClick(choice)}
                className={`choice-button ${
                  selectedAnswers[currentQuestionIndex] === choice ? "selected" : ""
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestionIndex] === null}
          >
            {currentQuestionIndex + 1 === quiz.length ? "Submit Quiz" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
