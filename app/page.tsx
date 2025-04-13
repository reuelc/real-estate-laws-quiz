'use client';

import React, { useState, useEffect } from 'react';
import { questions } from './questions';

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([...questions]);

  useEffect(() => {
    // Shuffle questions on component mount
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const percentage = (score / shuffledQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">
            Examination Complete
          </h2>
          <div className="text-center space-y-4">
            <p className="text-xl">Final Score: {score}/{shuffledQuestions.length}</p>
            <p className="text-xl">Percentage: {percentage.toFixed(1)}%</p>
            <p className={`text-3xl font-bold ${percentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage >= 75 ? 'PASSED' : 'FAILED'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">
          Real Estate Laws Examination
        </h1>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div 
            className="bg-indigo-900 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              {currentQuestionData.question}
            </h2>
            <div className="space-y-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-indigo-900 font-medium">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </p>
            <p className="text-indigo-900 font-medium">
              Score: {score}/{currentQuestion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 