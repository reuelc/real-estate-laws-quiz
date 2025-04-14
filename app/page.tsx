"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/data/questions"
import { QuizResults } from "@/components/quiz-results"
import { QuizQuestion } from "@/components/quiz-question"

export default function QuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""))
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    {
      question: string
      yourAnswer: string
      correctAnswer: string
    }[]
  >([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState(() => {
    return [...questions].sort(() => Math.random() - 0.5)
  })

  const progress = (currentQuestionIndex / shuffledQuestions.length) * 100

  const handleAnswerSelect = (selectedOption: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]
    const isCorrect = selectedOption === currentQuestion.correct

    // Update user answers
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestionIndex] = selectedOption
    setUserAnswers(newUserAnswers)

    // Update score if correct
    if (isCorrect) {
      setScore(score + 1)
    } else {
      // Add to incorrect answers
      setIncorrectAnswers([
        ...incorrectAnswers,
        {
          question: currentQuestion.question,
          yourAnswer: selectedOption,
          correctAnswer: currentQuestion.correct,
        },
      ])
    }

    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setQuizComplete(true)
      }
    }, 1500)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const startReviewMode = () => {
    // Create a new quiz with only the incorrect questions
    const reviewQuestions = incorrectAnswers.map((item) => {
      return questions.find((q) => q.question === item.question)!
    })

    setShuffledQuestions(reviewQuestions.sort(() => Math.random() - 0.5))
    setCurrentQuestionIndex(0)
    setScore(0)
    setUserAnswers(Array(reviewQuestions.length).fill(""))
    setIncorrectAnswers([])
    setQuizComplete(false)
    setReviewMode(true)
  }

  const resetQuiz = () => {
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5))
    setCurrentQuestionIndex(0)
    setScore(0)
    setUserAnswers(Array(questions.length).fill(""))
    setIncorrectAnswers([])
    setQuizComplete(false)
    setReviewMode(false)
  }

  if (quizComplete) {
    return (
      <QuizResults
        score={score}
        totalQuestions={shuffledQuestions.length}
        incorrectAnswers={incorrectAnswers}
        onStartReview={startReviewMode}
        onReset={resetQuiz}
      />
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-slate-50">
          <CardTitle className="text-2xl text-center text-slate-800">
            {reviewMode ? "Review Mode - Practice Incorrect Items" : "Real Estate Laws Examination"}
          </CardTitle>
          <CardDescription className="text-center">
            Test your knowledge of Philippine real estate laws and regulations
          </CardDescription>
        </CardHeader>

        <div className="px-6 pt-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-slate-500 mt-1">
            <span>
              Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </span>
            <span>
              Score: {score}/{currentQuestionIndex}
            </span>
          </div>
        </div>

        <CardContent className="pt-6">
          <QuizQuestion
            question={shuffledQuestions[currentQuestionIndex]}
            onSelectAnswer={handleAnswerSelect}
            userAnswer={userAnswers[currentQuestionIndex]}
          />
        </CardContent>

        <CardFooter className="border-t bg-slate-50 flex justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            ← Previous
          </Button>

          <Button variant="outline" onClick={resetQuiz}>
            Reset Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
